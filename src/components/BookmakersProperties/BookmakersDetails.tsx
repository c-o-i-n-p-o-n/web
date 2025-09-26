import React, { ReactNode, useState } from "react";

import {
    Description,
    DescriptionLine,
    StyledTypographyTitle,
    StyledCard,
    StyledCardContentHeader,
    BodyCardContent,
    StyledFields,
    HeaderButton,
    ExpandMore,
    EventTimeAndExpandMore
} from "./BookmakerFull.styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MatchService } from "../../services/MatchService";
import Voucher from "../../models/Voucher";
import { Column } from "../../styles/shared-styles";
import RecurrentVoucher from "../../models/RecurrentVoucher";
import Currency from "../../models/Currency";
import Bookmaker from "../../models/Bookmaker";
import Alert from "../Alert/Alert";
import {Collapse, InputLabel, MenuItem, Select, SelectChangeEvent, styled, TextField} from "@mui/material";
import { format } from "date-fns";
import * as yup from 'yup';
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import CustomButton from "../CustomButton";

interface Data {
    description?:string,
    hid?:string,
    classification?:string,
    govNumber?:string,
    country?:string,
    state?:string,
    city?:string,
    address?:string,
    addressNumber?:string,
    neighborhood?:string,
    zipCode?:string
}

const StyledForm = styled(Form)({
    height: "60vh",
    display: "flex",
    color: "white",
    flexDirection: "column",
    justifyContent: "space-between"
})

const validationSchema = yup.object({});



const Edit = ({owner, data, setData, onSubmit, ...style}: { owner: boolean, data: Data, setData: Function, onSubmit: ((values: Data, formikHelpers: FormikHelpers<Data>) => void | Promise<any>) & Function, style?: {} }) => {

        
    const initialValues: Data = {
        hid: data.hid,
        description: data.description,
        classification: data.classification,
        govNumber: data.govNumber,
        country: data.country,
        state: data.state,
        city: data.city,
        address: data.address,
        addressNumber: data.addressNumber,
        neighborhood: data.neighborhood,
        zipCode: data.zipCode
    };

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

    

    const cepMask = (value: string | undefined) => {
        if(!!!value){
            return "";
        }
        var result:string = value.replace(/\D/g, '');
        return result
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1')
    }

    if(!!owner){
        return (
                



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
                              label="Seu Nome / Marca" 
                              placeholder="Seu Nome / Marca"
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
                              label="Classificação (Restaurante, Farmácia, Eletricista, Sra., Só um cara, etc)" 
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
                              helperText={formik.touched.photo && formik.errors.photo}/>  



                       
                        
                        <InputLabel id="demo-cost-select-label">CPF/CNPJ</InputLabel>*/}

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

                        
                        
                        <Field as={TextField}
                              key="state"
                              id="state"
                              name="state"
                              label="UF" 
                              placeholder="UF"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.state && Boolean(formik.errors.state)}
                              helperText={formik.touched.state && formik.errors.state}/>  
                        
                        <Field as={TextField}
                              key="city"
                              id="city"
                              name="city"
                              label="Cidade" 
                              placeholder="Cidade"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.city && Boolean(formik.errors.city)}
                              helperText={formik.touched.city && formik.errors.city}/>  

                        <Field as={TextField}
                              key="address"
                              id="address"
                              name="address"
                              label="Endereço" 
                              placeholder="Endereço"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.address && Boolean(formik.errors.address)}
                              helperText={formik.touched.address && formik.errors.address}/>  
                              
                        <Field as={TextField}
                              key="addressNumber"
                              id="addressNumber"
                              name="addressNumber"
                              label="Número" 
                              placeholder="Número"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.addressNumber && Boolean(formik.errors.addressNumber)}
                              helperText={formik.touched.addressNumber && formik.errors.addressNumber}/>  
                              
                        <Field as={TextField}
                              key="neighborhood"
                              id="neighborhood"
                              name="neighborhood"
                              label="Bairro" 
                              placeholder="Bairro"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.neighborhood && Boolean(formik.errors.neighborhood)}
                              helperText={formik.touched.neighborhood && formik.errors.neighborhood}/>  
                        
                        
                        <Field as={TextField}
                            id="zipCode"
                            name="zipCode"
                            type="text"
                            placeholder="CEP"
                            label="CEP"
                            variant="standard"
                            className="form-field"
                            value={cepMask(formik.values.zipCode)}
                            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                            helperText={formik.touched.zipCode && formik.errors.zipCode}/>
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
                                    
                            Salvar
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

const betService = new MatchService();

export default function BookmakersDetails({bookmakerLocal,bookmaker,title,onEditHandler}: DataProps) {
    
    const [expanded, setExpanded] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    
    const [data, setData] = useState<Data>({
        hid: bookmakerLocal?.hid,
        description: bookmakerLocal?.description,
        classification: bookmakerLocal?.classification,
        govNumber: bookmakerLocal?.govNumber,
        state: bookmakerLocal?.state,
        city: bookmakerLocal?.city,
        address: bookmakerLocal?.address,
        addressNumber: bookmakerLocal?.addressNumber,
        neighborhood: bookmakerLocal?.neighborhood,
        zipCode: bookmakerLocal?.zipCode
    });
    
    const owner = !!(bookmakerLocal?.itIsMe) || false;
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const editDataHandler = 
    
            
    
    (data: Data,
            {setSubmitting, resetForm}: FormikHelpers<Data>) => {
        if(!data){
            return
        }
        
        const fetchUrl = async () => {
            onEditHandler(
                // {
                //     hid: data.hid,
                //     description: data.description,
                //     classification: data.classification,
                //     govNumber: data.govNumber
                // },
                data,
                "Dados atualizados!"
            );
        }

        fetchUrl().catch(console.log);
                 
    };

    return (

        <StyledCard>
            <StyledCardContentHeader>
            <Column>
                <StyledTypographyTitle variant="body2">
                    {title}
                </StyledTypographyTitle>
            </Column>
            
            {!!(bookmakerLocal?.itIsMe)?<Column>
                                            <HeaderButton>
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
            </Column>
                                            
                                            :
            <>
            
                                
            </>
            
                                        }
            
            </StyledCardContentHeader>
            
            <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                <p>{errorMessage}</p>
            </Alert>

            
                                
                                  
            
                                        {!!(bookmakerLocal?.itIsMe)?
                                        <Collapse  in={expanded} timeout="auto" unmountOnExit style={{minHeight: "800px"}}>                        
                                            <BodyCardContent>
                                                <Edit
                                                    owner={owner}
                                                    data={data}
                                                    setData={setData}
                                                    onSubmit={editDataHandler}
                                                    style={{
                                                        marginBottom: '5px'
                                                    }}/>
                                            </BodyCardContent>
                                        </Collapse> 
                                            
                                            
                                            :
            <>
            
                                
            </>
            
                                        }
            
            
                                            
                                        
                            
                            

            <BodyCardContent>
             
            
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
            
            </BodyCardContent>
        </StyledCard>
    );
}
