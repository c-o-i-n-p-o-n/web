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
} from "./MostRequestedVoucherCard.styles";
import { Margin, Padding, SpaceBetweenRow, Column, Row } from "../../styles/shared-styles";
import { useQuery } from "react-query";
import { VoucherService } from "../../services/VoucherService";

// interface BookmarkerCardProps {
//     bookmaker: Bookmaker
// }
interface VoucherCardProps {
    voucher: Generic
}

const voucherService = new VoucherService();

export default function MostRequestedVoucherCard({voucher}: VoucherCardProps) {

    const [expanded, setExpanded] = useState(false);

    const {id, name, description, photo, logo} = voucher;

    const convertdateAndTime = (myDate?:Date, myTime?:number) => {
        let result1 = !!myDate ? format(myDate, "'Criado em ' dd/MM/yyyy', às' H:mm; "): "";
        let result2 = !!myTime ? "Duração: " + (myTime / (1000 * 60 * 60 * 24)) + " dias": "";
        return result1 + result2
    };

    const { isLoading, error, data } = useQuery(['getVoucherById',id], () => {return voucherService.getVoucherById(id);});
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
                        {"Vale"}&nbsp;{"Cupom"}
                    </TypeButton>
                    <StyledAvatar photoUrl={data?.logo} size={35} name={!!data?.hid?data?.hid[0]:"V"} />
                    {!!data?.bookmakers?
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
            {"Vale " + data?.amountPerUser + " " + data?.currencies?.acronym + (!!data?.currencies?.hid?" (" + data?.currencies?.hid + ")":"")}
            {/* {!!(data?.description)?data?.description.length > 100?data?.description.slice(0, 100)+"...":data?.description:""} */}
            </BodyCardContent>
        </StyledCard>
    );
}
