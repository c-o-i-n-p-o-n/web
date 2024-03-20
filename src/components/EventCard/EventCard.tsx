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
    StyledCard,
    StyledCardContentHeader,
    StyledTypography,
    StyledTypographyTitle,
    StyledTypographyData,
    TypeButton
} from "./EventCard.styles";
import { Column, Row } from "../../styles/shared-styles";
import { Generic } from "../../models/Generic";
import { MatchService } from "../../services/MatchService";
import { useQuery } from "react-query";
import { format } from "date-fns";
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import { EventService } from "../../services/EventService";
import Category from "../../models/Category";
import Event from "../../models/Event";


interface EventCardProps {
    event: Generic
}

const Categories = ({categories, ...style}: { categories?: Category[], style?: {} }) => {

    let count = 0;
    let end = false;
    return (
        <DescriptionLine {...style}>
            <Description> </Description> 
            {!!categories ? categories.map(({id, hid, description}) => {
                count++;
                if(count <= 3)
                    return (<Column>
                                <StyledTypographyTitle variant="body2">
                                    {hid}
                                </StyledTypographyTitle>
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



// const DescriptionOdd = ({description, name, odd, ...style}: { description: string, name: string, odd: number, style?: {} }) => {

//     return (
//         <DescriptionLine {...style}>
//             <Description>
//                 <Typography paragraph={true}>
//                     {description?.slice(0, 80)}
//                 </Typography>
//             </Description> 
//             <DescriptionLine {...style}>
//                 <StyledTypographyTitle variant="body2">
//                     {name}
//                 </StyledTypographyTitle>
//                 <Odd>
//                     {odd?.toPrecision(4)}
//                 </Odd>
//             </DescriptionLine>
//         </DescriptionLine>
//     );
// }

const eventService = new EventService();

export default function MostRequestedEventCard({event}: EventCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, name, description, photo, logo} = event;

    const convertdate = (myDate?:Date,myDuration?:Number) => {
        if(typeof myDate == 'object') {
            let result = format(myDate, "'Ocorrerá ' dd/MM/yyyy', às' H:mm")
            if(!!myDate){
                result += " e deve durar " + (myDuration) + " minutos"
            }
            return result;//!!myDate ? format(myDate, "'Ocorrerá ' dd/MM/yyyy', às' H:mm") + " e deve durar " + (myDuration): ""
        }else{
            return ""
        }
    };
    
    

    //mostRequested: { createdAt, expiredAt, options }
    const { isLoading, error, data } = useQuery(['getEventById',id], () => {return eventService.getEventById(id);});
    console.log(data)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                    <TypeButton href={`/event-created?eventId=${id}`}>
                        {"Evento"}
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
                        <StyledTypographyData paragraph={true}>
                            { convertdate(data?.beginningAt,data?.duration)  }
                        </StyledTypographyData>
                        {/* <StyledTypographyData paragraph={true}>
                        </StyledTypographyData> */}
                    </Collapse> 
            }

            <BodyCardContent>
                <Categories
                    style={{
                        marginBottom: '5px'
                    }}
                    categories={data?.categories}/>
            </BodyCardContent>
        </StyledCard>
    );
}


export function EventCard({event}: {event?:Event}) {

    const [expanded, setExpanded] = useState(false);

    const convertdate = (myDate?:Date,myDuration?:Number) => {
        if(typeof myDate == 'object') {
            let result = format(myDate, "'Ocorrerá ' dd/MM/yyyy', às' H:mm")
            if(!!myDate){
                result += " e deve durar " + (myDuration) + " minutos"
            }
            return result;//!!myDate ? format(myDate, "'Ocorrerá ' dd/MM/yyyy', às' H:mm") + " e deve durar " + (myDuration): ""
        }else{
            return ""
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                <HeaderButton>
                    <StyledAvatar photoUrl={event?.logo} size={35} name={!!event?.hid?event.hid[0]:"M"} />
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {event?.hid}
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
                            {event?.description}
                        </StyledTypographyData>
                        <StyledTypographyData paragraph={true}>
                            { convertdate(event?.beginningAt,event?.duration)  }
                        </StyledTypographyData>
                        {/* <StyledTypographyData paragraph={true}>
                        </StyledTypographyData> */}
                    </Collapse> 
            }

            <BodyCardContent>
                <Categories
                    style={{
                        marginBottom: '5px'
                    }}
                    categories={event?.categories}/>
            </BodyCardContent>
        </StyledCard>
    );
}
