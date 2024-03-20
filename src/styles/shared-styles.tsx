import styled from "@emotion/styled";

export const StyledLink = styled.a({
    fontWeight: "bold",
    cursor: "pointer"
})

export const Column = styled.div({
    display: "flex",
    flexDirection: "column",
})

export const Row = styled.div<{ width?: string }>(props => ({
    display: "flex",
    flexDirection: "row",
    width: props.width
}));

export const RowFlex = styled.div<{ width?: string }>(props => ({
    display: "flex",
    
    flexDirection: "row",
    width: props.width,
    justifyContent: "space-between"
}));


export const SpaceBetweenRow = styled(Row)({
    justifyContent: "space-between",
});

export const JustifyEndRow = styled(Row)({
    justifyContent: "end",
})

export const SpaceAroundRow = styled(Row)({
    justifyContent: "space-around",
})

export const Padding = styled.div<{ padding: string }>(props => ({
    padding: props.padding
}));

export const Margin = styled.div<{ margin: string }>(props => ({
    margin: props.margin
}));