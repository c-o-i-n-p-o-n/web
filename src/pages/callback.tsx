import { useEffect, useState } from 'react';
import { AuthService } from '../services/AuthService';
import useSecurityStore from '../stores/SecurityStore';
import { useRouter } from 'next/router';
import { Box, styled, Typography } from '@mui/material';
import { Logo } from '../components/Logo';
import Alert from '../components/Alert/Alert';

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledContentContainer = styled('div')(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    width: "70vw",
    height: "100vh",
  },

  [theme.breakpoints.up("sm")]: {
    width: "70vw",
    height: "100vh",
  }

}));

const authService = new AuthService();

const Callback = () => {

    
    const [errorMessage, setErrorMessage] = useState("");
    const securityStore = useSecurityStore();
    const router = useRouter();

    useEffect(() => {
        let active = true;
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const verifier = sessionStorage.getItem('pkce_code_verifier')!;
            console.log(verifier);
            console.log(code);
            console.log(params.toString());
            //alert(verifier);
            if (!!code && !!verifier) {
                
                authService
                    .exchangeCodeForToken(code, verifier)
                    .then((json) => {
                    if (useSecurityStore.getState().logged) {
                        router.push("/");
                    } else {
                        setErrorMessage("Erro interno")
                    }
                    })
                    .catch((err) => setErrorMessage(err.error_description))
                    .finally(() => {  });
                // try {
                //     const tokenData = await authService.exchangeCodeForToken(code, verifier);
                //     localStorage.setItem('access_token', tokenData.access_token);
                //     alert('Login efetuado com sucesso!');
                //     window.location.href = '/';
                // } catch (err) {
                //     console.error(err);
                //     alert('Erro ao autenticar');
                // }
            }
        };
        
        if(!!active){
            handleAuth();
        }
        
        return () => {
            active = false;
        };
        
    }, [router]);

    return <StyledBox>
      <StyledContentContainer>
              <div onClick={() => router.push("/")}>
                <Logo />
              </div>
          <Typography align="center">Processando autenticação...</Typography>
            <Typography
              gutterBottom
              color="error"
              variant="subtitle2"
              align="center"
            >
            <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                <p>{errorMessage}</p>
            </Alert>
            </Typography>
      </StyledContentContainer>



    </StyledBox>
    
    ;
};

export default Callback;
