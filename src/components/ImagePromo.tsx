import { Box, CardMedia } from "@mui/material";
import { MouseEventHandler, useEffect, useState } from "react";
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
  
  const [imgSrc, setImgSrc] = useState(url);
  const [isLoaded, setIsLoaded] = useState(false);
  const fallbackSrc = "/default-img.jpg";

  useEffect(() => {
    const checkImage = async () => {
      if(!!url){
        try {
          const response = await fetch(url, { method: 'HEAD' }); // Faz uma requisição HEAD para verificar a existência
          if (response.ok) {
            setImgSrc(url); // Imagem válida
          } else {
            setImgSrc(fallbackSrc); // Imagem não encontrada ou com erro
          }
        } catch (error) {
          setImgSrc(fallbackSrc); // Erro de rede ou outra falha
        } finally {
          setIsLoaded(true);
        }
      }
    };
    checkImage();
  }, [url]);

  if (!isLoaded) {
    return <div>A carregar...</div>; // ou um componente de carregamento
  }

  return (
    <Image src={imgSrc || fallbackSrc} 
    alt="banner" 
    height={size || 70} 
    width={0}
    sizes="100vw"
    style={{ width: 'auto' }} />
    // <img src={url || "/default-img.jpg"} alt="banner" height={size || 70} sizes="100vw"/>
  );
}
