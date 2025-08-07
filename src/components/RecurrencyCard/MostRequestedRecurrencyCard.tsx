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
} from "./MostRequestedRecurrencyCard.styles";
import { Margin, Padding, SpaceBetweenRow, Column, Row } from "../../styles/shared-styles";
import { useQuery } from "react-query";
import { RecurrentVoucherService } from "../../services/RecurrentVoucherService";

// interface BookmarkerCardProps {
//     bookmaker: Bookmaker
// }
interface RecurrencyCardProps {
    recurrency: Generic
}

const recurrentVoucherService = new RecurrentVoucherService();

export default function MostRequestedRecurrencyCard({recurrency}: RecurrencyCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, hid, description, photo} = recurrency;

    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + (myTime / (1000 * 60 * 60 * 24)) + " dias": "";
        return result1 + result2
    };

    const { isLoading, error, data } = useQuery(['getRecurrentVoucherById',id], () => {return recurrentVoucherService.getRecurrentVoucherById(id);});
    console.log(data)
    
    var createAtVar:Date | undefined = data?.createdAt ;
    if(typeof createAtVar == 'string'){
        createAtVar = new Date(createAtVar)
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function convertToDuration(recurrence: number | undefined, timeUnit: string | undefined, cicles: number | undefined) {
        console.log(recurrence)
        console.log(cicles)
        //let duration = !!recurrence ? (recurrence / (1000 * 60 * 60 * 24)):0
        //console.log(duration + " " + cicles)
        if(!!!recurrence || recurrence <= 0 || !!!cicles || cicles <= 0){
            return "";
        }else if (recurrence == 1 && timeUnit == "YEAR" && cicles >= 2){
            return "a cada ano, por " + cicles + " anos" ;
        }else if (recurrence == 6 && timeUnit == "MONTH" && cicles >= 2){
            return "a cada seis meses, por " + cicles + " semestres";
        }else if (recurrence == 3 && timeUnit == "MONTH" && cicles >= 2){
            return "a cada três meses, por " + cicles + " trimestres";
       }else if (recurrence == 2 && timeUnit == "MONTH" && cicles >= 2){
            return "a cada dois meses, por " + cicles + " bimestres";
        }else if (recurrence == 1 && timeUnit == "MONTH" && cicles >= 2){
            return "a cada mês, por " + cicles + " meses";
        }else if (recurrence == 1 && timeUnit == "HALF MONTH" && cicles >= 2){
            return "a cada quinzena, por " + cicles + " quinzenas";
        }else if (recurrence == 1 && timeUnit == "WEEK" && cicles >= 2){
            return "a cada semana, por " + cicles + " semanas";
        }else if (recurrence == 1 && timeUnit == "DAY" && cicles >= 2){
            return "a cada dia, por " + cicles + " dias";
        }else{
            return "";
        }
    }

    return (
        <StyledCard>
            <StyledCardContentHeader onClick={handleExpandClick}>
                    <TypeButton href={`/coin-created?currencyId=${id}`}>
                        {"Assinatura"}
                    </TypeButton>
                    <StyledAvatar photoUrl={data?.logo} size={35} name={!!data?.hid?data?.hid[0]:"V"} />
                    {!!(data?.bookmakers)?
                    <>
                    <TypeButton href={`/bookmaker-created?bookmakerHash=${data?.bookmakers?.id}`}>
                        {"Site"}
                    </TypeButton>
                    <StyledAvatar photoUrl={data?.bookmakers?.photo} size={35} name={!!data?.bookmakers?.hid?data?.bookmakers?.hid[0]:"?"} />
                    </>
                    
                    
                    :<></>
                    }
                <HeaderButton>
                    {/* <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon> */}
                    
                    
                    <>&nbsp;</>
                    
                    <Column>
                    <StyledTypographyTitle variant="body2">
                        {"    " + data?.hid + ((data?.bookmakers?.hid)?" em: " + data?.bookmakers?.hid:"")}
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
                                    {/* <StyledTypographyData paragraph={true}>
                                        {"Vale " + data?.amountPerUser + data?.currencies?.acronym + (!!data?.currencies?.hid?" (" + data?.currencies?.hid + ")":"")}
                                    </StyledTypographyData> */}
                                    <StyledTypographyData paragraph={true}>
                                    {data?.description}
                                    </StyledTypographyData>
                                    <StyledTypographyData>
                                        { convertdateAndTime(createAtVar,data?.expiredAt) }
                                    </StyledTypographyData>
                                </Collapse> 

                        }


            <BodyCardContent>
            {"Assine " + data?.amountPerDue + " " + data?.currencies?.acronym + (!!data?.currencies?.hid?" (" + data?.currencies?.hid + ") ":" ") + convertToDuration(data?.period,data?.timeUnit,data?.cicles)}
            {/* {!!(data?.description)?data?.description.length > 100?data?.description.slice(0, 100)+"...":data?.description:""} */}
            </BodyCardContent>
        </StyledCard>
    );
}
