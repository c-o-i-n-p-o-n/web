import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import SectionTitleProps from "../types/SectionTitleProps";

export default function SectionTitle(props: SectionTitleProps) {
  const { title, description } = props;

  const TitleButtonHolder = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline"
  });

  const StyledTitle = styled(Typography)({
    margin: "3vh 0 1vh 0",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    color: "white"
  });

  const StyledDescription = styled(Typography)({
    margin: "0 0 1vh 0",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    color: "white"
  });


  return (
    <div>
      <TitleButtonHolder>

        <StyledTitle variant="h1">{title}</StyledTitle>

      </TitleButtonHolder>

      { !!description && <StyledDescription>{description}</StyledDescription> }

    </div>

  );
}
