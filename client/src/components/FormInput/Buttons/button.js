import React from 'react'

const Button = ({
    value
}) => {
  function onClick(){
    if (value==='Sign Up'){
      console.log('Sign Up')
      console.log(document.getElementById("Fname").value,document.getElementById("Lname").value,document.getElementById("Phone").value,document.getElementById("email").value,document.getElementById("pwd").value)
    }
    else{
      console.log('Login')
      console.log(document.getElementById("email").value,document.getElementById("pwd").value)
    }
  }
  return (
    <div className='pt-5 '>
        <button className='bg-gray-600 w-96 border-slate-700 text-white divide-zinc-800 pt-2 pr-5 pl-5 pb-2 rounded-lg' onClick={onClick}> {value} </button>
    </div>
  )
}

export default Button