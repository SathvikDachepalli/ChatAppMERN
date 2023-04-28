const express = require('express');
const bcryptjs=require('bcryptjs'); 
const jwt=require('jsonwebtoken');
const cors = require('cors');
const io=require('socket.io')({
    cors:{
        origin:"*",
    }
});


require('./connect');

const Users = require('./models/users');
const Conversation = require('./models/conversation');
const Message = require('./models/messages');

//App Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 8000;


//Socket.io
var users=[]
io.on('connection',socket=>{
    console.log("User connected",socket.id);
    console.log("Port :>> ",socket.handshake.headers.host)
    socket.on('addUser',userId=>{
        const isUser=users.some(user=>user.userId===userId);
        console.log("isUser:>> ",isUser)
        if(!isUser){
            const user={userId:userId,socketId:socket.id}
            users.push(user)
            io.emit('getUsers',users)
        }
    }),
    
    socket.on('sendMessage',async({senderId,receiverId,message,conversationId})=>{
        console.log(senderId,receiverId,message,conversationId)
        console.log(users)
        const receiver = users.find(user=>user.userId===receiverId);   
        console.log("From SendMessage")
        console.log(receiver)
        if(receiver){
            console.log("receiver:>>>>>>",receiver);
            io.to(receiver.socketId).emit('getMessage',{
                senderId,
                message,
                conversationId,
                receiverId,
            });
        }

    });

    socket.on('disconnect',()=>{
        users=users.filter(user=>user.socketId !== socket.id);
        io.emit('getUsers',users)
    })
});

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/register',async (req, res,next) => {

    try {
        const {Fname,Lname,phone,email,password} = req.body;
        if(!Fname || !Lname || !phone || !email || !password){
            return res.status(422).send({error: "Please fill all the fields"});
        }
        else{
            const isAlreadyExist = await Users.findOne({email: email});
            if(isAlreadyExist){
                return res.status(422).send({error: "Email already exist"});
            }
            else{
                const newuser = new Users({Fname,Lname,phone,email});
                bcryptjs.hash(password, 10, (err, hash) => {
                    newuser.set('password', hash);
                    newuser.save();
                    next();
                });
                return res.status(201).send({message: "User registered successfully"});
            }
        }
    } catch (error) {
    
    }
});

app.post('/api/login', async (req, res,next) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(422).send({error: "Please fill all the fields"});
        }
        else{
            const user=await(Users.findOne({email: email}||{phone: email}));
            if(!user){
                res.status(422).send({error: "Invalid credentials"});
            }else{
                const validate=await bcryptjs.compare(password,user.password);
                if(!validate){
                    res.status(422).send({error: "Invalid credentials"});
                }else{
                    const payload={
                        userId : user._id,
                        email : user.email,
                    }
                    const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY || "Secret Key";
                    jwt.sign(payload,JWT_SECRET_KEY,{expiresIn: "1h"},async (err,token)=>{
                        await Users.updateOne({_id: user._id},{
                            $set:{token}
                        })
                        user.save();
                        next();
                    })
                    res.status(200).json({message: "User logged in successfully",details: {id:user._id,Fname: user.Fname,Lname: user.Lname,phone: user.phone},email:user.email,token: user.token, });
                }
            }
        }
    } catch (error) {
        console.log("error",error);
    }
});


app.post('/api/conversation',async(req,res)=>{
    try{
        const {senderId,receiverId} = req.body;
        const newConversation = new Conversation({
            participants: [senderId,receiverId],
        });
        await newConversation.save();
        res.status(201).json({message: "Conversation created successfully",conversation: newConversation});
    }
    catch(err){
        console.log(err);
    }
})

app.get('/api/conversation/:Id',async(req,res)=>{
    
    try{
        const userId = req.params.Id;
        const conversations = await Conversation.find({participants: { $in: [userId] }});
        const conversationUserData = await Promise.all(conversations.map(async(conversation)=>{
            const receiverId = conversation.participants.find((participant)=>participant!=userId);
            const receiver = await Users.findById(receiverId);
            return {user:{id:receiver._id,email: receiver.email,phone: receiver.phone,FullName: receiver.Fname+" "+receiver.Lname},conversationId: conversation._id}
        }))

        res.status(201).json(conversationUserData);
    }
    catch(err){     
        console.log(err);
    }
})

app.post('/api/message',async(req,res)=>{
    try{
        const {conversationId,senderId,message,receiverId} = req.body;
        if(!senderId || !message) { return res.status(400).send({error: "Please fill all the fields"});}
        if(conversationId=="new") { 
            const newConversation = new Conversation({
                participants: [senderId, receiverId],
            });
            await newConversation.save();
            console.log(newConversation)
            const newMessage = new Message({
                conversationId: newConversation._id,
                senderId,
                message,
                createdAt: Date.now(),
                receiverId: receiverId,
            });
            console.log(newMessage)
            return res.status(201).json({message: "Message sent successfully",message: newMessage});
        }
        const newMessage = new Message({
            conversationId,
            senderId,
            message,
            createdAt: Date.now(),
        });
        await newMessage.save();
        res.status(201).json({message: "Message sent successfully",message: newMessage});
    }
    catch(err){
        console.log(err);
    }
})  

app.get('/api/message/:conversationId',async(req,res)=>{
    try {
        const conversationId = req.params.conversationId;
        if(conversationId==="new"){ return res.status(200).json([]);}

        const messages=await Message.find({conversationId: conversationId});
        const messageUserData = await Promise.all(messages.map(async(message)=>{
            const sender = await Users.findById(message.senderId);
            return {user:{id:sender._id,email: sender.email,phone: sender.phone,FullName: sender.Fname+" "+sender.Lname},message: message.message,createdAt: message.createdAt}
        }))
        res.status(201).json(messageUserData);

    } catch (error) {
        
    }

})

app.get('/api/users',async(req,res)=>{
   try {
        const users=await Users.find();
        const userData = await Promise.all(users.map(async(user)=>{
            return {id:user._id,email: user.email,phone: user.phone,FullName: user.Fname+" "+user.Lname}
        }
        ))
        res.status(201).json(userData);
   } catch (error) {
    
   }
})
app.get('/api/users/:Id',async(req,res)=>{
    try{
        const userId=req.params.Id;
        const userData = await Promise.all(userId.map(async(user)=>{
            return {user:{email: user.email,phone: user.phone,FullName: user.Fname+" "+user.Lname}}
        }
        ))
        res.status(201).json({message: "Users fetched successfully",userData: userData});
    }catch(err){
        console.log(err);

    }

})

app.listen(port,()=>{
    console.log("Listening on port "+ port);
})