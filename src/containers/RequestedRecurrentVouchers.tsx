import {styled, Typography} from "@mui/material";
import RecurrentVoucher from "../models/RecurrentVoucher";
import { FullRecurrentVoucherCard } from "../components/RecurrencyCard/FullRecurrentVoucherCard";

interface RequestedRecurrentVouchersProps {
    requested?: Array<RecurrentVoucher>;
    size?: number;
    page?: number;
    setErrorMessage?: Function;
}

export function RequestedRecurrentVouchers({requested, size, page, setErrorMessage}: RequestedRecurrentVouchersProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    console.log(requested)
    return (
        <>{
            !!requested && requested.length > 0 ? <StyledBetsList>
                {requested.slice(0, size || 5).map((recurrentVoucherItem, index) => {
                    console.log(recurrentVoucherItem)
                    if(!!recurrentVoucherItem){
                        return <FullRecurrentVoucherCard setErrorMessage={setErrorMessage} recurrentVoucher={recurrentVoucherItem} key={index} />
                    }
                })}
            </StyledBetsList> : <div><Typography >nenhum resultado disponível</Typography></div>
        }</>
    );
}
