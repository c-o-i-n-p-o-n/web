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
    TypeButton
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
import AmountAndCheckRescue from "./AmountAndCheckRescue";
import { CurrencyService } from "../../services/CurrencyService";
import CenteredComponent from "../CenteredComponent";


interface CurrencyCardProps {
    currency: Currency;
    key: number;
    setErrorMessage?: Function
}

const currencyService = new CurrencyService();

const RescueCurrency = ({isOwner, currencyId, validAmount, expiredAmount, setErrorMessage, ...style}: { isOwner?:boolean, currencyId:number, validAmount?: number, expiredAmount?: number, setErrorMessage?: Function, style?: {} }) => {

    let count = 0;
    let end = false;

    //const [currency, setCurrency] = useState<Currency | undefined>(undefined);
    const [amount, setAmount] = useState<number | undefined>(undefined);

    
    //const loading = !!!currency;

    
    const { isLoading, error: betError, data: currency } = 
    useQuery(['getCurrencyById',currencyId], () => {return currencyService.getCurrencyById(currencyId)});

    const loading = !!!currency;

    // useEffect(() => {
    //     let active = true;
    //     if (!loading) {
    //         return undefined;
    //     }
    //     const fetchCurrency = async () => {
    //         setCurrency(await currencyService.getCurrencyById(currencyId));
    //         console.log(currency);
    //     }
    
    //     fetchCurrency().catch(()=>{
    //         //push('create-match');
    //         console.log(currencyId);
    //     });
    
    //     return () => {
    //         active = false;
    //     };
    // }, [loading,currencyId]);

    const onEditHandler = (amount: number) => {
        setAmount(amount);
    };


    return (<>
        {isLoading || loading ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> :
        <DescriptionLine {...style}>
            <Column>
                {!!isOwner?
                    <AmountAndCheckRescue 
                    setErrorMessage={setErrorMessage}
                    currency={currency}  
                    onEditHandler={onEditHandler}>
                    {"Receber"}
                    </AmountAndCheckRescue>
                    // <RescueCoinButton 
                    // currencyId={currencyId}
                    // // href={`/currency-receive?hash=${id}`}
                    // >
                    // {"Receber"}
                    // </RescueCoinButton>
                :
                    <AmountAndCheckRescue 
                    setErrorMessage={setErrorMessage}
                    currency={currency} 
                    onEditHandler={onEditHandler} >
                    {"Resgatar"}
                    </AmountAndCheckRescue>
                    // <RescueCoinButton 
                    // currencyId={currencyId}
                    // // href={`/transference-rescue?hash=${id}`}
                    // >
                    // {"Resgatar"}
                    // </RescueCoinButton>
                }
                
            </Column>

        </DescriptionLine>}</>
    );
}



const Coinpom = ({description, ...style}: { description: string, style?: {} }) => {

    return (
        <DescriptionLine {...style}>
            <Description>
                <Typography paragraph={true}>
                    {description?.slice(0, 300)}
                </Typography>
            </Description> 
        </DescriptionLine>
    );
}

export default function FullCurrencyCard({currency,setErrorMessage}: CurrencyCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, acronym, description, logo, photo, createdAt, expiredAt, type, maxAmount, validAmount, expiredAmount, isOwner } = currency;

    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + (myTime / (1000 * 60 * 60)) + " horas": "";
        return result1 + result2
    };
    
    

    //mostRequested: { createdAt, expiredAt, options }
    //const { isLoading, error, data } = useQuery(['getMatchById',id], () => {return betService.getMatchById(id);});
    //console.log(data)

    var createAtVar:Date | undefined = createdAt ;

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
                    
                    <StyledAvatar photoUrl={logo} size={35} name={!!acronym?acronym[0]:"C"} />
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {acronym}
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
                        <StyledTypographyData paragraph={true}>
                            {description}
                        </StyledTypographyData>
                        <StyledTypographyData>
                            { convertdateAndTime(createAtVar,expiredAt) }
                        </StyledTypographyData>
                        <BodyCardContent>
                            
                            <Coinpom
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                description={description}/>
                                                    
                        </BodyCardContent>
                    </Collapse> 
            }

             <BodyCardContent>
                <RescueCurrency
                    style={{
                        marginBottom: '5px'
                    }}
                    setErrorMessage={setErrorMessage}
                    isOwner={isOwner}
                    currencyId={id}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/>
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
