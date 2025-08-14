import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { Logo } from "../components/Logo";


const StyledHeaderContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: "20vh",
    color: "white"
})

const RegisterLogo = () => {
    const router = useRouter();
    return (
        <StyledHeaderContainer >
            <div onClick={() => router.push("/")}>
                <Logo />
            </div>

            <Typography variant="subtitle1" textAlign={"center"} sx={{ width: "60vw" }}>
                Cadastre-se para ganhar, criar, apostar e negociar cupons
            </Typography>
        </StyledHeaderContainer>
    );
};

export default RegisterLogo;