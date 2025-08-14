import {styled, Typography} from "@mui/material";
import Bet from "../models/Bet";
import FullBetCard from "../components/BetCard/FullBetCard";

interface RequestedBetsProps {
    requested?: Array<Bet>;
    size?: number;
    page?: number;
}

function RequestedBets({requested, size, page}: RequestedBetsProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    console.log(requested)
    return (
        <>{
            !!requested && requested.length > 0 ? <StyledBetsList>
                {requested.slice(0, size || 5).map((betItem, index) => {
                    console.log(betItem)
                    if(!!betItem){
                        return <FullBetCard key={index} bet={betItem}/>
                    }
                })}
            </StyledBetsList> : <div><Typography sx={{color:"white", textAlign: "center", marginTop: "10vh", marginBottom: "10vh"}}>nenhuma resultado disponível</Typography></div>
        }</>
    );
}

export default RequestedBets;
