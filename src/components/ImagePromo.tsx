import { Box, CardMedia } from "@mui/material";
import { MouseEventHandler, useState } from "react";
import Image from 'next/image'
import { styled} from "@mui/material";

interface ImagePromoProps {
  url?: string;
  size?: number;
}

export const ImageBanner = styled(Image)({


    width: "auto",
   // height: "70px",

  
});

export function ImagePromo({url,size}: ImagePromoProps) {
  

  return (
    <Image src={url || "/default-img.jpg"} 
    alt="banner" 
    height={size || 70} 
    width={0}
    sizes="100vw"
    style={{ width: 'auto' }} />
    // <img src={url || "/default-img.jpg"} alt="banner" height={size || 70} sizes="100vw"/>
  );
}
