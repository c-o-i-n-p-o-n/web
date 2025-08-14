import {Collapse, Skeleton, Typography} from "@mui/material";
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
} from "./BetCard.styles";
import { Column, Row } from "../../styles/shared-styles";
import { Generic } from "../../models/Generic";
import { MatchService } from "../../services/MatchService";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import Option from "../../models/Option";


interface MatchCardProps {
    match: Generic
}

const TitleOdd = ({options, ...style}: { options?: Option[], style?: {} }) => {

    let count = 0;
    let end = false;
    return (
        <DescriptionLine {...style}>
            <Description> </Description> 
            {!!options ? options.map(({id, hid, description, odd}) => {
                count++;
                if(count <= 3)
                    return (<Column>
                                <StyledTypographyTitle variant="body2">
                                    {hid}
                                </StyledTypographyTitle>
                                <Odd>
                                    {odd?.toPrecision(4)}
                                </Odd>
                            </Column>
                        )
                else if(!end){
                    end = true;
                    return(<Column>
                        <StyledTypographyTitle variant="body2"></StyledTypographyTitle>
                        <StyledTypographyTitle variant="body2">
                            {"..."}
                        </StyledTypographyTitle>
                    </Column>
                    )
                }
            }) : null}
        </DescriptionLine>
    );
}



const DescriptionOdd = ({description, name, odd, ...style}: { description: string, name: string, odd: number, style?: {} }) => {

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
                <Odd>
                    {odd?.toPrecision(4)}
                </Odd>
            </DescriptionLine>
        </DescriptionLine>
    );
}

const betService = new MatchService();

export default function MostRequestedBetCard({match}: MatchCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, hid, description, photo} = match;

    const convertdate = (myDate?:Date) => {
        return !!myDate ? format(myDate, "'finaliza ' dd/MM/yyyy', às' H:mm"): ""
    };
    
    

    //mostRequested: { createdAt, expiredAt, options }
    const { isLoading, error, data } = useQuery(['getMatchById',id], () => {return betService.getMatchById(id);});
    console.log(data)

    var expiredAt:Date | undefined = data?.events?.beginningAt ;

    if(typeof expiredAt == 'string'){
        expiredAt = new Date(expiredAt)
    }
    
    console.log(typeof expiredAt)
    if(!!expiredAt && !!data?.expiredAt){
        console.log(typeof expiredAt)
        let expiredAtAux = data?.expiredAt
        console.log(expiredAtAux)
        if(!!expiredAtAux)
            expiredAt.setMilliseconds(expiredAt.getUTCMilliseconds() - (expiredAtAux))
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                    <TypeButton href={`/match-created?matchId=${id}`}>
                        {"Apostar"}
                    </TypeButton>
                <HeaderButton>
                    {/* <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon> */}
                    
                    
                    <StyledAvatar photoUrl={data?.logo} size={35} name={!!data?.hid?data.hid[0]:"M"} />
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {data?.hid}
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
                </HeaderButton>
            </StyledCardContentHeader>

            {
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <StyledTypographyData paragraph={true}>
                            {data?.description}
                        </StyledTypographyData>
                        <StyledTypographyData>
                            { convertdate(expiredAt) }
                        </StyledTypographyData>
                        <BodyCardContent>
                        {!!data && !!data.options ? data.options.map(({id, hid, description, odd}) => {
                                            return (
                                                <DescriptionOdd
                                                    key={id}
                                                    style={{
                                                        marginBottom: '5px'
                                                    }}
                                                    description={description}
                                                    name={hid}
                                                    odd={odd}/>
                                            )
                                        }) : null}
                        </BodyCardContent>
                    </Collapse> 
            }

            <BodyCardContent>
                <TitleOdd
                    style={{
                        marginBottom: '5px'
                    }}
                    options={data?.options}/>
            </BodyCardContent>
        </StyledCard>
    );
}