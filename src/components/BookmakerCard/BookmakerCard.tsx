import {Collapse, Typography} from "@mui/material";
import Bookmaker from "../../models/Bookmaker";
import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import { Generic } from "../../models/Generic";


import {
    BodyCardContent,
    BookmakerAndExpandMore,
    ExpandMore,
    HeaderButton,
    StyledCard,
    StyledCardContentHeader,
    StyledTypographyData,
    StyledTypographyTitle,
    TypeButton
} from "./BookmakerCard.styles";
import { Margin, Padding, SpaceBetweenRow, Column, Row } from "../../styles/shared-styles";
import { BookmakerService } from "../../services/BookmakerService";
import { useQuery } from "react-query";

// interface BookmarkerCardProps {
//     bookmaker: Bookmaker
// }
interface BookmarkerCardProps {
    bookmaker: Generic
}

const bookmakerService = new BookmakerService();

export default function BookmakerCard({bookmaker}: BookmarkerCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, hid, description, photo} = bookmaker;

    const { isLoading, error, data } = useQuery(['getBookmakerById',id], () => {return bookmakerService.getBookmakerById(id?id:undefined);});
    console.log(data)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                    <TypeButton href={`/bookmaker-created?bookmakerId=${id}`}>
                        {"Site"}
                    </TypeButton>
                <HeaderButton>
                    {/* <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon> */}
                    
                    <StyledAvatar photoUrl={data?.photo} size={35} name={!!data?.hid?data?.hid[0]:"?"} />
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {data?.hid}
                        </StyledTypographyTitle>
                    </Column>
                    <BookmakerAndExpandMore>
                        {<ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Ver mais">
                            <ExpandMoreIcon/>
                        </ExpandMore> }
                    </BookmakerAndExpandMore>
                </HeaderButton>
            </StyledCardContentHeader>
            {
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <StyledTypographyData paragraph={true}>
                                        {data?.description}
                                    </StyledTypographyData>
                                </Collapse> 
                        }


            <BodyCardContent>
            {data?.description}
            </BodyCardContent>
        </StyledCard>
    );
}
