import {Collapse, Typography} from "@mui/material";
import Bookmaker from "../../models/Bookmaker";
import React, {useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import { Generic } from "../../models/Generic";
import { format } from "date-fns";

import CheckIcon from "@mui/icons-material/Check";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import {
    BodyCardContent,
    CoinAndExpandMore,
    ExpandMore,
    HeaderButton,
    StyledCard,
    StyledCardContentHeader,
    StyledTypographyData,
    StyledTypographyTitle,
    TypeButton,
    TypeButton2, 
} from "./MostRequestedVoucherCard.styles";
import { Margin, Padding, SpaceBetweenRow, Column, Row } from "../../styles/shared-styles";
import { useQuery } from "react-query";
import { VoucherService } from "../../services/VoucherService";
import VoucherBilling from "../../models/VoucherBilling";
import Transference from "../../models/Transference";
import { VoucherBillingService } from "../../services/VoucherBillingService";
import Alert from "../Alert/Alert";
import { Description, DescriptionLine2, StyledButton } from "./FullVoucherCard.styles";
import { TransferenceService } from "../../services/TransferenceService";

interface VoucherBillingCardProps {
    vb: VoucherBilling
}

const voucherBillingService = new VoucherBillingService();
const transferenceService = new TransferenceService();


const ValidVoucherBilling = ({children, voucherBilling, setTransference, setErrorMessage, ...style}: {children:any, voucherBilling:VoucherBilling, setTransference: Function, setErrorMessage: Function, style?: {} }) => {
    
    
    const setTransferenceAux = (hash:string ) => {
        
        if(!!hash){
            transferenceService.getTransferenceByHash(hash).then((transf)=>{
                setTransference(transf)
            }).catch((erro)=>{
                console.log(erro)
                if(!!setErrorMessage){
                    console.log(erro.message)
                    setErrorMessage(erro.message)
                }
            })
        }
    };


    const setTransferenceHandler = (id:number ) => {
        
        if(!!id){
            voucherBillingService.validVoucherBilling(id).then((hash)=>{
                setTransferenceAux(hash);
                //setTransference(transf)
            }).catch((erro)=>{
                console.log(erro)
                if(!!setErrorMessage){
                    console.log(erro.message)
                    setErrorMessage(erro.message)
                }
            })
        }
    };



    function onClickHandler(event: any): void {
        setTransferenceHandler(voucherBilling.id);
    }

    return (
        <DescriptionLine2 {...style}>
            
                        <Typography variant="body2">
                            {children }
                            
                        </Typography>
            <Description>
                 {!!(voucherBilling.transferences)?
                 
                 <CheckIcon style={{borderRadius: "20px", fontSize: "35px", padding: "5px", color: "gray"}}/>
                 :

                <StyledButton onClick={onClickHandler}>
                    <CheckIcon >
                        Validar 
                    </CheckIcon>{/*OpenInNewIcon*/}
                </StyledButton>
                 
                 } 
            </Description> 
        </DescriptionLine2>
    );

    
}

export default function MostRequestedVoucherBillingCard({vb}: VoucherBillingCardProps) {

    const [expanded, setExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [transference, setTransference] = useState<Transference | undefined>(undefined);

    const [voucherBilling, setVoucherBilling] = useState<VoucherBilling>(vb);
    const {id, bookmakers} = voucherBilling;


    useEffect(() => {
        let active = true;
        console.log(transference);

        if(!!id){
            voucherBillingService.getVoucherBillingById(id).then((vb)=>{
                if(!!vb){
                    setVoucherBilling(vb)
                }
            }).catch((erro)=>{
                if(!!setErrorMessage){
                    setErrorMessage(erro.message)
                }
            })
        }

        return () => {
            active = false;
        };
    }, [id,transference]);

    const convertdateAndTime = (myDate?:Date, text?:string) => {
        let result1 = !!myDate ? format(myDate, `'${text?text:'Criado'} em ' dd/MM/yyyy', às' H:mm; `): "";
        return result1
    };

    //const { isLoading, error, data } = useQuery(['getVoucherById',id], () => {return voucherService.getVoucherById(id);});
    //console.log(data)

    var createAtVar:Date | undefined = voucherBilling?.createdAt ;
    if(typeof createAtVar == 'string'){
        createAtVar = new Date(createAtVar)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                    <TypeButton href={`/pay-voucher?voucherBillingId=${id}`}>
                        {"Fatura"}
                    </TypeButton>
                    <TypeButton2 href={`/pay-voucher?voucherBillingId=${id}`}>
                        <OpenInNewIcon />
                    </TypeButton2>
                    <StyledAvatar photoUrl={voucherBilling.bookmakers?.photo} size={35} name={!!voucherBilling.bookmakers?.hid?voucherBilling.bookmakers?.hid[0]:"?"} />
                  
                    <>&nbsp;</>
                    <>&nbsp;</>
                    <>&nbsp;</>
                    <StyledTypographyTitle 
                        variant="body1"
                        sx={{
                            whiteSpace: 'nowrap', // Impede as quebras de linha
                            overflow: 'hidden', // Oculta o texto que transborda
                            textOverflow: 'ellipsis', // Adiciona reticências para indicar texto cortado
                            maxWidth: '200px', // Define um limite para o texto transbordar
                        }}
                        >
                       {voucherBilling?.bookmakers?.hid}
                    </StyledTypographyTitle>
                    <TypeButton2 href={`/bookmaker-created?bookmakerHash=${voucherBilling.bookmakers?.id}`}>
                        <OpenInNewIcon />
                    </TypeButton2>
                <HeaderButton>
                   
                    <>&nbsp;</>
                    
                    {/*<Column>
                    <StyledTypographyTitle variant="body2">
                        { convertdateAndTime(createAtVar,"Solicitado") + voucherBilling.transferences?convertdateAndTime(voucherBilling.transferences?.createdAt,", Pago"):"" }
                    </StyledTypographyTitle>
                    </Column>*/}
           
                    <CoinAndExpandMore>
                        {<ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Ver mais">
                            <ExpandMoreIcon/>
                        </ExpandMore> }
                    </CoinAndExpandMore>
                </HeaderButton>
            </StyledCardContentHeader>
            {
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                  
                                    <StyledTypographyData 
                                    paragraph={true}
                                    style={{
                                        fontSize: "30px",
                                        
                                    }}
                                    >
                                    {!!(voucherBilling.transferences)?"Pago":"Em aberto"}
                                    </StyledTypographyData>
                                    <StyledTypographyData>
                                        <ValidVoucherBilling 
                                            voucherBilling={voucherBilling}
                                            setTransference={setTransference} 
                                            setErrorMessage={setErrorMessage}
                                            >

                                            {""}
                                        </ValidVoucherBilling>
                                    </StyledTypographyData>
                                </Collapse> 
                        }


            <BodyCardContent>
            { convertdateAndTime(createAtVar,"Solicitado") + voucherBilling.transferences?convertdateAndTime(voucherBilling.transferences?.createdAt,", Pago"):"" }
            
            </BodyCardContent>

            
            <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                <p>{errorMessage}</p>
            </Alert>
        </StyledCard>
    );
}
