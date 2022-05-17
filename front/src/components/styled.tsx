import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #fafafa;
`;

export const StyledAuthForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    margin-top: 20px;
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

export const StyledButton = styled.button`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #000;
    cursor: pointer;
`;

export const StyledRedirectLink = styled(Link)`
    color: #000;
    text-decoration: none;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
`;