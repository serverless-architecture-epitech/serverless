import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

export default () => {
    // a react callback function to login with firebase called login
    const register = useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
        e.preventDefault();
        const auth = getAuth();

        // @ts-ignore
        const email = e.target.email.value;
        // @ts-ignore
        const password = e.target.password.value;
        // @ts-ignore
        const passwordConfirm = e.target.passwordConfirm.value;

        if (password !== passwordConfirm) {
            toast.error('Password does not match');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Successfully registered');
        } catch (error) {
            // @ts-ignore
            toast.error(error.message);
        }
    }, []);

    return (
    <StyledHome>
        {/* <h1>Login</h1>
        <StyledAuthForm onSubmit={login}>
            <StyledInput placeholder="Email" />
            <StyledInput placeholder="Password" />
            <StyledButton>Login</StyledButton>
        </StyledAuthForm> */}

        <h1>Register</h1>
        <StyledAuthForm onSubmit={register}>
            <StyledInput name={'email'} placeholder="Email" />
            <StyledInput name={'password'} placeholder="Password" type={'password'} />
            <StyledInput name={'passwordConfirm'} placeholder="Password confirmation" type={'password'} />
            <StyledButton>Register</StyledButton>
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