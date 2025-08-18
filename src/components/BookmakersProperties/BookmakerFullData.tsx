import {Collapse, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField} from "@mui/material";
import React, {MouseEventHandler, ReactNode, useEffect, useState} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsVolleyballOutlinedIcon from '@mui/icons-material/SportsVolleyballOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { format } from "date-fns";

import * as yup from 'yup';

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
    StyledFields,
    StyledTypographyTitle
} from "./BookmakerFull.styles";
import { Column, Row } from "../../styles/shared-styles";
import Bookmaker from "../../models/Bookmaker";
import Currency from "../../models/Currency";
import { CurrencyService } from "../../services/CurrencyService";
import Alert from "../Alert/Alert";
import Voucher from "../../models/Voucher";
import RecurrentVoucher from "../../models/RecurrentVoucher";
import ServerError from "../../models/ServerError";
import { number } from "yup";
import { Generic } from "../../models/Generic";
import RequestedGenerics from "../../containers/RequestedGenerics";
import { useQuery } from "react-query";
import { GenericService } from "../../services/GenericService";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import CustomButton from "../CustomButton";

interface Data {
    description?:string,
    hid?:string,
    classification?:string,
    govNumber?:string
}


const StyledForm = styled(Form)({
    height: "60vh",
    display: "flex",
    color: "white",
    flexDirection: "column",
    justifyContent: "space-between"
})

const validationSchema = yup.object({});



const initialValues: Data = {
    hid: "",
    description: "",
    classification: "",
    govNumber: ""
};

const Edit = ({owner, data, setData, onSubmit, ...style}: { owner: boolean, data: Data, setData: Function, onSubmit: ((values: Data, formikHelpers: FormikHelpers<Data>) => void | Promise<any>) & Function, style?: {} }) => {

    const changeAmountPerUserHandler = (_e: SelectChangeEvent<number>, child: ReactNode ) => {
        setData({...data,amountPerUser:_e.target.value});
    };
    const changeExpiredAtHandler = (_e: SelectChangeEvent<number>, child: ReactNode ) => {
        setData({...data,expiredAt:_e.target.value});
    };

    const cpfMask = (value: string | undefined) => {
        if(!!!value){
            return "";
        }
        var result:string = value.replace(/\D/g, '');
        if(result.length > 11){
            return result
                .replace(/(\d{2})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1/$2')
                .replace(/(\d{4})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1')
        }
        return result
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    if(!!owner){
        return (
            <DescriptionLine>
                <Column>



        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik: FormikProps<Data>) => (
                <StyledForm onSubmit={formik.handleSubmit}>

                    <StyledFields>
                        <Field as={TextField}
                              key="hid"
                              id="hid"
                              name="hid"
                              label="Título" 
                              placeholder="Ganhe shop grátis"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.hid && Boolean(formik.errors.hid)}
                              helperText={formik.touched.hid && formik.errors.hid}/>           

                         <Field as={TextField}
                               multiline
                               minRows={2}
                               maxRows={4}
                               
                               key="description"
                               id="description"
                               name="description"
                               label="Descrição"
                               placeholder='Pegue dois cupons valendo um segundo shop grátis cada.'
                               className="form-field"
                               variant="outlined"
                               error={formik.touched.description && Boolean(formik.errors.description)}
                               helperText={formik.touched.description && formik.errors.description}/> 


                        <Field as={TextField}
                              key="classification"
                              id="classification"
                              name="classification"
                              label="Classificação" 
                              placeholder="Classificação"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.classification && Boolean(formik.errors.classification)}
                              helperText={formik.touched.classification && formik.errors.classification}/>       

                        {/* <Field as={TextField}
                              key="logo"
                              id="logo"
                              name="logo"
                              label="Avatar (URL)"
                              placeholder="https://drive.google.com/file/d/..."
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.photo && Boolean(formik.errors.photo)}
                              helperText={formik.touched.photo && formik.errors.photo}/> 
                        

                        <Field as={TextField}
                              key="photo"
                              id="photo"
                              name="photo"
                              label="Banner promocional (URL)"
                              placeholder="https://drive.google.com/file/d/..."
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.photo && Boolean(formik.errors.photo)}
                              helperText={formik.touched.photo && formik.errors.photo}/>  */}



                       
                        
                        <InputLabel id="demo-cost-select-label">CPF/CNPJ</InputLabel>

                        <Field as={TextField}
                            id="govNumber"
                            name="govNumber"
                            type="text"
                            placeholder="CPF/CNPJ"
                            label="CPF/CNPJ"
                            variant="standard"
                            className="form-field"
                            value={cpfMask(formik.values.govNumber)}
                            error={formik.touched.govNumber && Boolean(formik.errors.govNumber)}
                            helperText={formik.touched.govNumber && formik.errors.govNumber}/>
                    </StyledFields>

                    <CustomButton
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    disabled={!(formik.isValid && formik.dirty)}
                                    loading={formik.isSubmitting}
                                >
                                    {/* CONFIRMAR E PROSSEGUIR */}
                                    
                            <SaveIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SaveIcon>
                                </CustomButton>
                                
                        {/* <StyledButton onClick={onClickHandler}>
                            <SaveIcon style={{backgroundColor: "#6B61F5", borderRadius: "20px", fontSize: "35px", padding: "5px", color: "white"}}></SaveIcon>
                        </StyledButton>  */}
                                    {/* <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                                        <p>{errorMessage}</p>
                                    </Alert> */}
                </StyledForm>



            )}





        </Formik>





                    
                </Column>

            </DescriptionLine>
        );
    }else{
        return (<></>);
    }
    
}

