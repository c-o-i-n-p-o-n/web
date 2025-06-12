import {Accordion, AccordionSummary, Button, Card, CircularProgress, Collapse, Skeleton, Typography} from "@mui/material";
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
import { AmountAndCheckRescue, ExpendAmount } from "./AmountAndCheckRescue";
import { CurrencyService } from "../../services/CurrencyService";
import CenteredComponent from "../CenteredComponent";
import { VoucherService } from "../../services/VoucherService";


interface CurrencyCardProps {
    currency: Currency;
    key: number;
    setErrorMessage?: Function
}

const currencyService = new CurrencyService();


const RescueCurrency = ({isOwner, currencyId, validAmount, expiredAmount, setErrorMessage, ...style}: { isOwner?:number, currencyId:number, validAmount?: number, expiredAmount?: number, setErrorMessage?: Function, style?: {} }) => {

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
                    <strong>Receber cupom de volta</strong>
                    </AmountAndCheckRescue>
                    // <RescueCoinButton 
                    // currencyId={currencyId}
                    // // href={`/currency-receive?hash=${id}`}
                    // >
                    // {"Receber"}
                    // </RescueCoinButton>
                :
                    <></>
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

const UseCurrency = ({isOwner, currencyId, validAmount, expiredAmount, setErrorMessage, ...style}: { isOwner?:number, currencyId:number, validAmount?: number, expiredAmount?: number, setErrorMessage?: Function, style?: {} }) => {

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
                {!!!isOwner?
                    <ExpendAmount 
                    setErrorMessage={setErrorMessage}
                    currency={currency}  
                    onEditHandler={onEditHandler}>
                    {"Usar"}
                    </ExpendAmount>
                    // <RescueCoinButton 
                    // currencyId={currencyId}
                    // // href={`/currency-receive?hash=${id}`}
                    // >
                    // {"Receber"}
                    // </RescueCoinButton>
                :
                    <></>
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



const Coinpom = ({date, acronym, validAmount,expiredAmount, ...style}: { date: string, acronym:string, validAmount?: number, expiredAmount?: number,  style?: {} }) => {

    return (

        

        <DescriptionLine {...style}>
            <Typography>
                <ul>
                  <li>Saldo ainda válido: <strong>{acronym}$ {validAmount}</strong> </li>
                  <li>Total vencido (perdido): <strong>{acronym}$ {expiredAmount}</strong> </li>
                </ul>
            </Typography>
        </DescriptionLine>
    );
}

export function FullCurrencyCard({currency,setErrorMessage}: CurrencyCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, acronym, description, logo, photo, createdAt, expiredAt, currenciesType, maxAmount, 
        validAmount, expiredAmount, isOwner } = currency;

        

    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + ((myTime / (1000 * 60 * 60)) > 24?(myTime / (1000 * 60 * 60 * 24)) + " dias": (myTime / (1000 * 60 * 60)) + 
        " horas"):"";
        return result1 + result2
    };
    
    const descriptionHalf = (description:string) => {
        return !!(description)?description.length > 50?description.slice(0, 50)+"...":description:""
    }

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
        <StyledCard>{!id ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> : 

            //   <Accordion key={acronym}>
            <>
{/* 
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  
                  <Typography>{acronym} - {descriptionHalf(description)}: <strong>{validAmount}</strong> </Typography>
                </AccordionSummary> */}
            <StyledCardContentHeader onClick={handleExpandClick}>
                
                    
                <HeaderButton>
                    
                    <StyledAvatar photoUrl={logo} size={35} name={!!acronym?acronym[0]:"C"} />
                    <Column>
                        <Typography variant="body2">
                            {acronym}$ <strong>{validAmount}</strong>
                        </Typography>
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
                        
                        <BodyCardContent>
                <Coinpom
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                acronym={acronym}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                validAmount={validAmount}
                                expiredAmount={expiredAmount}
                                
                                />
                                
                <UseCurrency
                    style={{
                        marginBottom: '5px'
                    }}
                    setErrorMessage={setErrorMessage}
                    isOwner={isOwner}
                    currencyId={id}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/>
                <StyledTypographyData paragraph={true}>
                            <strong>Como usar:</strong><br/>
                            {description}
                        </StyledTypographyData>
                {/* <TitleExpiration
                    style={{
                        marginBottom: '5px'
                    }}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/> */}
            </BodyCardContent> 
            
                        {/* <BodyCardContent>
                            
                            <Coinpom
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                acronym={acronym}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                validAmount={validAmount}
                                expiredAmount={expiredAmount}
                                
                                />
                                                    
                        </BodyCardContent> */}
                    </Collapse> 
            }

             <BodyCardContent>
                        <StyledTypographyData>
                            { convertdateAndTime(createAtVar,expiredAt) }
                        </StyledTypographyData>
                        <StyledTypographyData>
                        </StyledTypographyData>
                {/* <Coinpom
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                acronym={acronym}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                validAmount={validAmount}
                                expiredAmount={expiredAmount}
                                
                                />
                <RescueCurrency
                    style={{
                        marginBottom: '5px'
                    }}
                    setErrorMessage={setErrorMessage}
                    isOwner={isOwner}
                    currencyId={id}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/> */}
            </BodyCardContent> 
            
              {/* </Accordion> */}
              </>}
        </StyledCard>
    );
}




