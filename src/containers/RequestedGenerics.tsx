import {styled, Typography} from "@mui/material";
import MostRequestedMatchCard from "../components/BetCard/BetCard";
import { Types } from "../core/constants/types";
import { Generic } from "../models/Generic";
import MostRequestedEventCard from "../components/EventCard/EventCard";
import MostRequestedBookMakerCard from "../components/BookmakerCard/BookmakerCard";
import CoinCard from "../components/CoinCard/CoinCard";
import MostRequestedVoucherCard from "../components/VoucherCard/MostRequestedVoucherCard";
import MostRequestedRecurrencyCard from "../components/RecurrencyCard/MostRequestedRecurrencyCard";

interface RequestedGenericsProps {
    requestedGenerics?: Array<Generic>;
    size?: number;
    page?: number;
    queryStr?: String;
}

function RequestedGenerics({requestedGenerics, size, page, queryStr}: RequestedGenericsProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    console.log(requestedGenerics)
    return (
        <>{
            !!requestedGenerics && requestedGenerics.length > 0 ? <StyledBetsList>
                {requestedGenerics.slice(0, size || 5).map((genericItem, index) => {
                    console.log(genericItem)
                    // if(genericItem.type == Types.MATCHES){
                    //     return <MostRequestedMatchCard key={index} match={genericItem}/>
                    // }
                    // if(genericItem.type == Types.EVENTS){
                    //     return <MostRequestedEventCard key={index} event={genericItem}/>
                    // }
                    if(genericItem.type == Types.BOOKMAKERS){
                        return <MostRequestedBookMakerCard key={index} bookmaker={genericItem}/>
                    }
                    if(genericItem.type == Types.CURRENCIES){
                        return <CoinCard key={index} currency={genericItem}/>
                    }
                    if(genericItem.type == Types.VOUCHERS){
                        return <MostRequestedVoucherCard key={index} voucher={genericItem}/>
                    }
                    if(genericItem.type == Types.RECURRENCIES){
                        return <MostRequestedRecurrencyCard key={index} recurrency={genericItem}/>
                    }
                })}
            </StyledBetsList> : <div><Typography sx={{color:"white", textAlign: "center", marginTop: "10vh", marginBottom: "10vh"}}>nenhuma resultado disponível</Typography></div>
        }</>
    );
}

export default RequestedGenerics;
