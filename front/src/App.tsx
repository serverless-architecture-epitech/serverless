import React from 'react';
import { initializeApp } from "firebase/app";
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from 'src/pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const firebaseConfig = {
  apiKey: "AIzaSyB1lKjBNKf6MIA4TCbqkP2FwbdRIsRVUJs",
  authDomain: "serverless-14c0c.firebaseapp.com",
  projectId: "serverless-14c0c",
  storageBucket: "serverless-14c0c.appspot.com",
  messagingSenderId: "305705479418",
  appId: "1:305705479418:web:da10279c3d3d77b32aed43"
};

// Initialize Firebase

const history = createBrowserHistory();
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <>
      <ToastContainer />
      <Router history={history}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