interface DataProps {
    bookmakerLocal?: Bookmaker;
    bookmaker?:Bookmaker;
    title: string;
    onEditHandler:Function
}

const currencyService = new CurrencyService();
const genericService = new GenericService();

export default function BookmakerFullData({bookmakerLocal,bookmaker,title,onEditHandler}: DataProps) {

    const [expanded, setExpanded] = useState(false);
    const [listSize, setListSize] = useState(5);
    const [page, setPage] = useState(0);

    
    const { isLoading, error, data: mostRequested } = useQuery(['getGenericBookmakerPageAndSize',page,listSize,bookmakerLocal], 
    () => {return genericService.getGenericBookmakerPageAndSize(page,listSize,bookmakerLocal)});

    const [errorMessage, setErrorMessage] = useState("");

    const [data, setData] = useState({
        hid: bookmakerLocal?.hid,
        description: bookmakerLocal?.description,
        classification: bookmakerLocal?.classification,
        govNumber: bookmakerLocal?.govNumber
    });
    
    const owner = !!(bookmakerLocal?.itIsMe) || false;
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
    const editDataHandler = () => {
        if(!data){
            return
        }
        
        const fetchUrl = async () => {
            onEditHandler(
                bookmakerLocal,
                {
                    hid: data.hid,
                    description: data.description,
                    classification: data.classification,
                    govNumber: data.govNumber
                },
                "Dados atualizados!"
            );
        }

        fetchUrl().catch(console.log);
                 
    };

    return (
        <StyledCard>
            
                <StyledCardContentHeader onClick={handleExpandClick}>
                    <HeaderButton>
                        <Column>
                            <StyledTypographyTitle variant="body2">
                                {title}
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



                
                    <Collapse in={expanded} timeout="auto" unmountOnExit>                        
                        <BodyCardContent>
                            {/* <Data
                                owner={owner}
                                data={mostRequested}
                                style={{
                                    marginBottom: '5px'
                                }}/> */}

                            {!!(bookmakerLocal?.itIsMe)?<Edit
                                owner={owner}
                                data={data}
                                setData={setData}
                                onSubmit={editDataHandler}
                                style={{
                                    marginBottom: '5px'
                                }}/>
                                
                                
                                :
<>

                    <Column>
                        <Description>
                            <StyledTypographyTitle variant="body2">
                                {`${!!(bookmakerLocal?.classification)?bookmakerLocal?.classification:"Site"}: ${bookmakerLocal?.hid}`}
                            </StyledTypographyTitle> 
                        </Description> 
                    </Column>
                    <Column>
                        <StyledTypographyTitle variant="body2">
                            {"Status: " + ((bookmakerLocal?.status == 1)?"Ativo":(bookmakerLocal?.status == 0)?"Inativo":"Excluído")}
                        </StyledTypographyTitle> 
                    </Column>
                    {/* <Column>
                        <StyledTypographyTitle variant="body2">
                            {"Vale: " + currency?.amountPerUser + " tokens"}
                        </StyledTypographyTitle> 
                    </Column> */}
                    <DescriptionLine >
                        <Description>
                            <StyledTypographyTitle variant="body2">
                                {bookmakerLocal?.createdAt?"Criado em: " + format(bookmakerLocal?.createdAt, " dd/MM/yyyy', às' H:mm"):"" }
                            </StyledTypographyTitle> 
                            <StyledTypographyTitle variant="body2">
                                {bookmakerLocal?.score?"Conceito: " + bookmakerLocal?.score:"" }
                            </StyledTypographyTitle> 
                        </Description> 
                    </DescriptionLine>
                    <DescriptionLine >
                        <Description>
                            <StyledTypographyTitle variant="body2">
                                 {`${!!(bookmakerLocal?.description)?bookmakerLocal?.description:""}`}
                            </StyledTypographyTitle> 
                        </Description> 
                    </DescriptionLine>
</>

                            }


                                
                            
                        </BodyCardContent>
                    </Collapse> 
                
                
                
     
            

                <BodyCardContent>
                    <RequestedGenerics requestedGenerics={mostRequested} size={listSize} page={page} queryStr={undefined} />
                        
                
                </BodyCardContent>
        </StyledCard>
    );
}
