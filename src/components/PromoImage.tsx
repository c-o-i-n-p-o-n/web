import {Collapse, colors, TextField} from "@mui/material";
import React, {MouseEventHandler, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';

import {
    BodyCardContent,
    Description,
    DescriptionLine,
    EventTimeAndExpandMore,
    ExpandMore,
    HeaderButton,
    StyledCard,
    StyledCardContentHeader,
    BrandWrapper,
    StyledTypographyTitle
} from "./PromoImage.styles";
import { Column, Row } from "../styles/shared-styles";
import { MatchService } from "../services/MatchService";
import Match from "../models/Match";
import Bookmaker from "../models/Bookmaker";
import { StyledButton } from "./AvatarImage.styles";
import Voucher from "../models/Voucher";
import { ImagePromo } from "./ImagePromo";
import Alert from "./Alert/Alert";
import RecurrentVoucher from "../models/RecurrentVoucher";
import Currency from "../models/Currency";




const Edit = ({owner, url, setUrl, onClickHandler, ...style}: { owner: boolean, url: String | undefined, setUrl: Function, onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {

    const changeUrlHandler = (_e: React.ChangeEvent<HTMLInputElement> ) => {
        setUrl(_e.target.value);
    };

    if(!!owner){
        return (
            <DescriptionLine {...style}>
                <Description>
                    <TextField
                        // value={url}
                        defaultValue={url}
                        type="text"
                        label="Endereço da imagem"
                        placeholder="https://www.banners.com/banner"
                        variant="standard"
                        
                        onChange={changeUrlHandler}
                        fullWidth
                        />
                    <StyledButton onClick={onClickHandler}>
                        <SaveIcon style={{backgroundColor: "#056ad7", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SaveIcon>
                    </StyledButton> 
                </Description> 
            </DescriptionLine>
        );
    }else{
        return (<></>);
    }
    
}

interface DataProps {
    entity?: Match | Voucher | RecurrentVoucher | Currency;
    bookmaker?: Bookmaker;
    onEditHandler:Function
}

const betService = new MatchService();

export default function PromoImage({entity,bookmaker,onEditHandler}: DataProps) {

    const [expanded, setExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [url, setUrl] = useState(entity?.photo);
    const [image, setImage] = useState(entity?.photo);
    const owner = !!entity && !!bookmaker && !!bookmaker.id?entity.bookmakers?.id === bookmaker.id:false;
    console.log(entity);
    console.log(entity?.bookmakers);
    console.log(entity?.bookmakers?.id);
    console.log(bookmaker);
    console.log(bookmaker?.id);
    console.log(owner);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const editImageHandler = () => {
        if(!url){
            return
        }
        
        const fetchUrl = async () => {
            const res = await fetch(url, {    
                method: 'GET',    
                'credentials': 'include',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin':'http://localhost:3000/',
                    'Content-Type': 'application/json',
                }),   
                mode: 'no-cors',       
              });
            const buff = await res.blob();
            console.log(res)
            //if( buff.type.startsWith('image/') ){
            if( !!res.type ){
                console.log("/default-img.jpg")
                onEditHandler(entity,{photo:url},"Banner promocional atualizado!");
                //setImage(url)
            }else{
                setErrorMessage("O caminho especificado não é uma imagem")
                
            }
        }

        fetchUrl().catch(console.log);
         
          
        
    };
    
    return (
        <>
            {!!owner?
                <StyledCard><StyledCardContentHeader onClick={handleExpandClick}>
                    
                    <HeaderButton>
                        
                         {/* <Column>
                            <StyledTypographyTitle variant="body2">
                                {match?.hid}
                            </StyledTypographyTitle>
                        </Column>  */}
                        <Column>
                                        
                            <StyledTypographyTitle variant="body2">
                                {"Banner promocional"}
                            </StyledTypographyTitle>
                            <BrandWrapper sx={{ flexGrow: 1 }}>
                                <ImagePromo url={image} />
                            </BrandWrapper>
                        </Column>
                        <EventTimeAndExpandMore>
                            {<ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="opções">
                                <ExpandMoreIcon/>
                            </ExpandMore> }
                        </EventTimeAndExpandMore>
                    </HeaderButton>
                </StyledCardContentHeader>

                <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                    <p>{errorMessage}</p>
                </Alert>
                {
                        <Collapse in={expanded} timeout="auto" unmountOnExit>                        
                            <BodyCardContent>
                                <Edit
                                    owner={owner}
                                    url={entity?.photo}
                                    setUrl={setUrl}
                                    onClickHandler={editImageHandler}
                                    style={{
                                        marginBottom: '5px'
                                    }}/>
                            </BodyCardContent>
                        </Collapse> 
                        
                }</StyledCard>:
                
                
                <BrandWrapper sx={{ flexGrow: 1 }}>
                    <ImagePromo url={entity?.photo} size = {200}/>
                </BrandWrapper>
            }
            

        </>
    );
}
