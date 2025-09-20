import {styled, Typography} from "@mui/material";
import MostRequestedMatchCard from "../components/BetCard/BetCard";
import { Types } from "../core/constants/types";
import { Generic } from "../models/Generic";
import MostRequestedEventCard from "../components/EventCard/EventCard";
import MostRequestedBookMakerCard from "../components/BookmakerCard/BookmakerCard";
import CoinCard from "../components/CoinCard/CoinCard";
import MostRequestedVoucherCard from "../components/VoucherCard/MostRequestedVoucherCard";
import MostRequestedRecurrencyCard from "../components/RecurrencyCard/MostRequestedRecurrencyCard";
import VoucherBilling from "../models/VoucherBilling";
import MostRequestedVoucherBillingCard from "../components/VoucherCard/MostRequestedVoucherBillingCard";

interface RequestedVoucherBillingsProps {
    requested?: Array<VoucherBilling>;
    size?: number;
    page?: number;
    queryStr?: String;
}

function RequestedVoucherBillings({requested, size, page, queryStr}: RequestedVoucherBillingsProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    console.log(requested)
    return (
        <>{
            !!requested && requested.length > 0 ? <StyledBetsList>
                {requested.slice(0, size || 5).map((item, index) => {
                    console.log(item)

                    return <MostRequestedVoucherBillingCard key={index} vb={item}/>
                    
                })}
            </StyledBetsList> : <div><Typography sx={{color:"white", textAlign: "center", marginTop: "10vh", marginBottom: "10vh"}}>nenhuma resultado disponível</Typography></div>
        }</>
    );
}

export default RequestedVoucherBillings;
