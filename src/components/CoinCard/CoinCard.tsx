import {Collapse, Typography} from "@mui/material";
import Bookmaker from "../../models/Bookmaker";
import React, {useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledAvatar } from "../StyledAvatar/StyledAvatar";
import { Generic } from "../../models/Generic";
import { format } from "date-fns";


import {
    BodyCardContent,
    CoinAndExpandMore,
    ExpandMore,
    HeaderButton,
    StyledCard,
    StyledCardContentHeader,
    StyledTypographyData,
    StyledTypographyTitle,
    TypeButton
} from "./CoinCard.styles";
import { Margin, Padding, SpaceBetweenRow, Column, Row } from "../../styles/shared-styles";
import { CurrencyService } from "../../services/CurrencyService";
import { useQuery } from "react-query";

// interface BookmarkerCardProps {
//     bookmaker: Bookmaker
// }
interface CurrencyCardProps {
    currency: Generic
}

const currencyService = new CurrencyService();

export default function CoinCard({currency}: CurrencyCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, hid, description, photo} = currency;

    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + (myTime / (1000 * 60 * 60 * 24)) + " dias": "";
        return result1 + result2
    };

    const { isLoading, error, data } = useQuery(['getCurrencyById',id], () => {return currencyService.getCurrencyById(id);});
    console.log(data)

    var createAtVar:Date | undefined = data?.createdAt ;
    if(typeof createAtVar == 'string'){
        createAtVar = new Date(createAtVar)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                    <TypeButton href={`/coin-created?currencyId=${id}`}>
                        {"Cupom"}
                    </TypeButton>
                <HeaderButton>
                    {/* <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon> */}
                    
                    <StyledAvatar photoUrl={data?.logo} size={35} name={!!data?.acronym?data?.acronym[0]:"C"} />
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {data?.acronym + ((data?.hid)?" - " + data?.hid:"")}
                        </StyledTypographyTitle>
                    </Column>
                    {/* <Column>
                        <StyledTypographyTitle variant="body2">
                            {data?.hid}
                        </StyledTypographyTitle>
                    </Column> */}
                    <CoinAndExpandMore>
                        {<ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="Ver mais">
                            <ExpandMoreIcon/>
                        </ExpandMore> }
                    </CoinAndExpandMore>
                </HeaderButton>
            </StyledCardContentHeader>
            {
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <StyledTypographyData paragraph={true}>
                                    {data?.description}
                                    </StyledTypographyData>
                                    <StyledTypographyData>
                                        { convertdateAndTime(createAtVar,data?.expiredAt) }
                                    </StyledTypographyData>
                                </Collapse> 
                        }


            <BodyCardContent>
            {!!(data?.description)?data?.description.length > 100?data?.description.slice(0, 100)+"...":data?.description:""}
            </BodyCardContent>
        </StyledCard>
    );
}
