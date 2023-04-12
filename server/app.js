const express = require('express');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');


require('./connect');

const Users = require('./models/users');


//App Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = process.env.PORT || 8000;

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/register', async (req, res,next) => {
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
                    res.status(200).json({message: "User logged in successfully",user:user})
                }
            }
        }
    } catch (error) {
        console.log("error",error);
    }
});


app.listen(port,()=>{
    console.log("Listening on port "+ port);
})