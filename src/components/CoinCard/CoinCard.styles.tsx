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

// export const StyledTypographyTitle = styled(Typography)({
//     height: "24px",
//     paddingTop: "13px",
//     paddingRight: "200px",
//     fontSize: "15px",
//     color: "white"
// });


export const StyledTypographyTitle = styled(Typography)({
    height: "24px",
    paddingTop: "2px",
    fontSize: "15px",
    //color: "#060D04"
    color: "white"
});

const ExpandeMoreIcon = (props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
};



export const CoinAndExpandMore = styled("div")({
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


export const BodyCardContent = styled(CardContent)({
    padding: "8px",
    ":last-child": {
        padding: "16px"
    }
});

export const HeaderButton = styled("div")({
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
})

export const TypeButton = styled("a")({
    //color: "white",
    color: "#060D04",
    //background: '#234A17',
    background: '#75F94D',
    borderRadius: "15px",
    padding: ".5rem",
    margin: "5px"
})

export const StyledCardContentHeader = styled(CardContent)({
    //backgroundColor: '#75F94D',
    padding: "0 16px",
    cursor: "pointer",
    height: "3.5rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between"
});



export const StyledTypographyData = styled(Typography)({
    //height: "24px",
    maxWidth: "200px",
    paddingTop: "22px",
    fontSize: "12px",
    color: "white",
    paddingLeft: "20px"
});



export const ExpandMore = styled(ExpandeMoreIcon)(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    //color: "#060D04",
    color: "white",
    padding: 0,
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


