import {styled, Typography} from "@mui/material";
import Currency from "../models/Currency";
import FullCurrencyCard from "../components/CurrencyCard/FullCurrencyCard";

interface RequestedCurrenciesProps {
    requested?: Array<Currency>;
    size?: number;
    page?: number;
    setErrorMessage?: Function;
}

function RequestedCurrencies({requested, size, page, setErrorMessage}: RequestedCurrenciesProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    console.log(requested)
    return (
        <>{
            !!requested && requested.length > 0 ? <StyledBetsList>
                {requested.slice(0, size || 5).map((currencyItem, index) => {
                    console.log(currencyItem)
                    if(!!currencyItem){
                        return <FullCurrencyCard setErrorMessage={setErrorMessage} currency={currencyItem} key={index} />
                    }
                })}
            </StyledBetsList> : <div><Typography sx={{color:"white", textAlign: "center", marginTop: "10vh", marginBottom: "10vh"}}>nenhuma resultado disponível</Typography></div>
        }</>
    );
}

export default RequestedCurrencies;
