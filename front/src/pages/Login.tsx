import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default () => {
    const register = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
        e.preventDefault();
        const auth = getAuth();

        // @ts-ignore
        const email = e.target.email.value;
        // @ts-ignore
        const password = e.target.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success('Successfully signed in');
        } catch (error) {
            // @ts-ignore
            toast.error(error.message);
        }
    }, []);

    return (
        <StyledHome>
            <h1>Login</h1>
            <StyledAuthForm onSubmit={register}>
                <StyledInput name={'email'} placeholder="Email" />
                <StyledInput name={'password'} placeholder="Password" type={'password'} />
                <StyledButton>Register</StyledButton>
                <Link to="/register">Don't have an account?</Link>
            </StyledAuthForm>
        </StyledHome>
    );
}

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #fafafa;
`;

const StyledAuthForm = styled.form`
    display: flex;  
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const StyledButton = styled.button`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #000;
`;

const RegisterLink = styled.a`
    color: #000;
    text-decoration: none;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
`;