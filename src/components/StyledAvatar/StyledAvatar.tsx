import { Avatar } from "@mui/material";
import { MouseEventHandler } from "react";

interface StyledAvatarProps {
  photoUrl?: string;
  size: number;
  onClick?: MouseEventHandler,
  name?: String,
}

export function StyledAvatar({ photoUrl, size, onClick, name }: StyledAvatarProps) {
  return (
    <Avatar 
      onClick={onClick}
      sx={{ width: size, height: size, cursor: "pointer" }}
      src={photoUrl}
    >{name}</Avatar>
  );
}