import {Accordion, AccordionSummary, Button, Card, CircularProgress, Collapse, Skeleton, Typography} from "@mui/material";
import Bet from "../../models/Bet";
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
} from "./FullVoucherCard.styles";
import { Column, Row } from "../../styles/shared-styles";
import { Generic } from "../../models/Generic";
import { MatchService } from "../../services/MatchService";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import Option from "../../models/Option";
import Voucher from "../../models/Voucher";
import RescueCoinButton from "../buttons/RescueCoinButton";
import { VoucherService } from "../../services/VoucherService";
import CenteredComponent from "../CenteredComponent";
import { NumberFormatValues, NumericFormat } from "react-number-format";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TextField from "@mui/material/TextField";
import Currency from "../../models/Currency";

interface VoucherCardProps {
    voucher: Voucher;
    key: number;
    setErrorMessage?: Function
}

const voucherService = new VoucherService();



const Edit = ({children, voucher, setAmount, amount, onClickHandler, ...style}: {children:any, voucher:Voucher, setAmount: Function, amount?: number, onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {

    // const changeAmountHandler = (_e: React.ChangeEvent<HTMLInputElement> ) => {
    //     setAmount(_e.target.value);
    // };
    
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
                    prefix={voucher.currencies?.acronym+"$"}
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
    voucher: Voucher;
    //availableAmount: number;
    setStatus: Function;
    setErrorMessage?:Function
}

interface createProps {
    children: any;
    voucher: Voucher;
    setStatus: Function;
    setErrorMessage?:Function
}

//cancela um saldo específico e recupera os valores
export function CancelVoucher({children,voucher,setStatus,setErrorMessage}: cancelProps) {

    //const [amount, setAmount] = useState<number|undefined>(undefined);

    const cancelar = () => {
                
        voucherService.cancelVoucher(voucher.hash).then((canceled)=>{
            console.log(canceled);
            setStatus(canceled);
        }).catch((erro)=>{
            if(!!setErrorMessage){
                setErrorMessage(erro.message)
            }
        })
        
    
    };
  
    return (
        <StyledCard>
            <BodyCardContent2>
                
                <Column>
                    <Button variant="contained" onClick={cancelar}  >
                        <strong>Cancelar vale e resgatar cupons restantes</strong>
                    </Button>
                </Column>
            </BodyCardContent2>
        </StyledCard>
    );
}

function CreateMoreVoucher({children,voucher,setStatus,setErrorMessage}: createProps) {

    const [amount, setAmount] = useState<number|undefined>(undefined);

    const createMore = () => {
                
        if(!!amount){
            //aloca mais dinheiro para o voucher
            voucherService.assignMoreCoin(voucher.id,amount).then((status)=>{
                console.log(status);
                setStatus(status);
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
                    <Edit
                        amount={amount}
                        voucher={voucher}
                        setAmount={setAmount}
                        onClickHandler={createMore}
                        style={{
                            marginBottom: '5px',
                        }}>
                            {/* <strong>Separar mais cupons para o vale</strong> */}
                            {children}
                        </Edit>
                </Column>

            </BodyCardContent2>
        </StyledCard>
    );
}


const ImpruveVoucher = ({voucher, isOwner, setErrorMessage, ...style}: { voucher:Voucher; isOwner?:number, setErrorMessage?: Function, style?: {} }) => {

    let count = 0;
    let end = false;

    const [status, setStatus] = useState<number | undefined>(undefined);
    
    // const { isLoading, error: betError, data: currency } = 
    // useQuery(['getCurrencyById',voucher.currencies?.id], () => {return currencyService.getCurrencyById(currencyId)});

    //const loading = !!!currency;

    // const onEditHandler = (amount: number) => {
    //     setCreateAmount(amount);
    // };

    // const onCancelHandler = () => {
    //     //cancelar, resgatar valores restantes e atualizar status e interface
    // }

    return (
        <DescriptionLine {...style}>
            <Column>         
                {!!isOwner?
                    <CreateMoreVoucher 
                    setErrorMessage={setErrorMessage}
                    voucher={voucher}  
                    setStatus={setStatus}>
                    {/* <strong>Criar mais vales</strong> */}
                    <strong>Separar mais cupons para o vale</strong>
                    </CreateMoreVoucher>
                :
                    <></>
                }
                
            </Column>
            <Column>         
                    <CancelVoucher 
                    setErrorMessage={setErrorMessage}
                    voucher={voucher}  
                    //availableAmount={availableAmount}
                    setStatus={setStatus}>
                    <strong>Cancelar vales restantes</strong>
                    </CancelVoucher>
                
            </Column>

        </DescriptionLine>
    );
}

const VoucherDetails = ({date, acronym, totalAmount, availableAmount, ...style}: 
    { date: string, acronym?:string, totalAmount?:number, availableAmount?:number, style?: {} }) => {

    

    return (

        

        <DescriptionLine {...style}>
            <Typography>
                <ul>
                  <li>Total destinado a este Vale: <strong>{!!acronym?acronym:"-"}$ {!!totalAmount?totalAmount:"-"}</strong> </li>
                  {/* <li>Total disponível: <strong>{!!acronym?acronym:"-"}$ {!!(totalAmount-availableAmount)?(totalAmount-availableAmount):"-"}</strong> </li> */}
                  <li>Total já distribuído: <strong>{!!acronym?acronym:"-"}$ {!!availableAmount?availableAmount:"-"}</strong> </li>
                </ul>
            </Typography>
        </DescriptionLine>
    );
}

export function FullVoucherCard({voucher,setErrorMessage}: VoucherCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, hid, description, hash, logo, photo, createdAt, expiredAt, status, vouchersType, 
        score, amountPerUser, bookmakers, currencies } = voucher;

    const { isLoading: isLoadingTotalAmount, error: totalAmountError, data: totalAmount } = 
    useQuery(['getTotalAmountById',id], () => {return voucherService.getTotalAmountById(id);});
    
    const { isLoading: isLoadingAvailableAmount, error: availableAmountError, data: availableAmount } = 
    useQuery(['getTotalAmountAvailableById',id], () => {return voucherService.getTotalAmountAvailableById(id);});


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
                    
                    <StyledAvatar photoUrl={logo} size={35} name={!!hid?hid[0]:"V"} />
                    <Column>
                        <Typography variant="body2">
                            Vale {currencies?.acronym} - <strong>{hid}</strong> 
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
                <VoucherDetails
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                acronym={currencies?.acronym}
                                totalAmount={totalAmount}
                                availableAmount={availableAmount}
                                date={convertdateAndTime(createAtVar,expiredAt)}
                                //amountPerUser={amountPerUser}
                                //status={status}
                                // totalAmount={totalAmount}
                                
                                />
                <ImpruveVoucher //cancelar ou criar mais
                    style={{
                        marginBottom: '5px'
                    }}
                    isOwner={currencies?.isOwner}
                    setErrorMessage={setErrorMessage}
                    voucher={voucher}/>
                        <StyledTypographyData paragraph={true}>
                            <strong>Detalhes:</strong><br/>
                            {description}
                        </StyledTypographyData>
                        <StyledTypographyData paragraph={true}>
                            <strong>Status:</strong><br/>
                            {status}
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
                        {!!(currencies?.isOwner)?  
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
