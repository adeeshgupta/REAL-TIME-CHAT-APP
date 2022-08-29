import React, { useState, useEffect } from "react";
import styled from "styled-components";
import jwt_decode from "jwt-decode"
import App from "../App";
import cookieManager from "../managers/cookieManager";
import httpManager from "../managers/httpManager";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #dcdddc;
  height: 100vh;
`;

const Header = styled.div`
  color: white;
  width: 100%;
  font-weight: bold;
  background-color: #06a884;
  padding: 50px 200px 150px;
  font-size: 16px;
`;
const CardView = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 30px 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -80px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 40px;
  flex-wrap: wrap;
`;

const Instructions = styled.div`
  padding: 20px;
  font-size: 16px;

  ol {
    margin: 40px 0;
  }

  li {
    margin: 15px 0;
  }
`;

const Heading = styled.span`
  font-size: 24px;
  color: #525252;
`;

const QRCode = styled.img`
  width: 264px;
  height: 264px;
  background-color: white;
`;

const LoginComponent = () => {
  const [userInfo, setUserInfo] = useState();

  const responseGoogle = async (response) => {
    const userObject = jwt_decode(response.credential);
    await httpManager.createUser({
      email: userObject.email,
      name: userObject.name,
      picture: userObject.picture,
    });
    setUserInfo(userObject);
    cookieManager.setUserInfo(userObject);
  };

  useEffect(() => {
    const userData = cookieManager.getUserInfo();
    if (userData !== userInfo)
      setUserInfo(userData);
    if(!userInfo) {
      window.google.accounts.id.initialize({
        client_id: "704068212424-mt9kmllom3nkhr0qffkotur5eg12rnek.apps.googleusercontent.com",
        callback: responseGoogle
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline" })
    }
  }, []);

  return (
    <>
      {userInfo ? (
        <App userInfo={userInfo} />
      ) : (
        <Container>
          <Header>CHATAPP WEB</Header>
          <CardView>
            <Instructions>
              <Heading>To use ChatApp on your computer:</Heading>
              <ol>
                <li>You need to Signin using your Google Account.</li>
                <li>You can anytime logout from the Web.</li>
                <li>Click on Signin button to continue using the ChatApp</li>
              </ol>
              <button id="signInDiv"></button>
            </Instructions>
            <QRCode src="/images/welcome.jpg" />
          </CardView>
        </Container>
      )}
    </>
  );
};
export default LoginComponent;