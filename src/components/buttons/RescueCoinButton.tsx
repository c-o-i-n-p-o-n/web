import styled from "@emotion/styled";
import {Button} from "@mui/material";
import { DescriptionLine, TypeButton } from "../CurrencyCard/FullCurrencyCard.styles";
import { Column } from "../../styles/shared-styles";

const RescueCoinButton = ({children, style, ...props}: any) => {

    const StyledButton = styled(Button)({
        width: "100%",
        ...style
    })

    return (
            
        <DescriptionLine {...style}>
            <Column>
                <TypeButton {...props}>
                    {children}
                </TypeButton>
            </Column>
            <Column>
            
            </Column>
        </DescriptionLine>
        
    );
}


export default RescueCoinButton;
