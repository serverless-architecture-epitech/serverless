import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import { getAuth } from 'firebase/auth';
import useAuth from "src/utils/useAuth";
import { useEffect } from "react";

const Sidebar = () => {
    const user = useAuth();

    useEffect(() => {
        if (user) {
            user.getIdTokenResult().then(idTokenResult => {
                console.log(idTokenResult);
                // setAdmin();
            });
        }
    }, [user]);

    return <StyledSidebar>
        <LogoutButton onClick={() => {
            const auth = getAuth();
            auth.signOut();
        }}>Logout</LogoutButton>
        <SidebarButton as={Link} to={'/'}>Upload</SidebarButton>
        <SidebarButton as={Link} to={'/chat'}>Chat</SidebarButton>
    </StyledSidebar>
}

const StyledSidebar = styled.div`
    width: 200px;
    height: 100%;
    padding: 20px;
    background-color: #f5f5f5;
    border-right: 1px solid #e5e5e5;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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
    font-size: 16px;
`;

const SidebarButton = styled(Button)`
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
`

export default Sidebar;