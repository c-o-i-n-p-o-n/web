
import React, {MouseEventHandler, useEffect, useState} from "react";
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import copy from "copy-to-clipboard";  

import {
    Description,
    DescriptionLine,
    BrandWrapper,
    StyledButton
} from "./ShareButtons.styles";
import { MatchService } from "../services/MatchService";
import Alert from "./Alert/Alert";





const Buttons = ({shareHandler, copyOrShareLinkHandler, shareQRCodeHandler, ...style}: 
    { 
        shareHandler: MouseEventHandler<HTMLButtonElement>, 
        copyOrShareLinkHandler: MouseEventHandler<HTMLButtonElement>, 
        shareQRCodeHandler: MouseEventHandler<HTMLButtonElement>, 
        style?: {} }) => {


    return (
        <DescriptionLine {...style}>
            <Description>
                <StyledButton onClick={shareHandler}>
                    <ShareIcon style={{backgroundColor: "Highlight", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}/>
                </StyledButton>
                <StyledButton onClick={copyOrShareLinkHandler}>
                    <LinkIcon style={{backgroundColor: "Highlight", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}/>
                </StyledButton> 
                <StyledButton onClick={shareQRCodeHandler}>
                    <QrCode2Icon style={{backgroundColor: "Highlight", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}/>
                </StyledButton>
            </Description> 
        </DescriptionLine>
    );

    
}

interface ShareButtonsProps {
    link?: string;
    bannerLink?: string;
}

interface SharingPack {
    title: string;
    text: string;
    url?: string;
    blob?: Blob;
    fileTitle?: string;
}

const betService = new MatchService();

export default function ShareButtons({link,bannerLink}: ShareButtonsProps) {

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    console.log(link);

    const [qrcode, setQrcode] = useState(new Blob());
    const [banner, setBanner] = useState(new Blob());
    const convertedLink = encodeURIComponent(!!link?link:'');

    
    useEffect(() => {
        let active = true;
        const size = 150;
        
        const fetchQRCode = async () => {
            if(!!link){
                setQrcode(await fetch(`http://api.qrserver.com/v1/create-qr-code/?data=${convertedLink}&size=${size}x${size}&bgcolor=ffffff`).then(r=>r.blob()))
            }
        }
        
        const fetchBanner = async () => {
            if(!!bannerLink){
                setBanner(await fetch(bannerLink).then(r=>r.blob()))
            }
        }
        
        fetchQRCode().catch(console.log);
        fetchBanner().catch(console.log);

        return () => {
            active = false;
        };
        
    }, [link,bannerLink,convertedLink]);

    if(!link){
        return(<></>)
    }

    const share = async ({title, text, url, blob, fileTitle}:SharingPack) => {

        const data = !!blob && !!url? {
            files: [
                new File([blob], fileTitle || 'match.png', {
                type: blob.type,
                }),
            ],
            title: title,
            text: text,
            url: url,
        } : !!blob && !url? {
            files: [
                new File([blob], fileTitle || 'match.png', {
                type: blob.type,
                }),
            ],
            title: title,
            text: text,
        } : !blob && !!url? {
            title: title,
            text: text,
            url: url,
        } : {
            title: title,
            text: text,
        };
        try {
            if (!(navigator.canShare(data))) {
                setErrorMessage("Não é possível realizar o compartilhamento");
            }
            await navigator.share(data);
        } catch (err) {
            console.error(err);
            //console.error(err.name, err.message);
        }
    };

    const ShareHandler = () => {
        //setExpanded(!expanded);
        if(!!bannerLink){
            share({
                title:"Banner",
                text:"Compartilhe o seu Banner promocional",
                blob:banner,
                fileTitle:"banner.png",
                url:link
            }).catch(console.log);
        }else{
            share({
                title:"Link",
                text:"Compartilhe o link da sua aposta",
                url:link
            }).catch(console.log);
        }
    };
    const CopyLinkHandler = () => {
        //setExpanded(!expanded);
        copy(link);
        setSuccessMessage("Link compiado para área de transferência")
    };
    const ShareQRCodeHandler = () => {
        share({
            title:"QRCode",
            text:"Compartilhe o QRCode",
            blob:qrcode,
            fileTitle:"qrcode.png",
            url:link
        }).catch(console.log);
        // navigator.share({
        //     title: 'Share', 
        //     text:  'whatevs',                    
        //     url: ''
        //    });
    };
    
    return (
        <>
            {!!link?
                <><BrandWrapper sx={{ flexGrow: 1 }}>
                    <Buttons
                        shareHandler={ShareHandler}
                        copyOrShareLinkHandler={CopyLinkHandler}
                        shareQRCodeHandler={ShareQRCodeHandler}
                        style={{
                            marginBottom: '5px'
                        }}/>
                </BrandWrapper>
                <Alert type="success" show={!!successMessage} closeAll={()=> setSuccessMessage("")}>
                    <p>{successMessage}</p>
                </Alert>
                <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                    <p>{errorMessage}</p>
                </Alert></>
            :
                
                
                <>
                </>
            }
            

        </>
    );
}
