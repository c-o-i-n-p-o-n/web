import {Collapse, TextField} from "@mui/material";
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
    StyledButton,
    StyledTypographyTitle
} from "./AvatarImage.styles";
import { Column, Row } from "../styles/shared-styles";
import { MatchService } from "../services/MatchService";
import { StyledAvatar } from "./StyledAvatar/StyledAvatar";
import Match from "../models/Match";
import Bookmaker from "../models/Bookmaker";
import Voucher from "../models/Voucher";
import Alert from "./Alert/Alert";
import RecurrentVoucher from "../models/RecurrentVoucher";
import Currency from "../models/Currency";




// const MyButtons = ({owner, onClickHandler, ...style}: { owner: boolean, onClickHandler: MouseEventHandler<HTMLButtonElement>, style?: {} }) => {

//     if(!!owner){
//         return (
//             <DescriptionLine {...style}>
//                 <Description>
//                     {/* <StyledButton onClick={onClickHandler}>
//                         <SportsVolleyballOutlinedIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SportsVolleyballOutlinedIcon>
//                     </StyledButton> */}
//                 </Description> 
//             </DescriptionLine>
//         );
//     }else{
//         return (<></>);
//     }
    
// }


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
                        <SaveIcon style={{backgroundColor: "Highlight", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SaveIcon>
                    </StyledButton> 
                </Description> 
            </DescriptionLine>
        );
    }else{
        return (<></>);
    }
    
}

interface DataProps {
    entity?: any;// Match | Voucher | RecurrentVoucher | Currency | Bookmaker;
    bookmaker?: Bookmaker;
    onEditHandler:Function
}

const betService = new MatchService();

export default function AvatarImage({entity,bookmaker,onEditHandler}: DataProps) {

    const [expanded, setExpanded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [url, setUrl] = useState(entity?.logo);
    const [image, setImage] = useState(entity?.logo);
    
    const owner = !!entity && !!bookmaker && !!bookmaker.id?entity.id === bookmaker.id || entity.bookmakers?.id === bookmaker.id:false;

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
                onEditHandler(entity,{logo:url},"Avatar atualizado!");
                //setImage(url)
            }else{
                setErrorMessage("O caminho especificado não é uma imagem")
                
            }
        }

        fetchUrl().catch(console.log);
         
          
        
    };
    
    return (
        <StyledCard>
            {!!owner?
                <><StyledCardContentHeader onClick={handleExpandClick}>
                    <HeaderButton>
                        
                        {/* <Column>
                            <StyledTypographyTitle variant="body2">
                                {props.match?.hid}
                            </StyledTypographyTitle>
                        </Column> */}
                        <Column>
                            <StyledTypographyTitle variant="body2">
                                {"Imagem (Logotipo)"}
                            </StyledTypographyTitle>
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
                                    url={entity?.logo}
                                    setUrl={setUrl}
                                    onClickHandler={editImageHandler}
                                    style={{
                                        marginBottom: '5px'
                                    }}/>
                            </BodyCardContent>
                        </Collapse> 
                }</>:<></>
            }
            

            <BodyCardContent>
                
                <DescriptionLine >
                    {!!owner?
                    <StyledAvatar photoUrl={entity?.logo} size={35} name={!!entity?.hid?entity.hid[0]:"I"} />
                    :
                    <Description>
                        <StyledAvatar photoUrl={entity?.logo} size={35} name={!!entity?.hid?entity.hid[0]:"I"} />
                        <StyledTypographyTitle variant="body2">
                            {""}
                        </StyledTypographyTitle> 
                        <StyledTypographyTitle variant="body2">
                            {entity?.hid}
                        </StyledTypographyTitle> 
                    </Description> 
                    }
                </DescriptionLine>
                
            </BodyCardContent>
        </StyledCard>
    );
}
