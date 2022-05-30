import { StyledContainer } from "src/components/styled";
import useAuth from "src/utils/useAuth";
import styled from "styled-components";
import Channel from "src/components/Channel";
import Sidebar from "src/components/Sidebar";
import { EmailVerify } from "./Home";

const Chat = () => {
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

export default Chat;