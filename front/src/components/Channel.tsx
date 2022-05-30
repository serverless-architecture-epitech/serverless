import React, {useState} from 'react';
import '../styles/Channel.css';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import styled from "styled-components";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {addDoc, collection, getFirestore, orderBy, query, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB1lKjBNKf6MIA4TCbqkP2FwbdRIsRVUJs",
    authDomain: "serverless-14c0c.firebaseapp.com",
    projectId: "serverless-14c0c",
    storageBucket: "serverless-14c0c.appspot.com",
    messagingSenderId: "305705479418",
    appId: "1:305705479418:web:da10279c3d3d77b32aed43"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();

function Channel() {
    auth.currentUser?.getIdToken(true);
    return (
      <div className="Channel">
          <StyledTitle>Chat</StyledTitle>
          <section>
              <ChatRoom />
          </section>
      </div>
    );
}

const getUsername = (o: any) => o?.name || o?.displayName || o?.email || o?.username || o?.uid

function ChatRoom() {
    const messagesRef = collection(firestore, 'messages');
    let q = query(messagesRef, orderBy('createdAt'));

    // @ts-ignore
    const [messages] = useCollectionData(q);
    const [formValue, setFormValue] = useState('');

    // @ts-ignore
    const sendMessage = async (e) => {
        e.preventDefault();

        // @ts-ignore
        const { uid } = auth.currentUser;

        await addDoc(messagesRef,{
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            username: getUsername(auth.currentUser) || uid
        });

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
    const { text, uid } = props.message;

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
