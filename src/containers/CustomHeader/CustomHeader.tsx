import Link from "next/link";

import { Box, CircularProgress, Container, IconButton, Menu, MenuItem, Skeleton, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Logo } from "../../components/Logo";
import { StyledAvatar } from "../../components/StyledAvatar/StyledAvatar";
import { Column, Margin, Padding, Row } from "../../styles/shared-styles";
import { AvatarText, BrandWrapper, StyledHeader, UserNameColumn, UserNameColumnText } from "./CustomHeader.styles";
import { AuthService } from "../../services/AuthService";
import CenteredComponent from "../../components/CenteredComponent";

const authService = new AuthService();



const LoginLink = (props:{loginUrl:string | undefined}) => {
  //const clientId = 'backend';
  //const redirectUri = '/callback';
  //const authServer = process.env.NEXT_PUBLIC_AUTHORIZATION_CODE_LOGIN;// 'http://localhost:8003/oauth2/authorize';
  //const codeChallenge = '...'; // gerado com PKCE util (ver abaixo)
  //const state = crypto.randomUUID();

  //const url = `${authServer}?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //    redirectUri
  //  )}&scope=openid%20profile&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  console.log(props.loginUrl);
  return !!!props.loginUrl? <></>:
  <Link href={props.loginUrl} className="hover:underline">
    Login
  </Link>;
};


const LoginRegisterButtons = (propos:{loginUrl:string|undefined}) => {
  return (
    <Row>
      <Margin margin="0 5px 0 0">
        <LoginLink loginUrl={propos.loginUrl}/>
        
        {/* <Link href="/login" className="hover:underline">
          Login
        </Link> */}
      </Margin>


      <Margin margin="0 0 0 5px">
        <Link href="/signup" className="hover:underline">
          Registro
        </Link>
      </Margin>
    </Row>
  );
}

export default function CustomHeader({children, ...style}: { children?: React.ReactNode, style?: {} }) {
  const router = useRouter();
  const [logged, setLogged] = useState<Boolean>(false);
  const [loginUrl, setLoginUrl] = useState<string|undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(0.0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isLoading, error, data: user, isSuccess } = useQuery(['getUser'], authService.getUser);

  useEffect(() => {
    setLogged(authService.isLogged);
  }, [user]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);

    setAnchorEl(event.currentTarget);
  };

  const handleBalances = () => {
    router.push('balances');
  };

  const handleProfile = () => {
    router.push('bookmaker-created');
  };

  const handleClose = () => {
    setAnchorEl(null);

    authService.signOut();
    router.reload();
  };
    
  //let active = true;

  useEffect(() => {
    let active = true;
    const redirectToAuth = async () => {
      const { codeVerifier, codeChallenge } = await authService.generatePKCE();
      //const verifier = sessionStorage.getItem('pkce_code_verifier')!;
      //const challenge = sessionStorage.getItem('pkce_code_verifier')!;
      //console.log(verifier);
      //console.log(challenge);
      console.log(codeChallenge);
      console.log(codeChallenge);
      //if(!!!verifier || !!!challenge){
      sessionStorage.setItem('pkce_code_challenge', codeChallenge);
      sessionStorage.setItem('pkce_code_verifier', codeVerifier);
      const loginUrl = authService.buildLoginUrl(codeChallenge);
      //alert(codeVerifier);
      setLoginUrl(loginUrl);
      //}else{
      //  setLoginUrl(authService.buildLoginUrl(challenge));
      //}
      
    };
        
    if(!!active){
        redirectToAuth();
    }
    
    return () => {
        active = false;
    };
  }, []);



  return (
    <StyledHeader {...style}>
      <Container>


        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>

            <BrandWrapper sx={{ flexGrow: 1 }}>
              <Logo />
            {!!children?children:<></>}
            </BrandWrapper>


            {!logged ? <LoginRegisterButtons loginUrl={loginUrl}/> :
              <Row>
                {/* <UserNameColumn sx={{ width: "50vw" }}> */}
                <UserNameColumn >
                  <UserNameColumnText textAlign={"right"}>Olá,</UserNameColumnText>

                  {isLoading ?
                    <Padding padding={"0 0 0 25px"}>
                      <Margin margin={"0 15px 0 0"}>
                        <Skeleton variant="text" sx={{ fontSize: '.8rem' }} />
                      </Margin>
                    </Padding> :
                    <UserNameColumnText textAlign={"right"}>{user?.userName}</UserNameColumnText>}
                </UserNameColumn>

                <Column>
                  <IconButton onClick={handleMenu}>
                    {isLoading ?
                      <Skeleton variant="circular" width={45} height={45} /> : <StyledAvatar photoUrl={user?.photo} size={45} />}
                  </IconButton>
                  {/* {isLoading ? <Skeleton variant="text" sx={{ fontSize: '.8rem', width: "50%" }} /> : <AvatarText textAlign={"center"} marginRight="0">R$: {balance}</AvatarText>} */}
                </Column>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  sx={{ mt: '45px' }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Perfil</MenuItem>
                  <MenuItem onClick={handleBalances}>Saldos</MenuItem>
                  <MenuItem onClick={handleClose}>Sair</MenuItem>
                </Menu>
              </Row>}

          </Toolbar>
        </Box>
      </Container>
    </StyledHeader >
  );
}
