import {styled, Typography} from "@mui/material";
import MostRequestedBetCard from "../components/MatchCard/FullMatchCard";
import Bet from "../models/Bet";

interface MostRequestedBetsProps {
    mostRequestedBets?: Array<Bet>;
    size?: number
}

function MostRequestedBets({mostRequestedBets, size}: MostRequestedBetsProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    return (
        <>{
            mostRequestedBets && mostRequestedBets.length ? <StyledBetsList>
                {/* {mostRequestedBets.slice(0, size || 5).map((betItem, index) => (
                    <MostRequestedBetCard key={index} bet={betItem}/>
                ))} */}
            </StyledBetsList> : <div><Typography sx={{color:"white", textAlign: "center", marginTop: "10vh", marginBottom: "10vh"}}>nenhuma bet disponível</Typography></div>
        }</>
    );
}

export default MostRequestedBets;
