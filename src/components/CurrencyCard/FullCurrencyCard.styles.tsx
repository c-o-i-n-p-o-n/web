import {Card, CardContent, IconButton, IconButtonProps, styled, Typography} from "@mui/material";
import React from "react";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const contrastBackgroundColor = "#503071";

export const StyledCard = styled(Card)({
    backgroundColor: "#333333",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: "5px 0",
    borderRadius: '25px 25px',
});

export const StyledTypography = styled(Typography)({
    height: "24px",
    paddingTop: "2px",
    fontSize: "12px",
    color: "#6B61F5"
});

export const StyledTypographyTitle = styled(Typography)({
    height: "24px",
    paddingTop: "2px",
    fontSize: "15px",
    color: "white"
});

export const StyledTypographyData = styled(Typography)({
    height: "24px",
    paddingTop: "22px",
    fontSize: "12px",
    color: "white",
    paddingLeft: "20px"
});

export const StyledButton = styled(IconButton)({
    display: "flex",
    color: "white",
    flexDirection: "column",
    ".form-field": {
        margin: "1vh 0"
    },
    ".submit-button-terms": {
        margin: "2vh 0",
    },
    //background: "#370365",
    borderRadius: "50px",




    fontSize: "16px",

    fontWeight: "bold",


})

export const StyledCardContentHeader = styled(CardContent)({
    backgroundColor: '#1A1A1A',
    padding: "0 16px",
    cursor: "pointer",
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
});


const ExpandeMoreIcon = (props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
};

export const ExpandMore = styled(ExpandeMoreIcon)(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    color: "white",
    padding: 0,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const HeaderButton = styled("div")({
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
})

export const BodyCardContent = styled(CardContent)({
    padding: "8px",
    ":last-child": {
        padding: "16px"
    }
});

export const EventTimeAndExpandMore = styled("div")({
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "p": {
        margin: 0,
        paddingRight: "10px"
    }
});

export const DescriptionLine = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "start",
})

export const Description = styled("div")({
    color: "white",
    display: "flex",
    alignItems: "center",
    width: "100%",
    "p": {
        margin: 0,
        height: "100%",
        paddingRight: "10px",
        textAlign: "start",
    },
})

export const Odd = styled("div")({
    color: "white",
    background: '#6B61F5',
    borderRadius: "5px",
    padding: ".5rem",
    margin: "5px"
})



export const TypeButton = styled("a")({
    color: "white",
    background: '#6B61F5',
    borderRadius: "15px",
    padding: ".5rem",
    margin: "5px"
})



