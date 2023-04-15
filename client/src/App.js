import './App.css';
import Form from './modules/Form';
import Homepage from './modules/Messenger/homepage';
import React, { useState } from "react";
import { Routes, Route,Navigate } from "react-router-dom";
import Logout from './modules/Logout/logout';
const ProtectedRoutes =({children,auth=false})=>{
  const isLoggedIn= localStorage.getItem("user:token")!==null ;
  if(!isLoggedIn && auth){
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
          <ProtectedRoutes auth="{true}">
            <Homepage />
          </ProtectedRoutes>
        } />
        <Route path="/form" element={
            <ProtectedRoutes>
              <Form />
            </ProtectedRoutes>
        } />
        <Route path='/logout' element={
          <ProtectedRoutes auth="{true}">
            <Logout />
          </ProtectedRoutes>

        } />
          

      </Routes>
    </div>
  );
}
export default App;


