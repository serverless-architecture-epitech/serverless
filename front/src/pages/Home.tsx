import { getAuth, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { StyledContainer } from "src/components/styled";
import useAuth from "src/utils/useAuth";
import styled from "styled-components";
import { getStorage } from 'firebase/storage';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import FileList from "src/components/FileList";
import Upload from "src/components/Upload";

const EmailVerify = () => {
    const user = useAuth();
    const [sent, setSent] = useState(false);

    const sendMail = useCallback(() => {
        if (user) {
            sendEmailVerification(user)
                .then(() => {
                    toast.success("Email verification sent");
                    setSent(true);

                    setTimeout(() => {
                        setSent(false);
                    }, 5000);
                })
                .catch(() => {
                    toast.error("Error sending email verification");
                })
        }
    }, [user]);

    return (
        <StyledContainer>
            <h1>Verify your email</h1>
            <p>Please verify <b>{user?.email}</b> before continuing.</p>
            {!sent ? (
                <EmailVerification onClick={sendMail}>Resend verification email</EmailVerification>
            ) : (
                <EmailVerification style={{ backgroundColor: '#07bc0c', color: 'white', cursor: 'default' }}>Email verification sent</EmailVerification>
            )}
        </StyledContainer>
    );
}

export default () => {
    const user = useAuth();

    if (!user) {
        return null;
    }

    if (!user.emailVerified) {
        return <EmailVerify />;
    }

    return (
        <StyledApp>
            <Sidebar>
                <LogoutButton onClick={() => {
                    const auth = getAuth();
                    auth.signOut();
                }}>Logout</LogoutButton>
            </Sidebar>
            <Container>
                <Email>
                    connected as : <b>{user?.email}</b>
                </Email>
                <FileList />
            </Container>
        </StyledApp>
    );
}

const StyledApp = styled(StyledContainer)`
    flex-direction: row;
    align-items: flex-start;
    justify-content: start;
`

const Sidebar = styled.div`
    width: 200px;
    height: 100%;
    padding: 20px;
    background-color: #f5f5f5;
    border-right: 1px solid #e5e5e5;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const LogoutButton = styled.button`
    // make it look like a dangerous button
    background-color: /* red button */ #ff0000;
    border: 1px solid #00000018;
    color: white;
    cursor: pointer;
    padding: 10px 30px;
    border-radius: 5px;
    width: 100%;
    align-self: flex-end;
    justify-self: flex-end;
    &:hover {
        background-color: /* hover red button */ #cc0000;
    }
`;

const Email = styled.div`
`;

const UserProfileButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
`;

const Container = styled.div`
    flex: 1;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const EmailVerification = styled.button`
    background-color: #fff;
    border: 1px solid #00000018;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    color: #000;
    font-size: 14px;
    font-weight: bold;
    margin-top: 20px;
    &:hover {
        background-color: #f5f5f5;
    }
`;