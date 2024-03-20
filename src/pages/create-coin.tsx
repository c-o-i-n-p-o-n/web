import {Autocomplete, Button, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {styled} from "@mui/system";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as yup from 'yup';
import CustomHeader from "../containers/CustomHeader/CustomHeader";
import SectionTitle from "../containers/SectionTitle";
import * as React from "react";
import {useEffect, useState} from "react";
import {AutocompleteChangeDetails, AutocompleteChangeReason} from "@mui/base/AutocompleteUnstyled/useAutocomplete";
import Event from "../models/Event";
import {CurrencyService} from "../services/CurrencyService";
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from "next/router";
import { RowFlex } from "../styles/shared-styles";
import ServerError from "../models/ServerError";

import CustomButton from "../components/CustomButton";
import Alert from "../components/Alert/Alert";
import Currency from "../models/Currency";
import CurrencyCreation from "../models/CurrencyCreation";

const StyledPageContainer = styled("div")({
    height: "100vh"
})

const StyledContainer = styled(Container)({
    height: "80vh"
})

const StyledForm = styled(Form)({
    height: "60vh",
    display: "flex",
    color: "white",
    flexDirection: "column",
    justifyContent: "space-between"
})

const StyledButton = styled(Button)({
    display: "flex",
    color: "white",
    flexDirection: "column",
    ".form-field": {
        margin: "1vh 0"
    },
    ".submit-button-terms": {
        margin: "2vh 0",
    },
    //background: "#370365",
    borderRadius: "50px",




    fontSize: "16px",

    fontWeight: "bold",


})

const StyledFields = styled("div")({
    display: "flex",
    color: "white",
    flexDirection: "column",
    ".form-field": {
        margin: "1vh 0"
    },
    ".submit-button-terms": {
        margin: "2vh 0",
    }
})

const validationSchema = yup.object({});

const initialValues: CurrencyCreation = {
    acronym: "",
    hid: "",
    baseDescription: "",
    description: "",
    amount: 0,
    minAmount: 0
};

const onSubmit = (
    values: any,
    {setSubmitting, resetForm}: FormikHelpers<CurrencyCreation>
) => {

    console.log(setSubmitting, resetForm);
    console.log(values);
};


const CreateCoinPage = () => {
    return (
        <StyledPageContainer>
            <CustomHeader/>
            <StyledContainer>
                <SectionTitle
                    title={"Criar Cupom"} description="Preencha os campos abaixo para criar seu próprio Cupom."/>
                <CreateCoinForm/>
            </StyledContainer>
        </StyledPageContainer>
    );
};

const CreateCoinForm = () => {

    const [errorMessage, setErrorMessage] = useState("");
    
    const { push } = useRouter();
    
    const router = useRouter();
    const onSubmit = (
        currency: CurrencyCreation,
        {setSubmitting, resetForm}: FormikHelpers<CurrencyCreation>
    ) => {
    
        console.log(setSubmitting, resetForm);
        console.log(currency);
        setSubmitting(true);
        const currencyService = new CurrencyService();
        currencyService.createCurrency(currency)
            .then((_res: Currency) => {
                setSubmitting(false);
                resetForm();
                //router.push("currency-created");
                router.push("balances");
            })
            .catch((err: ServerError) => {
                setSubmitting(false);
                console.log("Erro interno!");
                setErrorMessage("Erro interno")
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik: FormikProps<CurrencyCreation>) => (
                <StyledForm onSubmit={formik.handleSubmit}>

                    <StyledFields>
                        <Field as={TextField}
                              key="acronym"
                              id="acronym"
                              name="acronym"
                              label="Sigla (umas três letras)" 
                              placeholder="MMD"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.acronym && Boolean(formik.errors.acronym)}
                              helperText={formik.touched.acronym && formik.errors.acronym}/> 

                        
                        <Field as={TextField}
                            key="baseDescription"
                            id="baseDescription"
                            name="baseDescription"
                            label="Nome"
                            placeholder="Nome"
                            className="form-field"
                            variant="outlined"
                            error={formik.touched.baseDescription && Boolean(formik.errors.baseDescription)}
                            helperText={formik.touched.baseDescription && formik.errors.baseDescription}/> 

                        <Field as={TextField}
                              key="hid"
                              id="hid"
                              name="hid"
                              label="Vale o quê? (título)"
                              placeholder="Vale o quê? (título)"
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
                               label="Como o usuário pode trocar este cupom"
                               placeholder='Como o usuário pode trocar este cupom'
                               className="form-field"
                               variant="outlined"
                               error={formik.touched.description && Boolean(formik.errors.description)}
                               helperText={formik.touched.description && formik.errors.description}/> 

                        <Field as={TextField}
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

                        <InputLabel id="demo-expiredAt-select-label">Prazo de validade</InputLabel>
                        <Field as={Select}
                        
                        labelId="demo-expiredAt-select-label"
                        value={formik.touched.expiredAt}
                        label="Prazo de validade (caso exista)"
                        name="expiredAt"
                        key="expiredAt"
                        id="expiredAt"
                        placeholder="Prazo de validade (caso exista)"
                        className="form-field"
                        variant="outlined"
                        error={formik.touched.expiredAt && Boolean(formik.errors.expiredAt)}
                        helperText={formik.touched.expiredAt && formik.errors.expiredAt}
                        onChange={(event: any)=>{formik.values.expiredAt = (event.target.value as unknown) as number || 0}}
                        defaultValue={"placeholder"}
                        >
                            <MenuItem disabled value={"placeholder"}>Caso exista</MenuItem>
                            <MenuItem value={1800000}>30 minutos</MenuItem>
                            <MenuItem value={3600000}>1 hora</MenuItem>
                            <MenuItem value={86400000}>1 dia</MenuItem>
                            <MenuItem value={432000000}>5 dias</MenuItem>
                            <MenuItem value={864000000}>10 dias</MenuItem>
                            <MenuItem value={2592000000}>30 dias</MenuItem>
                            <MenuItem value={5184000000}>60 dias</MenuItem>
                            <MenuItem value={7776000000}>90 dias</MenuItem>
                            <MenuItem value={23328000000}>1 ano</MenuItem>
                        </Field>
                        
                        <InputLabel id="demo-amount-select-label">Deseja criar quantos? (inicialmente)</InputLabel>
                        <Field as={Select}
                        
                        labelId="demo-amount-select-label"
                        value={formik.touched.amount}
                        label="Vai distribuir quantos? (inicialmente)"
                        name="amount"
                        key="amount"
                        id="amount"
                        placeholder="Vai distribuir quantos? (inicialmente)"
                        className="form-field"
                        variant="outlined"
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        onChange={(event: any)=>{formik.values.amount = (event.target.value as unknown) as number || 0}}
                        defaultValue={"placeholder"}
                        >
                            <MenuItem disabled value={"placeholder"}>Você não precisará distribuir todos</MenuItem>
                            <MenuItem value={100}>Cem</MenuItem>
                            <MenuItem value={1000}>Mil</MenuItem>
                            <MenuItem value={100000}>Cem mil</MenuItem>
                            <MenuItem value={1000000}>Um milhão</MenuItem>
                            <MenuItem value={100000000}>Cem milhões</MenuItem>
                            <MenuItem value={1000000000}>Um bilhão</MenuItem>
                        </Field>

                        
                        <InputLabel id="demo-amount-select-label">É permitido ficar com saldo negativo de cupons?</InputLabel>
                        <Field as={Select}
                        
                        labelId="demo-minAmount-select-label"
                        value={formik.touched.minAmount}
                        label="Limite mínimo de saldo por usuário?"
                        name="minAmount"
                        key="minAmount"
                        id="minAmount"
                        placeholder="Limite mínimo de saldo por usuário? (aceitar saldo negativo é útil para promover apostas valendo cumpons)"
                        className="form-field"
                        variant="outlined"
                        error={formik.touched.minAmount && Boolean(formik.errors.minAmount)}
                        helperText={formik.touched.minAmount && formik.errors.minAmount}
                        onChange={(event: any)=>{formik.values.minAmount = (event.target.value as unknown) as number || 1}}
                        defaultValue={"placeholder"}
                        >
                            <MenuItem disabled value={"placeholder"}>Saldo negativo é útil para promover apostas valendo cumpons</MenuItem>
                            <MenuItem value={0}>Não</MenuItem>
                            <MenuItem value={-1}>Sim, de menos um cupom</MenuItem>
                            <MenuItem value={-2}>Sim, de menos dois cupons</MenuItem>
                            <MenuItem value={-5}>Sim, de menos cinco cupons</MenuItem>
                            <MenuItem value={-10}>Sim, de menos dez cupons</MenuItem>
                            <MenuItem value={-200}>Sim, de menos duzentos cupons</MenuItem>
                            <MenuItem value={-1000000000}>Sim, e ilimitado</MenuItem>
                        </Field>

                    </StyledFields>

                    <CustomButton
                                    color="primary"
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    disabled={!(formik.isValid && formik.dirty)}
                                    loading={formik.isSubmitting}
                                >
                                    CONFIRMAR E PROSSEGUIR
                                </CustomButton>
                                    <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                                        <p>{errorMessage}</p>
                                    </Alert>
                </StyledForm>
            )}

        </Formik>
    );
}

export default CreateCoinPage;