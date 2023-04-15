import React from 'react'
const logout = () => {
    const exit=()=>{
        localStorage.removeItem('user:token')
        window.location.href='/form'
    }
    const load=()=>{
        window.location.href='/form'
    }

  return (
    <>
    <div onLoad={load}><button onClick={exit}> exit </button></div>
    </>
  )
}

export default logout