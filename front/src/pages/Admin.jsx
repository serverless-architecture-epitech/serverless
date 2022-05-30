import { StyledContainer } from "src/components/styled";
import useAuth from "src/utils/useAuth";
import styled from "styled-components";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, query, where, getDocs } from "firebase/firestore";

import Channel from "src/components/Channel";
import Sidebar from "src/components/Sidebar";
import { EmailVerify } from "./Home";
import {useEffect, useState} from "react";
import HistoryRouter, {useRoutes} from "react-router-dom";

const firebaseConfig = {
    apiKey: "AIzaSyB1lKjBNKf6MIA4TCbqkP2FwbdRIsRVUJs",
    authDomain: "serverless-14c0c.firebaseapp.com",
    projectId: "serverless-14c0c",
    storageBucket: "serverless-14c0c.appspot.com",
    messagingSenderId: "305705479418",
    appId: "1:305705479418:web:da10279c3d3d77b32aed43"
};

firebase.initializeApp(firebaseConfig);
const ref = firebase.firestore().collection("users");
let items = []



const Admin = () => {
    const [data, setdata] = useState([]);
    const user = useAuth();

    function userIsAdmin() {
        for (let i = 0; data[i]; i++) {
            if ( data[i].name && user &&  data[i].name === user.displayName) {
                if (!data[i].roles.includes('admin')){
                console.log(data[i])
                    return false;
                } else {return (true)}
            }
        }
        return false;
    }
    useEffect(() => {
        ref.onSnapshot((querrySnapshot) => {
            querrySnapshot.forEach((doc) => {
                items.push(doc.data())
            })
            setdata(items)
        })
    })

    if (!user || userIsAdmin() === false) {
        return null;
    }
    if (!user.emailVerified) {
        return <EmailVerify />;
    }

    return (
        <StyledApp>
            <Sidebar />
            <Container>
                {data.map((data: any) => <div><ul>{data.name}</ul> <br/></div>) }
            </Container>
        </StyledApp>
    );
}

const StyledApp = styled(StyledContainer)`
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
`

const Email = styled.div`
`;

const Container = styled.div`
    flex: 1;
    padding: 40px;
    box-sizing: border-box;
`;

export default Admin;
