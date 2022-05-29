/*import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";*/
import { StyledContainer } from "src/components/styled";
import useAuth from "src/utils/useAuth";
import styled from "styled-components";
import Channel from "src/components/Channel";
import Sidebar from "src/components/Sidebar";
import { EmailVerify } from "./Home";

// eslint-disable-next-line import/no-anonymous-default-export
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
			<Sidebar />
			<Container>
				<Email>
					connected as : <b>{user?.email}</b>
				</Email>
				<Channel />
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
