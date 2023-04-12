import React from 'react'
import Avatar from '../../static/image.svg'
import { Send,CirclePlus,User,PhonePlus} from 'tabler-icons-react';


const Homepage = () => {

  const username='Sathvik'
  const Contacts=[
    {
      name: 'John Doe',
      lastMessage: 'Hello',
      status: 'Online',
      img:Avatar
    },
    {
      name: 'Bobby Mary',
      lastMessage: 'Send Money!',
      status: 'Offline',
      img:Avatar
    },
    {
      name: 'Tate',
      lastMessage: 'What car do you have?',
      status: 'Online',
      img:Avatar
    },
  ]
  return (
    <div className='w-screen flex'>
      {/* Contacts */}
        <div className='w-[25%] border-black border h-screen'> 
            <div className='flex justify-center items-center' >
              <div class="image border border-emerald-800 p-[2px] rounded-full">
                <User className='w-[75px] h-[75px] rounded-full'></User>
              </div>
                <div class="ml-8 mt-10 mb-10">
                    <h3 className='text-2xl'> Hello </h3>
                    <p className='text-sm'> Welcome to your messenger </p>
                </div>
            </div>
            <hr className="border-black"/>
            <div className='mt-5 mx-10'>
              <div>Messages</div>
              <div >
                {
                  Contacts.map(({name,
                  lastMessage,
                  status,
                  img,})=>{
                    return(
                      <div className='flex items-center py-4 border-b-2 border-stone-700'>
                      <div class="relative image">
                        <img src={img} alt="Avatar" className='w-[75px] h-[75px] rounded-full'/>
                        <div className='pl-20 z-10 absolute ' >{status === 'Online' ? <div className='bg-green-500 rounded-full w-3 h-3'></div> : <div className='bg-red-500 rounded-full w-3 h-3'></div>}</div>
                      </div>
                      <div class="ml-6">
                        <h3 className='text-2xl'> {name} </h3>
                        <p className='text-sm'> {lastMessage} </p>
                      </div>
                    </div>
                    )
                })
              }
              </div>
            </div>
        </div>
        {/* Chat */}
        <div className='w-[50%] flex flex-col items-center bg-white h-screen'> 
          <div className='w-[75%] bg-gray-300 h-[80px] mt-7 rounded-full flex justify-center items-center px-14 mb-7'>
              <div className='items-center justify-center' ><User size={60} className='border-slate-950 border-2 rounded-full'></User></div>
              <div className='ml-6 mr-auto'>
                <h3 className='text-lg'> {username} </h3>
                <p className='text-sm font-light text-gray-600'> Online </p>
              </div>
              <div className='w-10 ml-10'> <PhonePlus size={50}/></div>
          </div>
          <div className='h-[75%] border w-full overflow-y-auto overflow-x-hidden'>
              <div className='h-auto px-10 py-14'> 
                <div className='min-h-[4em] max-w-[40%] bg-receive rounded-b-3xl rounded-tr-3xl justify-center items-center p-4 shadow-2xl shadow-receive'>
                  <p className='text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p> 
                </div>
                <div className='min-h-[4em] max-w-[40%] bg-primary rounded-bl-3xl rounded-t-3xl justify-center items-center ml-auto p-4 text-white shadow-primary shadow-2xl'> 
                  <p className='text-center'>Hello</p>
                </div>
                <div className='min-h-[4em] max-w-[40%] bg-receive rounded-b-3xl rounded-tr-3xl justify-center items-center p-4 shadow-2xl shadow-receive'>
                  <p className='text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p> 
                </div>
                <div className='min-h-[4em] max-w-[40%] bg-primary rounded-bl-3xl rounded-t-3xl justify-center items-center ml-auto p-4 text-white shadow-primary shadow-2xl'> 
                  <p className='text-center'>Hello</p>
                </div>
                <div className='min-h-[4em] max-w-[40%] bg-receive rounded-b-3xl rounded-tr-3xl justify-center items-center p-4 shadow-2xl shadow-receive'>
                  <p className='text-center'>Lorem ipsum m dolor sit amet consectetur, adipisicing elit. </p> 
                </div>
                <div className='min-h-[4em] max-w-[40%] bg-primary rounded-bl-3xl rounded-t-3xl justify-center items-center ml-auto p-4 text-white shadow-primary shadow-2xl'> 
                  <p className='text-center'>Hello</p>
                </div>
                <div className='min-h-[4em] max-w-[40%]  bg-receive rounded-b-3xl rounded-tr-3xl justify-center items-center p-4 shadow-2xl shadow-receive'>
                  <p className='text-center'>Lorem ipsumm dolor sit amet consectetur, adipisicing elit. </p> 
                </div>
                <div className='min-h-[4em] max-w-[40%]  bg-primary rounded-bl-3xl rounded-t-3xl justify-center items-center ml-auto p-4 text-white shadow-primary shadow-2xl'> 
                  <p className='text-center'>Hello</p>
                </div>
                <div className='min-h-[4em] max-w-[40%] bg-receive rounded-b-3xl rounded-tr-3xl justify-center items-center p-4 shadow-2xl shadow-receive'>
                  <p className='text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p> 
                </div>
                <div className='min-h-[4em] max-w-[40%] bg-primary rounded-bl-3xl rounded-t-3xl justify-center items-center ml-auto p-4 text-white shadow-primary shadow-2xl'> 
                  <p className='text-center'>Hello</p>
                </div>
                <div className='min-h-[4em] max-w-[40%]  bg-receive rounded-b-3xl rounded-tr-3xl justify-center items-center p-4 shadow-2xl shadow-receive'>
                  <p className='text-center'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                </div>
              </div>
          </div>
          <div className="flex items-center justify-center w-full mt-5"> 
              <input type="text" className='bg-[#bbb8b8] mt-4 rounded-full w-full h-10 ml-5 shadow-2xl shadow-transparent'/>
              <div className='bg-zinc-400 ml-2 mt-3 rounded-full w-14 h-12 flex flex-col justify-center items-center shadow-inner'> <Send size={38} /> </div>
              <div className='bg-zinc-400 ml-2 mt-3 mr-4 rounded-full w-14 h-12 flex flex-col justify-center items-center'> <CirclePlus size={40} /> </div>
          </div>
          
        </div>

        <div className='w-[25%] border-black border h-screen'> </div>
    </div>
  )
}

export default Homepage
