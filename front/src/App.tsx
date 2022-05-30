import React from 'react';
import { initializeApp } from "firebase/app";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from 'src/pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './utils/useAuth';
import {Admin, Chat, Register, Login } from './pages/index'

const firebaseConfig = {
  apiKey: "AIzaSyB1lKjBNKf6MIA4TCbqkP2FwbdRIsRVUJs",
  authDomain: "serverless-14c0c.firebaseapp.com",
  projectId: "serverless-14c0c",
  storageBucket: "serverless-14c0c.appspot.com",
  messagingSenderId: "305705479418",
  appId: "1:305705479418:web:da10279c3d3d77b32aed43"
};

// Initialize Firebase

initializeApp(firebaseConfig);

function App() {
  const auth = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route index element={!auth ? <Navigate to={'/login'} /> : <Home />} />
        <Route path="/chat" element={!auth ? <Navigate to={'/login'} /> : <Chat />} />
        <Route path="/login" element={auth ? <Navigate to={'/'} /> : <Login />} />
        <Route path="/register" element={auth ? <Navigate to={'/'} /> : <Register />} />
        <Route path="/admin" element={!auth ? <Navigate to={'/'} /> : <Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
