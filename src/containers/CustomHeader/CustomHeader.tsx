import Link from "next/link";

import { Box, Container, IconButton, Menu, MenuItem, Skeleton, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Logo } from "../../components/Logo";
import { StyledAvatar } from "../../components/StyledAvatar/StyledAvatar";
import { Column, Margin, Padding, Row } from "../../styles/shared-styles";
import { AvatarText, BrandWrapper, StyledHeader, UserNameColumn, UserNameColumnText } from "./CustomHeader.styles";
import { AuthService } from "../../services/AuthService";

const authService = new AuthService();

export default function CustomHeader({children, ...style}: { children?: React.ReactNode, style?: {} }) {
  const router = useRouter();
  const [logged, setLogged] = useState<Boolean>(false);
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(0.0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { isLoading, error, data: user, isSuccess } = useQuery(['getUser'], authService.getUser);

  useEffect(() => {
    setLogged(authService.isLogged);
  }, [authService.isLogged, user]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget);

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

    authService.signOut();
    router.reload();
  };


  const LoginRegisterButtons = () => {
    return (
      <Row>
        <Margin margin="0 5px 0 0">
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </Margin>


        <Margin margin="0 0 0 5px">
          <Link href="/signup" className="hover:underline">
            Registro
          </Link>
        </Margin>
      </Row>
    );
  }

  return (
    <StyledHeader {...style}>
      <Container>


        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>

            <BrandWrapper sx={{ flexGrow: 1 }}>
              <Logo />
            {!!children?children:<></>}
            </BrandWrapper>


            {!logged ? <LoginRegisterButtons /> :
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
                  <MenuItem onClick={handleClose}>Sair</MenuItem>
                </Menu>
              </Row>}

          </Toolbar>
        </Box>
      </Container>
    </StyledHeader >
  );
}
