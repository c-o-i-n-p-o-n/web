import {styled, Typography} from "@mui/material";
import Match from "../models/Match";
import FullMatchCard from "../components/MatchCard/FullMatchCard";

interface RequestedMatchesProps {
    requested?: Array<Match>;
    size?: number;
    page?: number;
}

function RequestedMatches({requested, size, page}: RequestedMatchesProps) {
    const StyledBetsList = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    console.log(requested)
    return (
        <>{
            !!requested && requested.length > 0 ? <StyledBetsList>
                {requested.slice(0, size || 5).map((matchItem, index) => {
                    console.log(matchItem)
                    if(!!matchItem){
                        return <FullMatchCard key={index} match={matchItem}/>
                    }
                })}
            </StyledBetsList> : <div><Typography sx={{color:"white", textAlign: "center", marginTop: "10vh", marginBottom: "10vh"}}>nenhuma resultado disponível</Typography></div>
        }</>
    );
}

export default RequestedMatches;
