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
} from "./Currency.styles";
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

interface Data {
    expiredAt?:number,
    amountPerUser?:number
}

// const Data = ({owner, data, ...style}: { owner: boolean, data: Generic, style?: {} }) => {


//     if(!!owner){
//         return (
//             <DescriptionLine>
//                 <Column>
//                     <StyledFields>
//                         <InputLabel id="amountPerUser-simple-select-label">Cada vale dá direito a quantos cupons?</InputLabel>
//                         <Select
//                             labelId="amountPerUser-simple-select-label"
//                             id="amountPerUser-simple-select"
//                             //value={data.amountPerUser}
//                             defaultValue={data.amountPerUser}
//                             label="amountPerUser"
//                             onChange={changeAmountPerUserHandler}
//                         >
//                             <MenuItem value={1}>1 cupom por usuário</MenuItem>
//                             <MenuItem value={2}>2 cupons por usuário</MenuItem>
//                             <MenuItem value={5}>5 cupons por usuário</MenuItem>
//                             <MenuItem value={10}>10 cupons por usuário</MenuItem>
//                             <MenuItem value={20}>20 cupons por usuário</MenuItem>
//                             <MenuItem value={50}>50 cupons por usuário</MenuItem>
//                             <MenuItem value={100}>100 cupons por usuário</MenuItem>
//                         </Select>
//                     </StyledFields> 
//                     <StyledFields>
//                         <InputLabel id="expiredAt-simple-select-label">Prazo de validade</InputLabel>
//                         <Select
//                             labelId="expiredAt-simple-select-label"
//                             id="expiredAt-simple-select"
//                             //value={data.expiredAt}
//                             defaultValue={data.expiredAt}
//                             label="expiredAt"
//                             onChange={changeExpiredAtHandler}
//                         >
//                             <MenuItem value={1800000}>30 minutos</MenuItem>
//                             <MenuItem value={3600000}>1 hora</MenuItem>
//                             <MenuItem value={86400000}>1 dia</MenuItem>
//                             <MenuItem value={432000000}>5 dias</MenuItem>
//                             <MenuItem value={864000000}>10 dias</MenuItem>
//                             <MenuItem value={2592000000}>30 dias</MenuItem>
//                             <MenuItem value={5184000000}>60 dias</MenuItem>
//                             <MenuItem value={7776000000}>90 dias</MenuItem>
//                             <MenuItem value={23328000000}>1 ano</MenuItem>
//                         </Select>
//                     </StyledFields> 
                    
//                 </Column>
//                     <Column>
//                         <StyledButton onClick={onClickHandler}>
//                             <SaveIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SaveIcon>
//                         </StyledButton> 
//                     </Column>
//             </DescriptionLine>
//         );
//     }else{
//         return (<></>);
//     }
    
// }

interface DataProps {
    currency?: Currency;
    bookmaker?:Bookmaker;
    title: string;
    //onEditHandler:Function
}

const currencyService = new CurrencyService();
const genericService = new GenericService();

export default function CurrencyData({currency,bookmaker,title}: DataProps) {

    const [expanded, setExpanded] = useState(false);
    const [listSize, setListSize] = useState(5);
    const [page, setPage] = useState(0);

    
    const { isLoading, error, data: mostRequested } = useQuery(['getGenericByCurrencyIdPageAndSize',page,listSize,currency], 
    () => {return genericService.getGenericByCurrencyPageAndSize(page,listSize,currency)});

    //const [recurrentVouchers, setRecurrentVouchers] = useState<RecurrentVoucher[] | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState("");
    const [nonDistributed, setNonDistributed] = useState<number | undefined>(undefined);
    
    const owner = !!(currency?.isOwner) || false;
    
    
    useEffect(() => {
        let active = true;
        console.log(currency);

        if(!!currency && !!(currency.id)){

            currencyService.getNonDistributedCurrencyByIdCurrencyId(currency.id)//tem que ser owner
                      .then((_res: number) => {
                        setNonDistributed(_res)
                      })
                      .catch((err: ServerError) => {
                        console.log("Erro interno");
                        //setErrorMessage("Não há vale cupons ativos")
                      });

        }
        

        return () => {
            active = false;
        };
    });//, [currency]);

    // useEffect(() => {
    //     let active = true;
    //     console.log(currency);

    //     if(!!currency){

    //         voucherService.getVouchersByCurrencyId(currency.id)
    //                   .then((_res: Voucher[]) => {
    //                     setVouchers(_res)
    //                   })
    //                   .catch((err: ServerError) => {
    //                     console.log("Erro interno");
    //                     //setErrorMessage("Não há vale cupons ativos")
    //                   });

    //     }
        

    //     return () => {
    //         active = false;
    //     };
    // });//, [currency]);

    
    // useEffect(() => {
    //     let active = true;
    //     console.log(currency);

    //     if(!!currency){

    //         recurrentVoucherService.getRecurrentVouchersByCurrencyId(currency.id)
    //                   .then((_res: Voucher[]) => {
    //                     setRecurrentVouchers(_res)
    //                   })
    //                   .catch((err: ServerError) => {
    //                     console.log("Erro interno");
    //                     //setErrorMessage("Não há vale cupons ativos")
    //                   });

    //     }
        

    //     return () => {
    //         active = false;
    //     };
    // });//, [currency]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            {!!(currency?.isOwner)?
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
                            {/* <Data
                                owner={owner}
                                data={mostRequested}
                                style={{
                                    marginBottom: '5px'
                                }}/> */}

                            
                            <RequestedGenerics requestedGenerics={mostRequested} size={listSize} page={page} queryStr={undefined} />
                        </BodyCardContent>
                    </Collapse> 
                }</>:
                
                
                <>
                
                            <StyledCardContentHeader>
                            <Column>
                                <StyledTypographyTitle variant="body2">
                                    {title}
                                </StyledTypographyTitle>
                            </Column>
                            </StyledCardContentHeader>
                
                
                
                
                </>}
            

                <BodyCardContent>
                
                    <Column>
                        <Description>
                            <StyledTypographyTitle variant="body2">
                                {"Cupom: " + currency?.acronym}
                            </StyledTypographyTitle> 
                        </Description> 
                    </Column>
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {"Status: " + ((currency?.status == 1)?"Ativo":(currency?.status == 0)?"Cancelado":"Encerrado")}
                        </StyledTypographyTitle> 
                    </Column>
                    {/* <Column>
                        <StyledTypographyTitle variant="body2">
                            {"Vale: " + currency?.amountPerUser + " tokens"}
                        </StyledTypographyTitle> 
                    </Column> */}
                    <DescriptionLine >
                        <Description>
                            <StyledTypographyTitle variant="body2">
                                {currency?.createdAt?"Criado em: " + format(currency?.createdAt, " dd/MM/yyyy', às' H:mm"):"" }
                            </StyledTypographyTitle> 
                            <StyledTypographyTitle variant="body2">
                                {"Total de cupons ativos: " + `${currency?.acronym} ${currency?.validAmount}`}
                            </StyledTypographyTitle> 
                            <StyledTypographyTitle variant="body2">
                                {"Total de cupons vencidos: " + `${currency?.acronym} ${currency?.expiredAmount}`}
                            </StyledTypographyTitle> 
                            {(!!!(currency?.isOwner)?<></>:                                
                            <StyledTypographyTitle variant="body2">
                                {"Total de cupons não distribuídos: " + `${currency?.acronym} ${nonDistributed}`}
                            </StyledTypographyTitle> 
                            )}
                        </Description> 
                    </DescriptionLine>
                
                </BodyCardContent>
        </StyledCard>
    );
}
