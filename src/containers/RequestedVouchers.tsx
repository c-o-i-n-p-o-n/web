import {styled, Typography} from "@mui/material";
import Voucher from "../models/Voucher";
import { FullVoucherCard } from "../components/VoucherCard/FullVoucherCard";

interface RequestedVouchersProps {
    requested?: Array<Voucher>;
    size?: number;
    page?: number;
    setErrorMessage?: Function;
}

export function RequestedVouchers({requested, size, page, setErrorMessage}: RequestedVouchersProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    console.log(requested)
    return (
        <>{
            !!requested && requested.length > 0 ? <StyledBetsList>
                {requested.slice(0, size || 5).map((voucherItem, index) => {
                    console.log(voucherItem)
                    if(!!voucherItem){
                        return <FullVoucherCard setErrorMessage={setErrorMessage} voucher={voucherItem} key={index} />
                    }
                })}
            </StyledBetsList> : <div><Typography >nenhum resultado disponível</Typography></div>
        }</>
    );
}
