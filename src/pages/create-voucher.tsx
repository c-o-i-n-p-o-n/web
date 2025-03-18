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
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from "next/router";
import { RowFlex } from "../styles/shared-styles";
import ServerError from "../models/ServerError";

import CustomButton from "../components/CustomButton";
import Alert from "../components/Alert/Alert";
import VoucherCreation from "../models/VoucherCreation";
import Voucher from "../models/Voucher";
import { VoucherService } from "../services/VoucherService";
import Currency from "../models/Currency";
import { CurrencyService } from "../services/CurrencyService";
import { useQuery } from "react-query";
import { AuthService } from "../services/AuthService";

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

const initialValues: VoucherCreation = {
    hid: "",
    description: "",
    vouchersType: 1,
    amountPerUser: 1,
    amount: 1
};

const CreateVoucherPage = () => {
    return (
        <StyledPageContainer>
            <CustomHeader/>
            <StyledContainer>
                <SectionTitle
                    title={"Criar Vale Cupom"} description="Este Vale Cupom é um lote de cupons dedicados a uma campanha e que passarão a poder ser distribuídos via link ou compartilhados via rede social."/>
                <CreateVoucherForm/>
            </StyledContainer>
        </StyledPageContainer>
    );
};

const authService = new AuthService();

const CreateVoucherForm = () => {

    const currencyService = new CurrencyService();
    const [errorMessage, setErrorMessage] = useState("");      
    const [openCurrency, setOpenCurrency] = React.useState(false);  
    const [currencyQueryStr, setCurrencyQueryStr] = React.useState('');
    const [currencies, setCurrencies] = useState<readonly Currency[]>([]);
    const loadingCurrency = openCurrency && currencies.length === 0;

    const router = useRouter();

    const [logged, setLogged] = useState<Boolean>(authService.isLogged);
    
    const { isLoading, error, data: user, isSuccess } = useQuery(['getUser'], authService.getUser);

    useEffect(() => {
        setLogged(authService.isLogged);
    }, [authService.isLogged, user]);

    if(!logged && !isLoading && (!!isSuccess || !!error)){
        router.push('login')
    }
    
    useEffect(() => {
        let active = true;
        if (!loadingCurrency) {
          return undefined;
        }
        const fetchCurrencies = async () => {
            setCurrencies(await currencyService.getCurrenciesWithFunds(currencyQueryStr));
            console.log(currencies);
        }

        fetchCurrencies().catch(console.log);
        return () => {
            active = false;
        };
    }, [loadingCurrency]);

    React.useEffect(() => {
      if (!openCurrency) {
        setCurrencies([]);
      }
    }, [openCurrency]);

    const createCoinHandler = () => {
        router.push('create-coin');
    }


    const onSubmit = (
        voucher: VoucherCreation,
        {setSubmitting, resetForm}: FormikHelpers<VoucherCreation>
    ) => {
    
        console.log(setSubmitting, resetForm);
        console.log(voucher);
        setSubmitting(true);
        const voucherService = new VoucherService();
        voucherService.createVoucher(voucher)
            .then((_res: Voucher) => {
                setSubmitting(false);
                resetForm();
                //router.push("voucher-created");
                router.push({ pathname: "voucher-created", query: { voucherId: _res.id }} );
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
            {(formik: FormikProps<VoucherCreation>) => (
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
                               label="Pegue dois cupons valendo um segundo shop grátis cada."
                               placeholder='Pegue dois cupons valendo um segundo shop grátis cada.'
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
                        label="Prazo de validade"
                        name="expiredAt"
                        key="expiredAt"
                        id="expiredAt"
                        placeholder="Prazo de validade"
                        className="form-field"
                        variant="outlined"
                        error={formik.touched.expiredAt && Boolean(formik.errors.expiredAt)}
                        helperText={formik.touched.expiredAt && formik.errors.expiredAt}
                        onChange={(event: any)=>{formik.values.expiredAt = (event.target.value as unknown) as number || 0}}
                        defaultValue={"placeholder"}
                        >
                            <MenuItem disabled value={"placeholder"}>Após a emissão, valerá por</MenuItem>
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
                        
                        <InputLabel id="demo-vouchersType-select-label">Ocultar da busca?</InputLabel>
                        <Field as={Select}
                        
                        labelId="demo-vouchersType-select-label"
                        value={formik.touched.amount}
                        label="Ocultar da busca?"
                        name="vouchersType"
                        key="vouchersType"
                        id="vouchersType"
                        placeholder="Ocultar da busca?"
                        className="form-field"
                        variant="outlined"
                        error={formik.touched.vouchersType && Boolean(formik.errors.vouchersType)}
                        helperText={formik.touched.vouchersType && formik.errors.vouchersType}
                        onChange={(event: any)=>{formik.values.vouchersType = (event.target.value as unknown) as number || 0}}
                        defaultValue={"placeholder"}
                        >
                            <MenuItem disabled value={"placeholder"}>Caso fique oculto, só poderá ser acessa com o link</MenuItem>
                            <MenuItem value={0}>Sim</MenuItem>
                            <MenuItem value={1}>Não</MenuItem>
                        </Field>

                        <RowFlex>
                        <Autocomplete
                            // multiple
                            options={currencies.map((option) => option.acronym)}
                            freeSolo
                            autoSelect
                            className="form-field"
                            style={{width: '100%'}}
                            open={openCurrency}
                            onOpen={() => {
                                setOpenCurrency(true);
                            }}
                            onClose={() => {
                                setOpenCurrency(false);
                            }}
                            loading={loadingCurrency}
                            onChange={(
                                event: React.SyntheticEvent,
                                value: any,
                                reason: AutocompleteChangeReason,
                                details?: AutocompleteChangeDetails<string>,
                            ) => {
                                console.log(details);
                                const option = details?.option;
                                setCurrencyQueryStr(option || '');
                                console.log(option);
                                let currencyAux = currencies.find(currency => currency.acronym === option);
                                console.log(currencyAux);
                                formik.values.currency = currencyAux || {id: undefined, acronym: option || "", description: option || ""};
                            }}
                            renderInput={(params) => {
                                console.log(params);
                                return (
                                


                                
                                <Field as={TextField}
                                {...params}
                                label="Vale que cupom?"
                                name="currency"
                                key="currency"
                                id="currency"
                                placeholder="Vale que cupom?"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.currency && Boolean(formik.errors.currency)}
                              helperText={formik.touched.currency && formik.errors.currency}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                    {loadingCurrency ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                                }}/> 
                            )}}
                        />
                        <StyledButton onClick={createCoinHandler}>{"Crie seu cupom +"}</StyledButton>
                        </RowFlex>
                        
                        <InputLabel id="demo-amount-select-label">Pretende disponibilizar quantos cupons neste vale?</InputLabel>
                        <Field as={Select}
                        
                        labelId="demo-amount-select-label"
                        value={formik.touched.amount}
                        label="Pretende disponibilizar quantos cupons neste vale?"
                        name="amount"
                        key="amount"
                        id="amount"
                        placeholder="Pretende disponibilizar quantos cupons neste vale?"
                        className="form-field"
                        variant="outlined"
                        error={formik.touched.amount && Boolean(formik.errors.amount)}
                        helperText={formik.touched.amount && formik.errors.amount}
                        onChange={(event: any)=>{formik.values.amount = (event.target.value as unknown) as number || 1}}
                        defaultValue={"placeholder"}
                        >
                            <MenuItem disabled value={"placeholder"}>Quando esgotar-se, não terá mais efeito</MenuItem>
                            <MenuItem value={1}>1 cupom</MenuItem>
                            <MenuItem value={2}>2 cupons</MenuItem>
                            <MenuItem value={5}>5 cupons</MenuItem>
                            <MenuItem value={10}>10 cupons</MenuItem>
                            <MenuItem value={20}>20 cupons</MenuItem>
                            <MenuItem value={50}>50 cupons</MenuItem>
                            <MenuItem value={100}>100 cupons</MenuItem>
                            <MenuItem value={200}>200 cupons</MenuItem>
                            <MenuItem value={500}>500 cupons</MenuItem>
                            <MenuItem value={1000}>1.000 cupons</MenuItem>
                            <MenuItem value={10000}>10.000 cupons</MenuItem>
                        </Field>
                        
                        <InputLabel id="demo-amountPerUser-select-label">Cada vale dá direito a quantos cupons?</InputLabel>
                        <Field as={Select}
                        
                        labelId="demo-amountPerUser-select-label"
                        value={formik.touched.amountPerUser}
                        label="Cada vale dá direito a quantos cupons?"
                        name="amountPerUser"
                        key="amountPerUser"
                        id="amountPerUser"
                        placeholder="Cada vale dá direito a quantos cupons?"
                        className="form-field"
                        variant="outlined"
                        error={formik.touched.amountPerUser && Boolean(formik.errors.amountPerUser)}
                        helperText={formik.touched.amountPerUser && formik.errors.amountPerUser}
                        onChange={(event: any)=>{formik.values.amountPerUser = (event.target.value as unknown) as number || 1}}
                        defaultValue={"placeholder"}
                        >
                            <MenuItem disabled value={"placeholder"}>Transferir</MenuItem>
                            <MenuItem value={1}>1 cupom por usuário</MenuItem>
                            <MenuItem value={2}>2 cupons por usuário</MenuItem>
                            <MenuItem value={5}>5 cupons por usuário</MenuItem>
                            <MenuItem value={10}>10 cupons por usuário</MenuItem>
                            <MenuItem value={20}>20 cupons por usuário</MenuItem>
                            <MenuItem value={50}>50 cupons por usuário</MenuItem>
                            <MenuItem value={100}>100 cupons por usuário</MenuItem>
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

export default CreateVoucherPage;