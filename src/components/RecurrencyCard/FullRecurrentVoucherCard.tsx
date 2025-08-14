import {Accordion, AccordionSummary, Button, Card, CircularProgress, Collapse, Skeleton, Typography} from "@mui/material";
import Bet from "../../models/Bet";
import React, {MouseEventHandler, useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';

import { useRouter } from "next/router";

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
    BodyCardContent2,
    DescriptionLine2,
    StyledButton
} from "./FullRecurrentVoucherCard.styles";
import { Column, Row } from "../../styles/shared-styles";
import { Generic } from "../../models/Generic";
import { MatchService } from "../../services/MatchService";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import Option from "../../models/Option";
import Voucher from "../../models/Voucher";
import RescueCoinButton from "../buttons/RescueCoinButton";
import { RecurrentVoucherService } from "../../services/RecurrentVoucherService";
import CenteredComponent from "../CenteredComponent";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TextField from "@mui/material/TextField";
import Currency from "../../models/Currency";
import RecurrentVoucher from "../../models/RecurrentVoucher";
import Link from "next/link";

interface RecurrentVoucherCardProps {
    recurrentVoucher: RecurrentVoucher;
    key: number;
    setErrorMessage?: Function
}

const recurrentVoucherService = new RecurrentVoucherService();



const Edit = ({children, recurrentVoucher, setAmount, amount, onClickHandler, ...style}: {children:any, recurrentVoucher:RecurrentVoucher, setAmount: Function, amount?: number, onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {
    
    const changeAmountHandler = (values:NumberFormatValues ) => {
        setAmount(values.floatValue);
    };

    return (
        <DescriptionLine2 {...style}>
            
                        <Typography variant="body2">
                            {children}
                            
                        </Typography>
            <Description>
            
                <NumericFormat
                    value={amount}
                    customInput={TextField}
                    label="Valor"
                    variant="outlined"
                    fullWidth
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={recurrentVoucher.currencies?.acronym+"≬"}
                    decimalScale={2}
                    fixedDecimalScale
                    allowNegative={false}
                    onValueChange={changeAmountHandler}
                />
                {/* <TextField
                    value={amount}
                    defaultValue={url}
                    type="text"
                    label="Valor"
                    placeholder={amount+""}
                    variant="standard"
                    onChange={changeAmountHandler}
                    fullWidth
                    slotProps={{
                        input: {
                          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                        },
                      }}
                    /> */}

{/* <Button
          variant="contained"
          color="primary"
          onClick={handleRefresh}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button> */}
            {/* <RescueCoinButton 
                    amount={amount}
                    onClick={onClickHandler}
                    currencyId={currency.id}>
                Verificar cupom
            </RescueCoinButton> */}
                <StyledButton onClick={onClickHandler}>
                    <OpenInNewIcon style={{borderRadius: "20px", fontSize: "35px", padding: "5px", color: "gray"}}>
                        Verificar
                    </OpenInNewIcon>
                </StyledButton> 
            </Description> 
        </DescriptionLine2>
    );

    
}


interface cancelProps {
    children: any;
    recurrentVoucher: RecurrentVoucher;
    setStatus: Function;
    setErrorMessage?:Function
}

//cancela a disponibiliodade desta proposta
export function CancelVoucher({children,recurrentVoucher,setStatus,setErrorMessage}: cancelProps) {

    const cancelar = () => {
                
        if(!!(recurrentVoucher.hash)){
            recurrentVoucherService.cancelRecurrentVoucher(recurrentVoucher.hash).then((canceled)=>{
                console.log(canceled);
                setStatus(canceled);
            }).catch((erro)=>{
                if(!!setErrorMessage){
                    setErrorMessage(erro.message)
                }
            })
        }
        
    };
  
    return (
        <StyledCard>
            <BodyCardContent2>
                
                <Column>
                    <Button color="error" variant="contained" onClick={cancelar}  >
                        {children}
                    </Button>
                </Column>
            </BodyCardContent2>
        </StyledCard>
    );
}

// function CreateMoreVoucher({children,voucher,setStatus,setErrorMessage}: createProps) {

//     const [amount, setAmount] = useState<number|undefined>(undefined);

//     const createMore = () => {
                
//         if(!!amount){
//             //aloca mais dinheiro para o voucher
//             voucherService.assignMoreCoin(voucher.id,amount).then((status)=>{
//                 console.log(status);
//                 setStatus(status);
//             }).catch((erro)=>{
//                 if(!!setErrorMessage){
//                     setErrorMessage(erro.message)
//                 }
//             })
//         }
    
        
//     };
  
//     return (
//         <StyledCard>
//             <BodyCardContent2>
                
//                 <Column>
//                     <Edit
//                         amount={amount}
//                         voucher={voucher}
//                         setAmount={setAmount}
//                         onClickHandler={createMore}
//                         style={{
//                             marginBottom: '5px',
//                         }}>
//                             {/* <strong>Separar mais cupons para o vale</strong> */}
//                             {children}
//                         </Edit>
//                 </Column>

//             </BodyCardContent2>
//         </StyledCard>
//     );
// }


const ImpruveVoucher = ({recurrentVoucher, isOwner, setErrorMessage, ...style}: { recurrentVoucher:RecurrentVoucher; isOwner?:number, setErrorMessage?: Function, style?: {} }) => {

    const [status, setStatus] = useState<number | undefined>(undefined);
    const router = useRouter();

    // const { isLoading, error: betError, data: currency } = 
    // useQuery(['getCurrencyById',voucher.currencies?.id], () => {return currencyService.getCurrencyById(currencyId)});

    //const loading = !!!currency;

    // const onEditHandler = (amount: number) => {
    //     setCreateAmount(amount);
    // };

    // const onCancelHandler = () => {
    //     //cancelar, resgatar valores restantes e atualizar status e interface
    // }

    const handleManaging = () => {
        //router.push('recurrent-voucher-created');
        router.push({ pathname: "recurrent-voucher-created", query: { recurrentVoucherHash: recurrentVoucher.hash }} );
    };

    return (
        <DescriptionLine {...style}>
            <Column>         
                
                <Button variant="contained" onClick={handleManaging}  >
                    Gerenciar
                </Button>
                
            </Column>
            <Column>         
                    <CancelVoucher 
                    setErrorMessage={setErrorMessage}
                    recurrentVoucher={recurrentVoucher}  
                    setStatus={setStatus}>
                    <strong>Cancelar proposta de assinatura (não cancela contratos já assinados)</strong>
                    </CancelVoucher>
                
            </Column>

        </DescriptionLine>
    );
}

const RecurrentVoucherDetails = ({date, amountPerDue, acronym, cicles, timeUnit, totalSignee, cost, ...style}: 
    { date: string, amountPerDue: number, acronym?:string, cicles?:number, timeUnit?:string, totalSignee?:number, cost?:number, style?: {} }) => {

    return (

        <DescriptionLine {...style}>
            <Typography>
                <ul>
                  <li>Esta assinatura é referente ao cupom: <strong><Link href={"/coin-created/" + acronym} className="hover:underline">{!!acronym?acronym:"-"}</Link></strong> </li>
                  <li>Distribuído entre os assinantes <strong>{!!timeUnit?timeUnit:"a cada ciclo"} {!!amountPerDue?amountPerDue:"alguns"} cupons {!!acronym?acronym:""}</strong> </li>             
                  <li>Total de assinantes: <strong>{!!totalSignee?totalSignee:"-"}</strong> </li>
                  {!!cost&&cost>0?<li>Custo {!!timeUnit?timeUnit:"por ciclo"} da assinatura para cada cliente: <strong>R${cost}</strong> </li>:""}
                </ul>
            </Typography>
        </DescriptionLine>
    );
}

export function FullRecurrentVoucherCard({recurrentVoucher,setErrorMessage}: RecurrentVoucherCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, hid, description, hash, logo, photo, createdAt, expiredAt, status, recurrencesType, 
        score, amountPerDue, cicles, period, timeUnit, bookmakers, currencies } = recurrentVoucher;

    const { isLoading: isLoadingTotalAmountPerDue, error: totalAmountPerDueError, data: totalAmountPerDue } = 
    useQuery(['getTotalAmountPerDueById',id], () => {return recurrentVoucherService.getTotalAmountPerDueById(id);});
    
    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + ((myTime / (1000 * 60 * 60)) > 24?(myTime / (1000 * 60 * 60 * 24)) + " dias": (myTime / (1000 * 60 * 60)) + 
        " horas"):"";
        return result1 + result2
    };
    
    const descriptionHalf = (description:string) => {
        return !!(description)?description.length > 50?description.slice(0, 50)+"...":description:""
    }

    var createAtVar:Date | undefined = createdAt ;

    if(typeof createAtVar == 'string'){
        createAtVar = new Date(createAtVar)
    }

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
                </AccordionSummary> 🎫🔖*/}
            <StyledCardContentHeader onClick={handleExpandClick}>
                
                    
                <HeaderButton>
                    
                    <StyledAvatar photoUrl={logo} size={35} name={!!hid?hid[0]:"V"} />
                    <Column>
                        <Typography variant="body2">
                            Vale {currencies?.acronym}≬ <strong>{amountPerDue}</strong> {timeUnit?timeUnit:"recorrentemente"} 
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
                <RecurrentVoucherDetails
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                amountPerDue={amountPerDue}
                                acronym={currencies?.acronym}
                                cicles={cicles}
                                timeUnit={timeUnit}
                                totalSignee={totalAmountPerDue}
                                cost={0}
                                
                                />
                <ImpruveVoucher //cancelar ou gerenciar
                    style={{
                        marginBottom: '5px'
                    }}
                    isOwner={currencies?.isOwner}
                    setErrorMessage={setErrorMessage}
                    recurrentVoucher={recurrentVoucher}/>
                        <StyledTypographyData paragraph={true}>
                            <strong>Detalhes:</strong><br/>
                            {description}
                        </StyledTypographyData>
                        <StyledTypographyData paragraph={true}>
                            <strong>Status:</strong><br/>
                            {status}
                        </StyledTypographyData>
               
            </BodyCardContent> 
            
                    </Collapse> 
            }

             <BodyCardContent>
                        <StyledTypographyData>
                            { convertdateAndTime(createAtVar,expiredAt) }
                        </StyledTypographyData>
                        <StyledTypographyData>
                        {!!(currencies?.isOwner)?  
                        <Button variant="contained" onClick={() => {}}  >
                            Emitir mais
                        </Button>
                        :
                        <></>
                        }         
                        </StyledTypographyData>
              
            </BodyCardContent> 
            
              </>}
        </StyledCard>
    );
}
