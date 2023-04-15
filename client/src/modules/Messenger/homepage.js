import {React, useEffect, useRef, useState} from 'react'
import { Send,CirclePlus,User,PhonePlus} from 'tabler-icons-react';
import {io} from 'socket.io-client';
const Homepage = () => {

  const [user,setUser]=useState(JSON.parse(localStorage.getItem('details')))


  const [messages,setMessages] = useState({messages:[]})
  const [contactName,setContactName]=useState({FullName: "", id: ""})
  const [conversations,setConversations]  = useState([])
  const [sendMsg,setSendMsg] = useState("")
  const [people, setPeople] = useState([])
  const [currConvo, setCurrConvo] = useState("")
  const [receiver,setReceiver] = useState("")
  const MessageRef= useRef(null)

  const ConvoIds=[]
  // console.log(currConvo)
  // console.log(messages)
  const [socket,setSocket] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  },[])

useEffect(() => {
  socket?.emit('addUser', user.id);
  socket?.on('getUsers', (users) => {
    console.log("active:>>",users);
  });
  socket?.on('getMessage',data=>{
    console.log('data :>> ',data);
    console.log('messages :>> ',data.message)
    console.log(data.conversationId)
    document.getElementById(data.conversationId).click();
    document.getElementById(data.conversationId).click();
    document.getElementById(data.conversationId).click();
    
  })
},[socket])

  useEffect(()=>{
    MessageRef?.current?.scrollIntoView({behavior:"smooth"})
  },[messages?.messages])

  useEffect(() => {
    const fetchConversations = async()=>{
      const res = await fetch(`http://localhost:8000/api/conversation/${user.id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        }
      });
      const resData=await res.json();
      setConversations(resData);
    }
    fetchConversations();
  },[])

  conversations.map((conversation)=>{
    ConvoIds.push(conversation.conversationId)
  })

  useEffect(() => {
    const fetchUsers = async()=>{
      const res = await fetch(`http://localhost:8000/api/users`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
        }
      });
      const resData=await res.json();
      setPeople(resData);
    }
    fetchUsers();
  },[people])

  const fetchMessages = async(conversationId,user)=>{
    const res = await fetch(`http://localhost:8000/api/message/${conversationId}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
      }
    });
    const resData=await res.json();
    setContactName({FullName: user.FullName, id: user.id})
    setReceiver(user.id)
    setCurrConvo(conversationId)
    setMessages({messages: resData,user: user});
  }
  
const checkEnter=(e)=>{
  // Check if the key pressed is enter
  if(e.key === 'Enter'){
    sendMessage();
  }
}

const sendMessage = async(e)=>{
  socket?.emit('sendMessage',{
    conversationId: currConvo,
    senderId: user.id,
    receiverId: receiver,
    message: sendMsg
  })
  const res = await fetch(`http://localhost:8000/api/message`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body: JSON.stringify({conversationId:currConvo,senderId:user.id,message:sendMsg,receiverId:receiver})
  });
  document.getElementById(`${currConvo}`).click();
  document.getElementById("msg").value=null;
  setSendMsg("");
}

  return (
    <div className='w-screen flex'>
      {/* Contacts */}
        <div className='w-[25%]  h-screen'> 
            <div className='flex justify-center items-center' >
              <div class="image border border-emerald-800 p-[2px] rounded-full"  onClick={()=>{window.location.href="./logout"}}>
                <User className='w-[75px] h-[75px] rounded-full'></User>
              </div>
                <div class="ml-8 mt-10 mb-10">
                    <h3 className='text-2xl'> {user.Fname+" "+ user.Lname} </h3>
                    <p className='text-sm'> Welcome to your messenger </p>
                </div>
            </div>
            <hr className="border"/>
            <div className='mt-5 mx-10'>
              <div>Messages</div>
              <div>
                {
                  conversations.length > 0 ?
                  conversations.map((conversation)=>{
                    return(
                      <div className='flex items-center mt-5  bg-slate-400 p-2 rounded-full' id={conversation.conversationId} onClick={()=>fetchMessages(conversation.conversationId,conversation.user)}>
                        <div className='border-2 border-gray-800 rounded-full p-1'>
                          <User size={40} className='rounded-full'></User>
                        </div>
                        <div className='ml-5'>
                          <h3 className='text-lg'>{conversation.user.FullName}</h3>
                          <p className='text-sm'> {conversation.user.email} </p>
                        </div>
                      </div>
                    )
                  }): <div className='text-center mt-10'>No conversations yet</div>
                }
              </div>
            </div>
        </div>
        {/* Chat */}
        <div className='w-[75%] flex flex-col items-center bg-white h-screen'> 
        
          <div className='w-[75%] bg-gray-300 h-[80px] mt-7 rounded-full flex justify-center items-center px-14 mb-7'>
              <div className='items-center justify-center' ><User size={60} className='border-slate-950 border-2 rounded-full'></User></div>
              <div className='ml-6 mr-auto'>
                <h3 className='text-lg'> {contactName.FullName? contactName.FullName : "Select a user"} </h3>
                <p className='text-sm font-light text-gray-600'> Online </p>
              </div>
              <div className='w-10 ml-10'> <PhonePlus size={50}/></div>
          </div>

           <div className='h-[75%] border w-full overflow-y-auto overflow-x-hidden'>
              <div className='h-auto px-10 py-14'> 
                
                {
                  messages.messages.length > 0 ?
                  messages.messages.map(({message,user:{id}={}})=>{
                    try {
                      return(
                        <>
                        <div className={id==user.id ? 'min-h-[4em] max-w-[30%] bg-primary rounded-bl-3xl rounded-t-3xl justify-center items-center ml-auto p-4 mt-2 text-white shadow-primary shadow-2xl' : 'min-h-[4em] max-w-[40%] bg-receive rounded-b-3xl rounded-tr-3xl justify-center items-center mt-2 p-4 shadow-2xl shadow-receive'}>
                          <p className='text-center'>{message}</p>
                        </div>

                        <div ref={MessageRef}></div>
                        </>
                      )
                    } catch (error) {
                      console.log(error)
                    }
                  }): <div className='text-center mt-10'>No messages yet</div>
                }
              </div>
          </div>
          <div className="flex items-center justify-center w-full mt-5"> 
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"></svg>
  </div>
  <input type="text" id="msg" class="ml-6 mt-2 h-14 bg-gray-300 border border-black text-black text-lg rounded-full block w-full pl-10 p-2.5 dark:placeholder-gray-400 " placeholder="Type here" onChange={(e)=>setSendMsg(e.target.value)} onKeyDown={(e)=>{checkEnter(e)}} autoComplete='false'/>
              <div className={`bg-zinc-400 ml-2 mt-3 rounded-full w-14 h-12 flex flex-col justify-center items-center shadow-inner ${!sendMsg && 'pointer-events-none'}`} onClick={()=>{}} > <Send size={38} /> </div>
              <div className={`bg-zinc-400 ml-2 mt-3 rounded-full w-14 h-12 flex flex-col justify-center items-center shadow-inner ${!sendMsg && 'pointer-events-none'}`} onClick={()=>{}}> <CirclePlus size={40} /> </div>
              <div class="relative mb-6">

</div>
          </div>

        </div>
        <div className='w-[25%] border-black border h-screen' >
        <div className='flex flex-col' >
        <div class="ml-8 mt-10 mb-10">
                    <h3 className='text-2xl'> People </h3>
                    <p className='text-sm'> Find your friends </p>
                </div>
            </div>
            <hr className="border"/>
            <div>
                {
                  people.length > 0 ?
                  people.map((person)=>{
                    // console.log(person)
                    return(
                      <div className='flex items-center mt-5 mr-2 ml-2 bg-slate-400 p-2 rounded-full'  onClick={()=>fetchMessages('new',person)}>
                        <div className='border-2 border-gray-800 rounded-full p-1'>
                          <User size={40} className='rounded-full'></User>
                        </div>
                        <div className='ml-5'>
                          <h3 className='text-lg'>{person.FullName}</h3>
                          <p className='text-sm'> {person.email} </p>
                        </div>
                      </div>
                    )
                  }): <div className='text-center mt-10'>No conversations yet</div>
                }
              </div>
        </div>
        
    </div>
  )
}

export default Homepage
