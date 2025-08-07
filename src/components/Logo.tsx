import { Box, CardMedia } from "@mui/material";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import Image from 'next/image'
import Link from "next/link";

interface LogoProps {
  size: number;
  onClick?: MouseEventHandler,
  src: string;
}

export function Logo() {
  const router = useRouter();

  const handleIndex = () => {
    router.push('/');
  };

  return (
    
          <Link href="/" className="hover:underline">
            <Image src="/images/logo4.png" alt="me" width="186" height="31" />
          </Link>
    
  );
}
