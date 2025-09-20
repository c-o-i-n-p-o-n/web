import {Collapse, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField, Typography} from "@mui/material";
import React, {MouseEventHandler, ReactNode, useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { format } from "date-fns";

import * as yup from 'yup';

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
} from "./PaymentWaysJoinned.styles";
import { Column, Row } from "../../styles/shared-styles";
import Bookmaker from "../../models/Bookmaker";
import Currency from "../../models/Currency";
import { CurrencyService } from "../../services/CurrencyService";
import Alert from "../Alert/Alert";
import Voucher from "../../models/Voucher";
import RecurrentVoucher from "../../models/RecurrentVoucher";
import ServerError from "../../models/ServerError";
import { number } from "yup";
import { Generic } from "../../models/Generic";
import RequestedGenerics from "../../containers/RequestedGenerics";
import { useQuery } from "react-query";
import { GenericService } from "../../services/GenericService";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import CustomButton from "../CustomButton";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import PaymentWay, { paymentWayName } from "../../models/PaymentWay";
import { PaymentWayService } from "../../services/PaymentWayService";

const StyledForm = styled(Form)({
    height: "60vh",
    display: "flex",
    color: "white",
    flexDirection: "column",
    justifyContent: "space-between"
})

const validationSchema = yup.object({});

const PaymentWays = ({owner, paymentWays, ...style}: { owner: boolean, paymentWays?: Array<PaymentWay> , style?: {} }) => {

    if(!!owner){
        return (
            <DescriptionLine>
                {
                    !!paymentWays && paymentWays.length > 0 ? <>
                    {paymentWays.map((item, index) => {
                        //console.log(item)
                        return <Column key={item.id}>
                            <PaymentWayButton paymentWay={item}/>
                        </Column>
                        
                    })}
            </> : <div><Typography sx={{color:"white", textAlign: "center", marginTop: "10vh", marginBottom: "10vh"}}>nenhuma resultado disponível</Typography></div>                    
                }
            </DescriptionLine>
        );
    }else{
        return (<></>);
    }
    
}


export const TypeButton = styled("a")({
    //color: "white",
    color: "#060D04",
    //background: '#234A17',
    background: '#75F94D',
    borderRadius: "15px",
    padding: ".5rem",
    margin: "5px"
})



const PaymentWayButton = ({paymentWay}: { paymentWay: PaymentWay , style?: {} }) => {



    return (
    
            <TypeButton href={`/join-payment-way?paymentWayId=${paymentWay?.id}`}>
                {paymentWayName(paymentWay.provider)}<br/>{paymentWay.doIHaveIt?<>&#x2705;</>:<>&nbsp;</>}{paymentWay.isItMain?<>&#x2B50;</>:<>&nbsp;</>}
                <StyledAvatar photoUrl={paymentWay?.logo_url} size={35} name={!!paymentWay?.provider?paymentWay?.provider[0]:"P"} />
            </TypeButton>
       
    );

    
}

interface DataProps {
    bookmakerLocal?: Bookmaker;
    title: string
}

const paymentWayService = new PaymentWayService();

export default function PaymentWaysJoinned({bookmakerLocal,title}: DataProps) {

    const [expanded, setExpanded] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [paymentWaysSize, setPaymentWaysSize] = useState(5);
    const [paymentWaysPage, setPaymentWaysPage] = useState(0);

    const owner = !!(bookmakerLocal?.itIsMe) || false;

    
    const { isLoading, error, data: paymentWays } = useQuery(['getPaymentWays',paymentWaysPage,paymentWaysSize], 
    () => {return paymentWayService.getPaymentWays(paymentWaysPage,paymentWaysSize)});
    
    
    const handleExpandClick = () => {
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

                <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                    <p>{errorMessage}</p>
                </Alert>



                
                    <Collapse in={expanded} timeout="auto" unmountOnExit>                        
                        <BodyCardContent>

                            {!!(bookmakerLocal?.itIsMe)?<PaymentWays
                                owner={owner}
                                paymentWays={paymentWays}
                                style={{
                                    marginBottom: '5px'
                                }}/>
                                
                                
                                :
<>
</>

                            }


                                
                            
                        </BodyCardContent>
                    </Collapse> 
                
                
                
     
            

                <BodyCardContent>
                         
                
                </BodyCardContent>
        </StyledCard>
    );
}
