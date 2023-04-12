import './App.css';
import Form from './modules/Form';
import Homepage from './modules/Messenger/homepage';
import React, { useState } from "react";
import { Routes, Route,Navigate } from "react-router-dom";

const ProtectedRoutes =({children})=>{
  const isLoggedIn= localStorage.getItem("user:token")!==null;
  console.log("isloggedin:>> ",isLoggedIn)
  if(!isLoggedIn){
      return <Navigate to="/form" />
    }else if(isLoggedIn &&['/form'].includes(window.location.pathname)){
      return <Navigate to="/" />
    }
  return children;
}

function App() {
  return (
    <div className="bg-myBG h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Homepage />
          </ProtectedRoutes>
        } />
        <Route path="/form" element={
            <Form />
        } />
      </Routes>
    </div>
  );
}
export default App;


