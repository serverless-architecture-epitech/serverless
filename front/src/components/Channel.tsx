import React, {useEffect, useRef, useState} from 'react';
import '../styles/Channel.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from "styled-components";

const firebaseConfig = {
    apiKey: "AIzaSyB1lKjBNKf6MIA4TCbqkP2FwbdRIsRVUJs",
    authDomain: "serverless-14c0c.firebaseapp.com",
    projectId: "serverless-14c0c",
    storageBucket: "serverless-14c0c.appspot.com",
    messagingSenderId: "305705479418",
    appId: "1:305705479418:web:da10279c3d3d77b32aed43"
};
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

function Channel() {
    //const [user] = useAuthState(auth);

    return (
      <div className="Channel">
          <StyledTitle>Chat</StyledTitle>
          <section>
              <ChatRoom />
          </section>
      </div>
    );
}

const getUsername = (o: any) => o?.displayName || o?.email || o?.username || o?.uid

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    let query = messagesRef.orderBy('createdAt').limit(25);

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
            uid,
            username: getUsername(auth) || uid
        })

        setFormValue('');
        // @ts-ignore
        /*useEffect(() => {
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        });*/
    }

    return (<>
        <main>
            {messages && messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
        </main>
        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="..." />
            <button type="submit" disabled={!formValue}>Send</button>
        </form>
    </>)
}


// @ts-ignore
function ChatMessage(props) {
    const { text, uid, username } = props.message;

    // @ts-ignore
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <p className={'msg'}>{`${messageClass === 'received' ? getUsername(props.message) + ': ' : ''}${text}`}</p>
        </div>
    </>)
}

const StyledTitle = styled.h2`
    margin: 20px 0;
`;

export default Channel;
