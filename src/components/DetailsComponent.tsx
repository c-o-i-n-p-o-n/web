import {Collapse} from "@mui/material";
import React, {MouseEventHandler, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    BodyCardContent,
    Description,
    DescriptionLine,
    EventTimeAndExpandMore,
    ExpandMore,
    HeaderButton,
    StyledCard,
    StyledCardContentHeader,
    StyledButton,
    StyledTypographyTitle
} from "./DetailsComponent.styles";
import { Column, Row } from "../styles/shared-styles";
import { MatchService } from "../services/MatchService";
import Match from "../models/Match";
import Bookmaker from "../models/Bookmaker";
import Voucher from "../models/Voucher";




const MyButtons = ({onClickHandler, ...style}: { onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {

    return (
        <DescriptionLine {...style}>
            <Description>
                {/* <StyledButton onClick={onClickHandler}>
                    <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon>
                </StyledButton> */}
            </Description> 
        </DescriptionLine>
    );

    
}

interface DataProps {
    children: any;
    title: string;
    bookmaker?: Bookmaker;
}

const betService = new MatchService();

export default function DetailsComponent({children,title}: DataProps) {

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const editImageHandler = () => {
        setExpanded(!expanded);
    };
    
    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                <HeaderButton>
                    
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {title}
                        </StyledTypographyTitle>
                    </Column>
                    <EventTimeAndExpandMore>
                        {<ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="opções">
                            <ExpandMoreIcon/>
                        </ExpandMore> }
                    </EventTimeAndExpandMore>
                </HeaderButton>
            </StyledCardContentHeader>

            
            <Collapse in={expanded} timeout="auto" unmountOnExit>                        
                <BodyCardContent>
                    <MyButtons
                        onClickHandler={editImageHandler}
                        style={{
                            marginBottom: '5px'
                        }}/>
                </BodyCardContent>
            </Collapse> 


            <BodyCardContent>
                
                <DescriptionLine >
                    {children}
                </DescriptionLine>
                
            </BodyCardContent>
        </StyledCard>
    );
}
