
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
import Currency from "../../models/Currency";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import { Column } from "../../styles/shared-styles";
import Bookmaker from "../../models/Bookmaker";
import { MouseEventHandler, useState } from "react";
import TextField from "@mui/material/TextField";
import { CircularProgress, InputAdornment } from "@mui/material";

import { NumberFormatValues, NumericFormat } from "react-number-format";
import RefreshIcon from "@mui/icons-material/Refresh";
import RescueCoinButton from "../buttons/RescueCoinButton";
import CenteredComponent from "../CenteredComponent";
import { TransferenceService } from "../../services/TransferenceService";
import Transference from "../../models/Transference";



const Edit = ({currency, setAmount, amount, onClickHandler, ...style}: { currency:Currency, setAmount: Function, amount?: number, onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {

    // const changeAmountHandler = (_e: React.ChangeEvent<HTMLInputElement> ) => {
    //     setAmount(_e.target.value);
    // };
    
    const changeAmountHandler = (values:NumberFormatValues ) => {
        setAmount(values.floatValue);
    };

    return (
        <DescriptionLine {...style}>
            <Description>
            
                <NumericFormat
                    value={amount}
                    customInput={TextField}
                    label="Valor"
                    variant="outlined"
                    fullWidth
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix={currency.acronym+"$"}
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
                <StyledButton onClick={onClickHandler}>
                    <RefreshIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}>
                        Verificar pagamento
                    </RefreshIcon>
                </StyledButton> 
            </Description> 
        </DescriptionLine>
    );

    
}

interface AmountAndCheckProps {
    children: any;
    currency: Currency;
    onEditHandler:Function
    setErrorMessage?:Function
}


const transferenceService = new TransferenceService();

export default function AmountAndCheckRescue({children,currency,onEditHandler,setErrorMessage}: AmountAndCheckProps) {

    //const {id, acronym, description, logo, photo, createdAt, expiredAt, type, maxAmount, validAmount, expiredAmount, isOwner } = currency;

    const [amount, setAmount] = useState<number|undefined>(undefined);

    //const hash = !!amount?transferenceService.genereteReceive(currency,amount):undefined;
    //let transference = undefined as Transference | undefined
    const irParaProximaPagina = () => {
                
        // const checkTransference = async () => {
        //     console.log(transference);
        //     transference = !!amount?await transferenceService.genereteReceive(currency,amount):undefined;
            
        //     //setTransference(await transferenceService.getTransferenceByHash(hash));
        // }

        if(!!amount){
            transferenceService.genereteReceive(currency,amount).then((transference)=>{
                if (!!transference?.hash){
                    window.location.href = "/transference-rescue?hash=" + transference.hash;
                    console.log(transference.hash);
                }
                console.log(transference);
            }).catch((erro)=>{
                if(!!setErrorMessage){
                    setErrorMessage(erro.message)
                }
            })
        }
    
        // checkTransference().catch((erro )=>{
        //     if(!!setErrorMessage){
        //         setErrorMessage(erro.message)
        //     }
        // });
    
        // checkTransference().then(()=>{
        //     if (!!transference?.hash){
        //         window.location.href = "/transference-rescue?hash=" + transference.hash;
        //         console.log(transference.hash);
        //     }
        //     console.log(transference);
        // });
        
    };
  
    return (
        <StyledCard>
            <BodyCardContent>
                {!currency? 
                <CenteredComponent>
                <CircularProgress />
              </CenteredComponent>
            :
            
            <RescueCoinButton 
                amount={amount}
                currencyId={currency.id}>
            {children}
            </RescueCoinButton>
            }
                
                <Column>
                    <Edit
                        amount={amount}
                        currency={currency}
                        setAmount={setAmount}
                        onClickHandler={irParaProximaPagina}
                        style={{
                            marginBottom: '5px'
                        }}/>
                </Column>
{/*     
                <Column>
                    <Odd>
                        {validAmount?.toPrecision(4)}
                    </Odd>
                    <Odd>
                        {expiredAmount?.toPrecision(4)}
                    </Odd>
                </Column>              */}
            </BodyCardContent>
        </StyledCard>
    );
}