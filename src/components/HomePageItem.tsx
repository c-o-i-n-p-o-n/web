import { Container } from "@mui/material";
import SectionTitle from "../containers/SectionTitle";
import { ISectionProps } from "../types/SectionProps";
import { styled } from "@mui/material";
import { Button } from '@mui/material';

const StyledButton = styled(Button)({
  color: "#6B61F5",
  fontSize: "10px",
  textTransform: "capitalize"
})

export default function SectionGroup(props: ISectionProps) {
  return (
    <Container>
      <SectionTitle 
        title={props.title} 
        showSeeMore={props.showSeeMore} 
        seeMoreHandler={props.seeMoreHandler} />
      {props.children}

      {(props.showSeeMore && props.seeMoreHandler) &&
          <StyledButton onClick={props.seeMoreHandler}>{"VER TODOS"}</StyledButton>}
    </Container>
  );
}
