import {Collapse} from "@mui/material";
import React, {MouseEventHandler, useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    StyledTypographyTitle,
    BrandWrapper
} from "./Voucher.styles";
import { Column, Row } from "../../styles/shared-styles";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import Bookmaker from "../../models/Bookmaker";
import Voucher, { VoucherStatus } from "../../models/Voucher";
import CustomButton from "../CustomButton";
import Currency from "../../models/Currency";
import { VoucherService } from "../../services/VoucherService";
import { useQuery } from "react-query";
import { CurrencyService } from "../../services/CurrencyService";
import Alert from "../Alert/Alert";
import ServerError from "../../models/ServerError";




const MyButtons = ({owner, onClickHandler, ...style}: { owner: boolean, onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {

    if(!!owner){
        return (
            <DescriptionLine {...style}>
                <Description>
                    {/* <StyledButton onClick={onClickHandler}>
                        <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon>
                    </StyledButton> */}
                </Description> 
            </DescriptionLine>
        );
    }else{
        return (<></>);
    }
    
}

interface DataProps {
    voucher: Voucher;
    bookmaker?: Bookmaker;
}

const voucherService = new VoucherService();
const currencyService = new CurrencyService();

export default function TakeVoucherButton({voucher,bookmaker}: DataProps) {
    
    const owner = !!voucher && !!bookmaker && (!!bookmaker.id)?voucher.bookmakers?.id === bookmaker.id:false;
    
    const [currency, setCurrency] = useState<Currency | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(false);
    const [voucherTaken, setVoucherTaken] = useState<boolean>(false);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let active = true;
        console.log(voucher);

        const fetchMatch = async () => {
            if(!!voucher.hash)
            setVoucherTaken(await voucherService.checkVoucherTaken(voucher.hash));
            console.log(voucherTaken);
        }

        fetchMatch().catch(()=>{
            console.log(voucher.hash);
        });

        return () => {
            active = false;
        };
    }, [voucher]);

    useEffect(() => {
        let active = true;
        console.log(voucher);

        const fetchMatch = async () => {
            setCurrency(await currencyService.getCurrencyByVoucherId(voucher.id));
            console.log(currency);
        }

        fetchMatch().catch(()=>{
            console.log(currency?.id);
        });

        return () => {
            active = false;
        };
    }, [voucher]);

    const takeVoucherHandler = () => {
        setLoading(true);
        if(!!voucher.hash){
            voucherService.takeVoucher(voucher.hash)
                .then((_res: boolean) => {
                  setSuccessMessage("Parabéns, os cupons são seus! Confira em na opção 'Meus cupons'")
                  setLoading(_res);
                })
                .catch((err: ServerError) => {
                  console.log("Erro interno");
                  setErrorMessage("Erro interno")
                });
        }
    };
    
    return (
        <BrandWrapper sx={{ flexGrow: 1 }}>
            {!owner ?
            <>
                <DescriptionLine style={{
                    marginBottom: '5px'
                }}>
                    <Description>
                        
                        <CustomButton
                            color="primary"
                            variant="outlined"
                            fullWidth
                            onClick={takeVoucherHandler}
                            disabled={(voucher?.status != VoucherStatus.OPEN || !!voucherTaken)}
                            loading={loading}
                            sx={{
                                background: "#339933"}}
                        >
                            {"EU QUERO " + (voucher.amountPerUser) + " " + ((voucher.amountPerUser == 1)?"CUPOM ":"CUPONS ") + (currency?.acronym || "...")}
                        </CustomButton>

                    </Description> 
                </DescriptionLine>
                
                <Alert type="success" show={!!successMessage} closeAll={()=> setSuccessMessage("")}>
                    <p>{successMessage}</p>
                </Alert>
                <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                    <p>{errorMessage}</p>
                </Alert>
            </>:<></>
            }
            
        </BrandWrapper>

    );
}
