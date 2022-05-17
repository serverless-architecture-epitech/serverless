import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { StyledAuthForm, StyledButton, StyledContainer, StyledInput, StyledRedirectLink } from 'src/components/styled';

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
        } catch (error) {
            // @ts-ignore
            toast.error(error.message);
        }
    }, []);

    return (
        <StyledContainer>
            <h1>Login</h1>
            <StyledAuthForm onSubmit={register}>
                <StyledInput name={'email'} placeholder="Email" />
                <StyledInput name={'password'} placeholder="Password" type={'password'} />
                <StyledButton>Login</StyledButton>
                <StyledRedirectLink className={StyledRedirectLink} to="/register">Don't have an account?</StyledRedirectLink>
            </StyledAuthForm>
        </StyledContainer>
    );
}
