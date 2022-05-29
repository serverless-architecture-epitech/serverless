import React, { useRef, useState } from 'react';
//import './App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyB1lKjBNKf6MIA4TCbqkP2FwbdRIsRVUJs",
    authDomain: "serverless-14c0c.firebaseapp.com",
    projectId: "serverless-14c0c",
    storageBucket: "serverless-14c0c.appspot.com",
    messagingSenderId: "305705479418",
    appId: "1:305705479418:web:da10279c3d3d77b32aed43"
};

// Initialize Firebase

const app = firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const firestore = firebase.firestore();


function Channel() {

    //const [user] = useAuthState(auth);

    return (
      <div className="App">
          <header>
              <h1>⚛️🔥💬</h1>
          </header>

          <section>
              <ChatRoom />
          </section>

      </div>
    );
}


function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    // @ts-ignore
    const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    // @ts-ignore
    const sendMessage = async (e) => {
        e.preventDefault();

        // @ts-ignore
        const { uid } = auth.currentUser;

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })

        setFormValue('');
        // @ts-ignore
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (<>
        <main>

            {messages && messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}


        </main>

        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}


// @ts-ignore
function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    // @ts-ignore
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
            <p>{text}</p>
        </div>
    </>)
}


export default Channel;
