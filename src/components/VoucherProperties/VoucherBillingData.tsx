import {CircularProgress, Collapse, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React, {MouseEventHandler, ReactNode, useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { format } from "date-fns";

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
    StyledFields,
    StyledTypographyTitle
} from "./Voucher.styles";
import { Column, Row } from "../../styles/shared-styles";
import Bookmaker from "../../models/Bookmaker";
import Voucher from "../../models/Voucher";
import Currency from "../../models/Currency";
import { CurrencyService } from "../../services/CurrencyService";
import Alert from "../Alert/Alert";
import RecurrentVoucher from "../../models/RecurrentVoucher";
import HomePageItem from "../HomePageItem";
import SearchBets from "../../containers/SearchBets";
import CenteredComponent from "../CenteredComponent";
import RequestedGenerics from "../../containers/RequestedGenerics";
import RequestedVoucherBillings from "../../containers/RequestedVoucherBillings";
import { useQuery } from "react-query";
import { VoucherBillingService } from "../../services/VoucherBillingService";

interface DataProps {
    voucher: Voucher;
    bookmaker:Bookmaker;
    title: string
}

const voucherBillingService:VoucherBillingService = new VoucherBillingService();

export default function VoucherBillingData({voucher,bookmaker,title}: DataProps) {

    const [expanded, setExpanded] = useState(false);
    
    const [errorMessage, setErrorMessage] = useState("");
    
    const owner = !!voucher && !!bookmaker && !!bookmaker.id?voucher.bookmakers?.id === bookmaker.id:false;







    const [queryStr, setQueryStr] = useState("");
    const [listSize, setListSize] = useState(5);
    const [page, setPage] = useState(0);
    const { isLoading, error, data: mostRequested } = useQuery(['getVoucherBillingsByVoucherIdAndQueryAndPageAndSize',voucher?.id,page,listSize,queryStr], 
    () => {return voucherBillingService.getVoucherBillingsByVoucherIdAndQueryAndPageAndSize(voucher?.id,page,listSize,queryStr)});
    
    //const { push } = useRouter();

    const seeMoreHandler = () => {
        setListSize(listSize + 5);
    };

    const search = (text:string) => {
    console.log(text.toUpperCase());
    if (text !== "") {
        setQueryStr(text.toUpperCase());
    }else{
        setQueryStr("");
    }
    };



    
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            {!!owner?
                <><StyledCardContentHeader onClick={handleExpandClick}>
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

                <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                    <p>{errorMessage}</p>
                </Alert>



                {
                    <Collapse in={expanded} timeout="auto" unmountOnExit>                        
                        <BodyCardContent>
                           
                                            
                                            
                            <HomePageItem>
                            <SearchBets

                            queryStr={queryStr}
                            search={search}
                            />
                            </HomePageItem>

                            <HomePageItem
                            //title="Matches"
                            showSeeMore
                            seeMoreHandler={seeMoreHandler}
                            >
                            {isLoading ? <CenteredComponent>
                                <CircularProgress />
                            </CenteredComponent> : 
                            <Column>
                                <RequestedVoucherBillings requested={mostRequested} size={listSize} page={page} queryStr={queryStr} />
                                
                            </Column>}
                            </HomePageItem>
                        </BodyCardContent>
                    </Collapse> 
                }</>:<></>}
            

                <BodyCardContent>
                
                    <Column>
                    </Column>
                    <DescriptionLine >
                    </DescriptionLine>
                
                </BodyCardContent>
        </StyledCard>
    );
}
