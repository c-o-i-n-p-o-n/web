import { css, styled, Typography } from "@mui/material";
import { Column } from "../../styles/shared-styles";


export const StyledHeader = styled("header")({
    padding: ["0", "0 5vw"],
    margin: "0",
    background: "#370365",
    color: "#FFFFFF",
    height: "10vh",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
});

const MyThemeComponent = styled('div')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
}));

export const StyledLinkContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
    width: "50vw",
    [theme.breakpoints.up('md')]: {
        width: "50vw"
    },
    [theme.breakpoints.up('lg')]: {
        width: "50vw"
    }
}));

export const BrandWrapper = styled("div")({
    display: "flex",
    alignItems: "center"
})

export const UserNameColumn = styled(Column)({
    justifyContent: "center"
})

export const AvatarText = styled(Typography)({
    fontSize: ".8rem",
})

export const UserNameColumnText = styled(AvatarText)(({ theme }) => ({
    marginRight: "15px",
    [theme.breakpoints.down(330)]: {
        display: "none"
    },
}));