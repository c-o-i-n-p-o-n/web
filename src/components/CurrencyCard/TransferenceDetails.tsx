import {CircularProgress, Collapse, Skeleton, Typography} from "@mui/material";
import Bet from "../../models/Bet";
import React, {useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';

import {
    BodyCardContent,
    Description,
    DescriptionLine,
    EventTimeAndExpandMore,
    ExpandMore,
    HeaderButton,
    Odd,
    StyledCard,
    StyledCardContentHeader,
    StyledTypography,
    StyledTypographyTitle,
    StyledTypographyData,
    TypeButton,
    StyledButton
} from "./FullCurrencyCard.styles";
import { Column, Row } from "../../styles/shared-styles";
import { Generic } from "../../models/Generic";
import { MatchService } from "../../services/MatchService";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import Option from "../../models/Option";
import Currency from "../../models/Currency";
import RescueCoinButton from "../buttons/RescueCoinButton";
//import AmountAndCheckRescue from "./AmountAndCheckRescue";
import { CurrencyService } from "../../services/CurrencyService";
import CenteredComponent from "../CenteredComponent";
import Transference from "../../models/Transference";
import RefreshIcon from "@mui/icons-material/Refresh";


interface CurrencyCardProps {
    transference: Transference;
    key: number;
    chekPayment: Function;
}

const currencyService = new CurrencyService();

const CheckPaymentCompoment = ({hash, chekPayment, ...style}: { hash:string, chekPayment:Function, style?: {} }) => {

    let count = 0;
    let end = false;

    
    const irParaProximaPagina = () => {
        chekPayment();
    };

    return (
        
                      <CenteredComponent>
        <DescriptionLine {...style}>
            <Column>
            
                        <Typography variant="body2">
                            Verificar
                            
                        </Typography>
                <StyledButton onClick={irParaProximaPagina}>
                    <RefreshIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}>
                        Verificar
                    </RefreshIcon>
                </StyledButton> 

            </Column>

        </DescriptionLine></CenteredComponent>
    );
}



const Coinpom = ({description, ...style}: { description: string, style?: {} }) => {

    return (
        <DescriptionLine {...style}>
            <Description>
                <Typography paragraph={true}>
                    <strong>Como usar:</strong><br/>
                    {description?.slice(0, 300)}
                </Typography>
            </Description> 
        </DescriptionLine>
    );
}

export default function TransferneceDetails({transference,key,chekPayment}: CurrencyCardProps) {

    const [expanded, setExpanded] = useState(false);

    console.log(transference)

    //const {id, acronym, description, logo, photo, createdAt, expiredAt, type, maxAmount, validAmount, expiredAmount, isOwner } = transference.currency;

    // const convertdateAndTime = (myDate?:Date, myTime?:number) => {
    //     let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
    //     let result2 = !!myTime ? "Duração: " + (myTime / (1000 * 60 * 60)) + " horas": "";
    //     return result1 + result2
    // };
    

    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + ((myTime / (1000 * 60 * 60)) > 24?(myTime / (1000 * 60 * 60 * 24)) + " dias": (myTime / (1000 * 60 * 60)) + 
        " horas"):"";
        return result1 + result2
    };

    //mostRequested: { createdAt, expiredAt, options }
    //const { isLoading, error, data } = useQuery(['getMatchById',id], () => {return betService.getMatchById(id);});
    //console.log(data)

    var createAtVar:Date | undefined = transference?.currencies?.createdAt ;

    if(typeof createAtVar == 'string'){
        createAtVar = new Date(createAtVar)
    }
    
    //console.log(typeof expiredAtVar)
    //if(!!expiredAtVar){
    //    console.log(typeof expiredAtVar)
    //    let expiredAtAux = expiredAt
    //    console.log(expiredAtAux)
    //    if(!!expiredAtAux)
    //        expiredAtVar.setMilliseconds(expiredAtVar.getUTCMilliseconds() - (expiredAtAux))
    //}

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                
                    
                <HeaderButton>
                    
                    <StyledAvatar photoUrl={transference?.currencies?.logo} size={35} name={!!transference?.currencies?.acronym?transference?.currencies?.acronym[0]:"C"} />
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            <strong>{transference?.currencies?.acronym + "$ " + transference?.amount}</strong>
                        </StyledTypographyTitle>
                    </Column>
                    <EventTimeAndExpandMore>
                        {<ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                            <ExpandMoreIcon/>
                        </ExpandMore> }
                    </EventTimeAndExpandMore>
                </HeaderButton>
            </StyledCardContentHeader>

            {
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        {/* <StyledTypographyData paragraph={true}>
                            {transference?.currencies?.description}
                        </StyledTypographyData> */}
                        <BodyCardContent>
                            
                            <Coinpom
                                key={transference?.currencies?.id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                description={transference?.currencies?.description}/>
                                               
                        </BodyCardContent>
                    </Collapse> 
            }

             <BodyCardContent>
                <CheckPaymentCompoment
                    style={{
                        marginBottom: '5px'
                    }}
                    hash={transference.hash}
                    chekPayment={chekPayment}/>
                         
                        <StyledTypographyData>
                            { convertdateAndTime(createAtVar,transference?.currencies?.expiredAt) }
                        </StyledTypographyData>
                {/* <TitleExpiration
                    style={{
                        marginBottom: '5px'
                    }}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/> */}
            </BodyCardContent> 
        </StyledCard>
    );
}