export function FullOwnCurrencyCard({currency,setErrorMessage}: CurrencyCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, acronym, description, logo, photo, createdAt, expiredAt, currenciesType, maxAmount, validAmount, expiredAmount, isOwner } = currency;

    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + ((myTime / (1000 * 60 * 60)) > 24?(myTime / (1000 * 60 * 60 * 24)) + " dias": (myTime / (1000 * 60 * 60)) + 
        " horas"):"";
        return result1 + result2
    };
    
    const descriptionHalf = (description:string) => {
        return !!(description)?description.length > 50?description.slice(0, 50)+"...":description:""
    }

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
        <StyledCard>{!id ? <CenteredComponent>
            <CircularProgress />
          </CenteredComponent> : 

            //   <Accordion key={acronym}>
            <>
{/* 
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  
                  <Typography>{acronym} - {descriptionHalf(description)}: <strong>{validAmount}</strong> </Typography>
                </AccordionSummary> */}
            <StyledCardContentHeader onClick={handleExpandClick}>
                
                    
                <HeaderButton>
                    
                    <StyledAvatar photoUrl={logo} size={35} name={!!acronym?acronym[0]:"C"} />
                    <Column>
                        <Typography variant="body2">
                            {acronym}$ <strong>{validAmount}</strong>
                        </Typography>
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
                        
                        <BodyCardContent>
                <Coinpom
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                acronym={acronym}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                validAmount={validAmount}
                                expiredAmount={expiredAmount}
                                
                                />
                <RescueCurrency
                    style={{
                        marginBottom: '5px'
                    }}
                    setErrorMessage={setErrorMessage}
                    isOwner={isOwner}
                    currencyId={id}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/>
                <StyledTypographyData paragraph={true}>
                            <strong>Como usar:</strong><br/>
                            {description}
                        </StyledTypographyData>
                {/* <TitleExpiration
                    style={{
                        marginBottom: '5px'
                    }}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/> */}
            </BodyCardContent> 
            
                        {/* <BodyCardContent>
                            
                            <Coinpom
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                acronym={acronym}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                validAmount={validAmount}
                                expiredAmount={expiredAmount}
                                
                                />
                                                    
                        </BodyCardContent> */}
                    </Collapse> 
            }

             <BodyCardContent>
                        <StyledTypographyData>
                            { convertdateAndTime(createAtVar,expiredAt) }
                        </StyledTypographyData>
                        <StyledTypographyData>
                        {!!(currency.isOwner)?  
                        <Button variant="contained" onClick={() => {}}  >
                            Emitir mais
                        </Button>
                        :
                        <></>
                        }         
                        </StyledTypographyData>
                {/* <Coinpom
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                acronym={acronym}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                validAmount={validAmount}
                                expiredAmount={expiredAmount}
                                
                                />
                <RescueCurrency
                    style={{
                        marginBottom: '5px'
                    }}
                    setErrorMessage={setErrorMessage}
                    isOwner={isOwner}
                    currencyId={id}
                    validAmount={validAmount}
                    expiredAmount={expiredAmount}/> */}
            </BodyCardContent> 
            
              {/* </Accordion> */}
              </>}
        </StyledCard>
    );
}
