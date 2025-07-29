import React from "react";
import Container from "@mui/material/Container";

import styled from "@emotion/styled";
import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from '@mui/icons-material/Facebook';
import MailIcon from "@mui/icons-material/Mail";
import { Typography } from "@mui/material";

import RegisterLogo from "./RegisterLogo";
import { useGoogleLogin } from "@react-oauth/google";

import { StyledLink } from "../styles/shared-styles";
import { useRouter } from "next/router";
import useSecurityStore from "../stores/SecurityStore";
import SimpleButton from "../components/buttons/SimpleButton";
// import SocialButton from '../components/buttons/SocialButton';

const StyledPageContainer = styled(Container)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  height: "100vh",
});

const StyledButtons = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "30vh",
  width: "100%",
  color: "white",
});

interface SocialLoginProps {
  setShowSignUpForm: (shouldShowSignUpForm: boolean) => void;
}

const SocialLoginPage = ({ setShowSignUpForm }: SocialLoginProps) => {
  // const onLoginSuccess = (e: any) => {
  //     console.log(e);
  // }
  //
  // const onLoginFailure = (e: any) => {
  //     console.log(e);
  // }

  const signinWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      useSecurityStore.setState({ token: "", logged: true });
      router.push("/"); 
    },
  });

  const router = useRouter();

  // const checkIfNextIsRunningOnBrowserToRenderComponent = typeof window === 'object';

  return (
    <StyledPageContainer>
      <RegisterLogo />

      <StyledButtons>
        <SimpleButton
          variant="outlined"
          style={{ maxWidth: "20rem" }}
          startIcon={<GoogleIcon />}
          onClick={() => signinWithGoogle()}
        >
          ENTRE COM O GOOGLE
        </SimpleButton>
        {/*{*/}
        {/*    checkIfNextIsRunningOnBrowserToRenderComponent ?*/}
        {/*        <SocialButton*/}
        {/*            variant="outlined"*/}
        {/*            startIcon={<FacebookIcon/>}*/}
        {/*            appId={""}*/}
        {/*            style={{ maxWidth: "20rem" }}*/}
        {/*            provider={"facebook"}*/}
        {/*            onLoginSuccess={onLoginSuccess}*/}
        {/*            onLoginFailure={onLoginFailure}>*/}
        {/*            ENTRE COM O FACEBOOK*/}
        {/*        </SocialButton>*/}
        {/*        : null*/}
        {/*}*/}
        <Typography variant="body1">Ou</Typography>
        <SimpleButton
          variant="outlined"
          style={{ maxWidth: "20rem" }}
          startIcon={<MailIcon />}
          onClick={() => setShowSignUpForm(true)}
        >
          CONTINUE COM O E-MAIL
        </SimpleButton>
        <Typography variant="body1">
          Já possui uma conta?{" "}
          <StyledLink onClick={(_e) => router.push("/")//router.push("/login")
          }>
            Faça Login
          </StyledLink>
        </Typography>
      </StyledButtons>

      <Typography variant="body2" color={"white"}>
        Ao cadastrar-se, você aceita os nosssos
        <StyledLink onClick={(_e) => router.push("legal/terms-of-service")}>
          {" "}
          Termos de Uso{" "}
        </StyledLink>{" "}
        e
        <StyledLink onClick={(_e) => router.push("legal/privacy-notice")}>
          {" "}
          Política de Privacidade{" "}
        </StyledLink>
      </Typography>
    </StyledPageContainer>
  );
};

export default SocialLoginPage;
