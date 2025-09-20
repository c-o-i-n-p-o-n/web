import {Collapse, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
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
} from "./RecurrentVoucher.styles";
import { Column, Row } from "../../styles/shared-styles";
import Bookmaker from "../../models/Bookmaker";
import Voucher from "../../models/Voucher";
import Currency from "../../models/Currency";
import { CurrencyService } from "../../services/CurrencyService";
import Alert from "../Alert/Alert";
import RecurrentVoucher from "../../models/RecurrentVoucher";

interface Data {
    expiredAt?:number,
    amountPerUser?:number
}

const Edit = ({owner, data, setData, onClickHandler, ...style}: { owner: boolean, data: Data, setData: Function, onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {

    const changeAmountPerUserHandler = (_e: SelectChangeEvent<number>, child: ReactNode ) => {
        setData({...data,amountPerUser:_e.target.value});
    };
    const changeExpiredAtHandler = (_e: SelectChangeEvent<number>, child: ReactNode ) => {
        setData({...data,expiredAt:_e.target.value});
    };

    if(!!owner){
        return (
            <DescriptionLine>
                <Column>
                    <StyledFields>
                        <InputLabel id="amountPerUser-simple-select-label" style={{color: "Highlight"}}>Cada vale dá direito a quantos cupons?</InputLabel>
                        <Select
                            labelId="amountPerUser-simple-select-label"
                            id="amountPerUser-simple-select"
                            //value={data.amountPerUser}
                            variant="standard"
                            defaultValue={data.amountPerUser}
                            label="amountPerUser"
                            onChange={changeAmountPerUserHandler}
                        >
                            <MenuItem value={1}>1 cupom por usuário</MenuItem>
                            <MenuItem value={2}>2 cupons por usuário</MenuItem>
                            <MenuItem value={5}>5 cupons por usuário</MenuItem>
                            <MenuItem value={10}>10 cupons por usuário</MenuItem>
                            <MenuItem value={20}>20 cupons por usuário</MenuItem>
                            <MenuItem value={50}>50 cupons por usuário</MenuItem>
                            <MenuItem value={100}>100 cupons por usuário</MenuItem>
                        </Select>
                    </StyledFields> 
                    <StyledFields>
                        <InputLabel id="expiredAt-simple-select-label" style={{color: "Highlight"}}>Prazo de validade</InputLabel>
                        <Select
                            labelId="expiredAt-simple-select-label"
                            id="expiredAt-simple-select"
                            variant="standard"
                            //value={data.expiredAt}
                            defaultValue={data.expiredAt}
                            label="expiredAt"
                            onChange={changeExpiredAtHandler}
                        >
                            <MenuItem value={1800000}>30 minutos</MenuItem>
                            <MenuItem value={3600000}>1 hora</MenuItem>
                            <MenuItem value={86400000}>1 dia</MenuItem>
                            <MenuItem value={432000000}>5 dias</MenuItem>
                            <MenuItem value={864000000}>10 dias</MenuItem>
                            <MenuItem value={2592000000}>30 dias</MenuItem>
                            <MenuItem value={5184000000}>60 dias</MenuItem>
                            <MenuItem value={7776000000}>90 dias</MenuItem>
                            <MenuItem value={23328000000}>1 ano</MenuItem>
                        </Select>
                    </StyledFields> 
                    
                </Column>
                    <Column>
                        <StyledButton onClick={onClickHandler}>
                            <SaveIcon style={{backgroundColor: "Highlight", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SaveIcon>
                        </StyledButton> 
                    </Column>
            </DescriptionLine>
        );
    }else{
        return (<></>);
    }
    
}

interface DataProps {
    recurrentVoucher?: RecurrentVoucher;
    bookmaker?:Bookmaker;
    title: string;
    onEditHandler:Function
}

const currencyService = new CurrencyService();

export default function RecurrentVoucherData({recurrentVoucher,bookmaker,title,onEditHandler}: DataProps) {

    const [expanded, setExpanded] = useState(false);
    //const [currency, setCurrency] = useState<Currency | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState({
        expiredAt:recurrentVoucher?.expiredAt,
        amountPerDue:recurrentVoucher?.amountPerDue
    });
    
    const owner = !!(recurrentVoucher?.isOwner);//!!voucher && !!bookmaker && !!bookmaker.id?voucher.bookmakers?.id === bookmaker.id:false;
    
    // useEffect(() => {
    //     let active = true;
    //     console.log(recurrentVoucher);

    //     if(!!recurrentVoucher){
    //         const fetchMatch = async () => {
    //             //setCurrency(await currencyService.getCurrencyByVoucherId(voucher.id));
    //             setCurrency(recurrentVoucher.currencies)
    //             console.log(currency);
    //         }
    
    //         fetchMatch().catch(()=>{
    //             console.log(currency?.id);
    //         });
    //     }
        

    //     return () => {
    //         active = false;
    //     };
    // }, [recurrentVoucher]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const editDataHandler = () => {
        if(!data){
            return
        }
        
        const fetchUrl = async () => {
            onEditHandler(recurrentVoucher,{amountPerDue:data.amountPerDue,expiredAt:data.expiredAt},"Dados atualizados!");
        }

        fetchUrl().catch(console.log);
                 
    };

    return (
        <StyledCard>
            {!!owner?
                <><StyledCardContentHeader onClick={handleExpandClick}>
                    <HeaderButton>
                        <Column>
                            <StyledTypographyTitle variant="body2" style={{color: "white"}}>
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
                            <Edit
                                owner={owner}
                                data={data}
                                setData={setData}
                                onClickHandler={editDataHandler}
                                style={{
                                    marginBottom: '5px'
                                }}/>
                        </BodyCardContent>
                    </Collapse> 
                }</>:<></>}
            

                <BodyCardContent>
                
                    <Column>
                        <Description>
                            <StyledTypographyTitle variant="body2" >
                                {"Token: " + recurrentVoucher?.currencies?.acronym}
                            </StyledTypographyTitle> 
                        </Description> 
                    </Column>
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {"Status: " + ((recurrentVoucher?.status == 1)?"Ativo":(recurrentVoucher?.status == 2)?"Cancelado":"Encerrado")}
                        </StyledTypographyTitle> 
                    </Column>
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {"Vale: " + recurrentVoucher?.amountPerDue + " tokens a cada vencimento"}
                        </StyledTypographyTitle> 
                    </Column>
                    <DescriptionLine >
                        <Description>
                            <StyledTypographyTitle variant="body2">
                                {recurrentVoucher?.createdAt?"Criado em: " + format(recurrentVoucher?.createdAt, " dd/MM/yyyy', às' H:mm"):"" }
                            </StyledTypographyTitle> 
                            <StyledTypographyTitle variant="body2">
                                {"Expira em: " + (recurrentVoucher?.expiredAt || 0) / (24*3600*1000) + " dias " + ((recurrentVoucher?.expiredAt || 0) / (24*3600*1000)<1?"e " + (recurrentVoucher?.expiredAt || 0) / (3600*1000) + " horas":"")}
                            </StyledTypographyTitle> 
                        </Description> 
                    </DescriptionLine>
                
                </BodyCardContent>
        </StyledCard>
    );
}
