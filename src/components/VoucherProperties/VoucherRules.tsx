import React from "react";

import {
    Description,
    DescriptionLine,
    StyledTypographyTitle,
    StyledCard,
    StyledCardContentHeader,
    BodyCardContent
} from "./Voucher.styles";
import { MatchService } from "../../services/MatchService";
import Voucher from "../../models/Voucher";
import { Column } from "../../styles/shared-styles";
import RecurrentVoucher from "../../models/RecurrentVoucher";

interface DataProps {
    voucher?: Voucher | RecurrentVoucher;
    title: string;
}

const betService = new MatchService();

export default function VoucherRules({voucher,title}: DataProps) {
    
    return (

        <StyledCard>
            <StyledCardContentHeader>
            <Column>
                <StyledTypographyTitle variant="body2">
                    {title}
                </StyledTypographyTitle>
            </Column>
            </StyledCardContentHeader>
            <BodyCardContent>
            <DescriptionLine >
                <Description>
                    <StyledTypographyTitle variant="body2" >
                        {voucher?.description}
                    </StyledTypographyTitle> 
                </Description> 
            </DescriptionLine>
            </BodyCardContent>
        </StyledCard>
    );
}
