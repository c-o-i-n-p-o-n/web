
import React, {useState} from "react";


import {
    BodyCardContent,
    HeaderButton,
    StyledCard,
    StyledCardContentHeader,
    StyledTypographyTitle
} from "./BookmakerFull.styles";
import { Column, Row } from "../../styles/shared-styles";
import Bookmaker from "../../models/Bookmaker";

import { CurrencyService } from "../../services/CurrencyService";
import Alert from "../Alert/Alert";

import RequestedGenerics from "../../containers/RequestedGenerics";
import { useQuery } from "react-query";
import { GenericService } from "../../services/GenericService";


interface DataProps {
    bookmakerLocal?: Bookmaker;
    bookmaker?:Bookmaker;
    title: string;
}

const currencyService = new CurrencyService();
const genericService = new GenericService();

export default function BookmakerFullData({bookmakerLocal,bookmaker,title}: DataProps) {

    //const [expanded, setExpanded] = useState(false);
    const [listSize, setListSize] = useState(5);
    const [page, setPage] = useState(0);

    
    const { isLoading, error, data: mostRequested } = useQuery(['getGenericBookmakerPageAndSize',page,listSize,bookmakerLocal], 
    () => {return genericService.getGenericBookmakerPageAndSize(page,listSize,bookmakerLocal)});

    const [errorMessage, setErrorMessage] = useState("");

    // const [data, setData] = useState({
    //     hid: bookmakerLocal?.hid,
    //     description: bookmakerLocal?.description,
    //     classification: bookmakerLocal?.classification,
    //     govNumber: bookmakerLocal?.govNumber,
    //     city: bookmakerLocal?.city,
    //     address: bookmakerLocal?.address,
    //     addressNumber: bookmakerLocal?.addressNumber,
    //     neighborhood: bookmakerLocal?.neighborhood,
    //     zipCode: bookmakerLocal?.zipCode
    // });
    
    const owner = !!(bookmakerLocal?.itIsMe) || false;
    
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    
    // const editDataHandler = () => {
    //     if(!data){
    //         return
    //     }
        
    //     const fetchUrl = async () => {
    //         onEditHandler(
    //             bookmakerLocal,
    //             {
    //                 hid: data.hid,
    //                 description: data.description,
    //                 classification: data.classification,
    //                 govNumber: data.govNumber
    //             },
    //             "Dados atualizados!"
    //         );
    //     }

    //     fetchUrl().catch(console.log);
                 
    // };

    return (
        <StyledCard>
            
                <StyledCardContentHeader>
                    <HeaderButton>
                        <Column>
                            <StyledTypographyTitle variant="body2">
                                {title}
                            </StyledTypographyTitle>
                        </Column>
                    </HeaderButton>
                </StyledCardContentHeader>

                <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                    <p>{errorMessage}</p>
                </Alert>


                <BodyCardContent>
                    <RequestedGenerics requestedGenerics={mostRequested} size={listSize} page={page} queryStr={undefined} />
                        
                
                </BodyCardContent>
        </StyledCard>
    );
}
