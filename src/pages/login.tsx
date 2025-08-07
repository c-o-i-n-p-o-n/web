import { Error, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel, Grid, IconButton,
  InputAdornment,
  Link,
  styled,
  TextField,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import CustomButton from "../components/CustomButton";
import { Logo } from "../components/Logo";
import { Credentials } from "../models/Credentials";
import { AuthService } from "../services/AuthService";
import useSecurityStore from "../stores/SecurityStore";

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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saveInformation, setSaveInformation] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmBtnDisabled, setIsConfirmBtnDisabled] = useState(true);
  const [isConfirmBtnLoading, setIsConfirmBtnLoading] = useState(false);
  const securityStore = useSecurityStore();
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>();
  console.log('aqui');

  useEffect(() => {
    if (securityStore.logged) {
      router.push("/");
    }
  });//, []);
  
  useEffect(() => {
    setIsConfirmBtnDisabled(
      () =>
        !getUsernamePattern().test(username) ||
        password.length < 6 ||
        password.length > 12
    );
  }, [username, password]);

  useEffect(() => {
    const ref = usernameRef.current;
    ref?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsConfirmBtnLoading(true);
    setIsConfirmBtnDisabled(true)
    authService
      .login({ username, password } as Credentials)
      .then((response) => {
        if (useSecurityStore.getState().logged) {
          router.push("/");
        } else {
          setErrorMessage("Erro interno")
        }
      })
      .catch((err) => setErrorMessage(err.error_description))
      .finally(() => { setIsConfirmBtnLoading(false); });
  };

  const handleShowPassword = (showPassword: boolean) => {
    setShowPassword(showPassword);
  };

  const getUsernamePattern = (): RegExp => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  return (
    <StyledBox>
      <StyledContentContainer>
        <div onClick={() => router.push("/")}>
          <Logo />
        </div>
        <Grid container component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() =>
                setIsUsernameInvalid(() => !getUsernamePattern().test(username))
              }
              inputRef={usernameRef}
              type="text"
              label="E-mail"
              variant="standard"
              error={isUsernameInvalid}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 3 }}>
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() =>
                setIsPasswordInvalid(
                  () => password.length < 6 || password.length > 16
                )
              }
              type={showPassword ? "text" : "password"}
              label="Senha"
              variant="standard"
              required
              fullWidth
              error={isPasswordInvalid}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 1, mb: 5 }}>
            <FormControlLabel
              control={
                <Checkbox
                  value={saveInformation}
                  onChange={(e) => setSaveInformation(e.target.checked)}
                />
              }
              sx={{
                color: "#4A4A4A",
              }}
              label={"Salvar Informações"}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              gutterBottom
              color="error"
              variant="subtitle2"
              align="center"
            >
              {!!errorMessage && (
                <>
                  <Error
                    sx={{ verticalAlign: "middle", fontSize: "large", mr: 0.8 }}
                  />
                  {errorMessage}
                </>
              )}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ mt: 3, mb: 1 }}>
            <CustomButton
              onSubmit={(e) => handleSubmit(e)}
              variant="contained"
              type="submit"
              disabled={isConfirmBtnDisabled}
              fullWidth
              loading={isConfirmBtnLoading}
            >
              ENTRAR
            </CustomButton>
          </Grid>
        </Grid>
        <Link
          sx={{ textUnderlineOffset: 2 }}
          color="#4A4A4A"
          // href="src/pages/login#"
          underline="always"
        >
          <Typography align="center">Esqueceu a senha?</Typography>
        </Link>
      </StyledContentContainer>
    </StyledBox>
  );
}
