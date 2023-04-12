import Login from './Login'
import SignUp from './SignUp'
import React, { useState } from "react";
const Form = () => {
    const [showComponent, setShowComponent] = useState(false);
    var value="Login"
    var signed=false
    function toggleComponent(bool) {
        setShowComponent(bool);
        if(bool){
            value="Login"
            signed=false
        }
        else{
            value="Sign up"
            signed=true
        }
    }


  return (
    <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-xl">
        <div className="bg-emerald-500 h-[100px] rounded-t-lg text-center flex flex-col items-center justify-center">
            <h1 className="text-4xl text-white pb-2 font-extrabold">Welcome</h1>

        </div>
        <div className="h-[700px] border-2 border-slate-700 flex flex-col items-center justify-center">
            <div className='flex flex-col justify-center items-center'>
            { showComponent ? <SignUp className='flex flex-col justify-center items-center'/> : <Login /> }
            </div>
            <div className="text-sm pt-2.5 ">
                <h2>
                { showComponent ? "Already a member? " : "Not a member? " }
                { showComponent ?  <button onClick={ ()=>{toggleComponent(false)}} className='underline text-primary'> Login </button> :  <button onClick={()=>{toggleComponent(true)}} className='underline text-primary'> Sign up</button>  }
                </h2>
            </div>
        </div>
    </div>
  )
}

export default Form
