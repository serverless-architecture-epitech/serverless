import { getAuth } from "firebase/auth";
import useAuth from "src/utils/useAuth";
import styled from "styled-components";

export default () => {
    const user = useAuth();

    return (
        <StyledHome>
            <h1>Welcome {user?.email}</h1>
            <LogoutButton onClick={() => {
                const auth = getAuth();
                auth.signOut();
            }}>Logout</LogoutButton>
        </StyledHome>
    );
}

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const LogoutButton = styled.button`
    margin-top: 20px;
`;