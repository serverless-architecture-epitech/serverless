import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from 'src/pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './utils/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

const firebaseConfig = {
  apiKey: "AIzaSyB1lKjBNKf6MIA4TCbqkP2FwbdRIsRVUJs",
  authDomain: "serverless-14c0c.firebaseapp.com",
  projectId: "serverless-14c0c",
  storageBucket: "serverless-14c0c.appspot.com",
  messagingSenderId: "305705479418",
  appId: "1:305705479418:web:da10279c3d3d77b32aed43"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route index element={!auth ? <Navigate to={'/login'} /> : <Home />} />
        <Route path="/login" element={auth ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/register" element={auth ? <Navigate to={'/'} /> : <Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
