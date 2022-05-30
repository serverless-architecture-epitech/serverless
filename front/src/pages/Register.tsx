import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { StyledAuthForm, StyledButton, StyledContainer, StyledInput, StyledRedirectLink } from 'src/components/styled';
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Register = () => {
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
        // @ts-ignore
        const name = e.target.name.value;

        if (password !== passwordConfirm) {
            toast.error('Password does not match');
            return;
        }

        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);

            sendEmailVerification(user.user);

            updateProfile(user.user, {
                displayName: name
            }).catch((error: any) => {
                console.log('Profile not updated: ' + error);
            });

            const userRef = doc(getFirestore(), 'users', user.user.uid);
            setDoc(userRef, {
                name
            });

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
            <StyledInput name={'name'} placeholder="John Doe" />
            <StyledInput name={'email'} placeholder="Email" />
            <StyledInput name={'password'} placeholder="Password" type={'password'} />
            <StyledInput name={'passwordConfirm'} placeholder="Password confirmation" type={'password'} />
            <StyledButton>Register</StyledButton>
            <StyledRedirectLink to="/login">Already have an account?</StyledRedirectLink>
        </StyledAuthForm>
    </StyledContainer>
    );
}

export default Register;
