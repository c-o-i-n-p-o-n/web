import {Collapse} from "@mui/material";
import React, {MouseEventHandler, useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';

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
} from "./Bookmakers.styles";
import { Column, Row } from "../../styles/shared-styles";
import Bookmaker from "../../models/Bookmaker";
import Voucher from "../../models/Voucher";
import Currency from "../../models/Currency";
import { CurrencyService } from "../../services/CurrencyService";
import { BookmakerService } from "../../services/BookmakerService";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";


interface DataProps {
    bookmaker?:Bookmaker;
}

const bookmakerService = new BookmakerService();

export default function BookmakersData({bookmaker}: DataProps) {


    return (!!bookmaker?
        <>
            
            <DescriptionLine >
                <Description>
                    <StyledAvatar photoUrl={bookmaker?.logo} size={35} name={!!bookmaker?.hid?bookmaker?.hid[0]:"I"} />
                    <StyledTypographyTitle variant="body2">
                        {""}
                    </StyledTypographyTitle> 
                    <StyledTypographyTitle variant="body2">
                        {bookmaker?.hid}
                    </StyledTypographyTitle> 
                </Description> 
            </DescriptionLine>
            <Column>
                <StyledTypographyTitle variant="body2">
                    {bookmaker?.description}
                </StyledTypographyTitle> 
            </Column>
        </>:<></>
    );
}
