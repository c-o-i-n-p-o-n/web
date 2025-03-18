import {CircularProgress, Collapse, Skeleton, Typography} from "@mui/material";
import Bet from "../../models/Bet";
import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';

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
    TypeButton
} from "./FullBetCard.styles";
import { Column, Row } from "../../styles/shared-styles";
import { MatchService } from "../../services/MatchService";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import Option from "../../models/Option";
import CenteredComponent from "../CenteredComponent";


interface BetCardProps {
    bet: Bet;
    key: number;
}

const TitleExpiration = ({options, status, odds, amount, ...style}: { options: Option, status: number, odds: number, amount?: number, style?: {} }) => {

    let count = 0;
    let end = false;
    return (
        <DescriptionLine {...style}>
            <Description> </Description> 
                <Column>
                    <StyledTypographyTitle variant="body2">
                        {options.hid}
                    </StyledTypographyTitle>
                    <StyledTypographyTitle variant="body2">
                        {status}
                    </StyledTypographyTitle>
                    <StyledTypographyTitle variant="body2">
                        {amount}
                    </StyledTypographyTitle>
                    <Odd>
                        {odds?.toPrecision(4)}
                    </Odd>
                </Column>
        </DescriptionLine>
    );
}



const DescriptionBet = ({description, name, ...style}: { description: string, name: string, style?: {} }) => {

    return (
        <DescriptionLine {...style}>
            <Description>
                <Typography paragraph={true}>
                    {description?.slice(0, 80)}
                </Typography>
            </Description> 
            <DescriptionLine {...style}>
                <StyledTypographyTitle variant="body2">
                    {name}
                </StyledTypographyTitle>
            </DescriptionLine>
        </DescriptionLine>
    );
}

//const betService = new MatchService();
const matchService = new MatchService();

export default function FullBetCard({bet}: BetCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, hid, description, odds, createdAt, options, amount, status } = bet;

    
    const { isLoading: isLoadingMatch, error: matchError, data: match } = 
      useQuery(['getMatchByOptionId',options.id], 
      () => {return matchService.getMatchByOptionId(options.id)});

    const convertdate = (myDate1?:Date,myDate2?:Date) => {
        let result1 = !!myDate1 ? format(myDate1, "'Apostou em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myDate2 ? format(myDate2, "'Finaliza em ' dd/MM/yyyy', às' H:mm; "): "";
        return result1 + result2
    };
    
    var createAtVar:Date | undefined = createdAt ;
    var expiredAtVar:Date | undefined = match?.events?.beginningAt ;

    if(typeof expiredAtVar == 'string'){
        expiredAtVar = new Date(expiredAtVar)
    }

    if(typeof createAtVar == 'string'){
        createAtVar = new Date(createAtVar)
    }

    console.log(typeof expiredAtVar)
    if(!!expiredAtVar){
        console.log(typeof expiredAtVar)
        let expiredAtAux = match?.expiredAt
        console.log(expiredAtAux)
        if(!!expiredAtAux)
            expiredAtVar.setMilliseconds(expiredAtVar.getUTCMilliseconds() - (expiredAtAux))
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                    <TypeButton href={`/bet-created?betId=${id}`}>
                        {"Detalhes"}
                    </TypeButton>
                    
            {isLoadingMatch ? <CenteredComponent>
                    <CircularProgress />
                </CenteredComponent> :
                <HeaderButton>
                    {/* <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon> */}
                    
                    
                    <StyledAvatar photoUrl={match.events?.logo} size={35} name={!!hid?hid[0]:"B"} />
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {hid}
                        </StyledTypographyTitle>
                    </Column>
                    <EventTimeAndExpandMore>
                        {<ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                            <ExpandMoreIcon/>
                        </ExpandMore> }
                    </EventTimeAndExpandMore>
                </HeaderButton>}
            </StyledCardContentHeader>

            {isLoadingMatch ? <CenteredComponent>
                    <CircularProgress />
                </CenteredComponent> : 
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <StyledTypographyData paragraph={true}>
                            {description}
                        </StyledTypographyData>
                        <StyledTypographyData>
                            { convertdate(createAtVar,expiredAtVar) }
                        </StyledTypographyData>
                        <BodyCardContent>
                            <DescriptionBet
                                key={id}
                                style={{
                                    marginBottom: '5px'
                                }}
                                description={description}
                                name={hid}/>
                        </BodyCardContent>
                    </Collapse> 
            }

            <BodyCardContent>
                <TitleExpiration
                    style={{
                        marginBottom: '5px'
                    }}
                    options={options}
                    status={status}
                    odds={odds}
                    amount={amount}/>
            </BodyCardContent>
        </StyledCard>
    );
}
