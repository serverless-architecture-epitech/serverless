import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { StyledAuthForm, StyledButton, StyledContainer, StyledInput, StyledRedirectLink } from 'src/components/styled';

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
            const user = await createUserWithEmailAndPassword(auth, email, password);

            sendEmailVerification(user.user);

            toast.success('Successfully registered');
        } catch (error) {
            // @ts-ignore
            toast.error(error.message);
        }
    }, []);
    
    return (
    <StyledContainer>
        <h1>Register</h1>
        <StyledAuthForm onSubmit={register}>
            <StyledInput name={'email'} placeholder="Email" />
            <StyledInput name={'password'} placeholder="Password" type={'password'} />
            <StyledInput name={'passwordConfirm'} placeholder="Password confirmation" type={'password'} />
            <StyledButton>Register</StyledButton>
            <StyledRedirectLink to="/login">Already have an account?</StyledRedirectLink>
        </StyledAuthForm>
    </StyledContainer>
    );
}