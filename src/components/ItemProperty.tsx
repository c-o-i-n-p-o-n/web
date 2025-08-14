import {styled} from "@mui/material";

import React, { ReactNode } from "react";

interface ItemComponentProps {
    children: ReactNode
}

const ItemProperty: React.FC<ItemComponentProps> = ({ children }) => {
    const StyledMatchProperties = styled("div")({
        display: "flex",
        flexDirection: "column",
    });

    return (
        <StyledMatchProperties>
            {children}
        </StyledMatchProperties> 
    );
}

export default ItemProperty;
