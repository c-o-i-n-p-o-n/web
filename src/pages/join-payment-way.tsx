import {Autocomplete, Button, TextField, RadioGroup} from "@mui/material";
import Container from "@mui/material/Container";
import {styled} from "@mui/system";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as yup from 'yup';
import CustomHeader from "../containers/CustomHeader/CustomHeader";
import SectionTitle from "../containers/SectionTitle";
import { NumberFormatBase, NumberFormatValues, NumericFormat } from "react-number-format";
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
import PaymentWay, { paymentWayName } from "../models/PaymentWay";
import PaymentWayJoin from "../models/PaymentWayJoin";
import PaymentWayJoinCreation from "../models/PaymentWayJoinCreation";
import { PaymentWayJoinService } from "../services/PaymentWayJoinService";
import { PaymentWayService } from "../services/PaymentWayService";
import { Label, Radio } from "@mui/icons-material";

const StyledPageContainer = styled("div")({
    height: "100vh"
})

const StyledContainer = styled(Container)({
    height: "80vh"
})

const StyledForm = styled(Form)({
    height: "60vh",
    display: "flex",
    color: "green",
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

const paymentWayJoinService = new PaymentWayJoinService();
const paymentWayService = new PaymentWayService();

const CreatePaymentWayJoinPage = () => {


    
    const [errorMessage, setErrorMessage] = useState("");      
    const [successMessage, setSuccessMessage] = useState("");      
    const [paymentWayJoin, setPaymentWayJoin] = useState<PaymentWayJoin | undefined>(undefined);
    const [paymentWay, setPaymentWay] = useState<PaymentWay | undefined>(undefined);

    const { push } = useRouter();

    const [logged, setLogged] = useState<Boolean>(authService.isLogged);
    
    const { isLoading, error, data: bookmaker, isSuccess } = useQuery(['getBookmaker'], authService.getBookmaker);
    
    const loading = !!!paymentWayJoin;

    
    const { query } = useRouter();
    const paymentWayId = Number(query.paymentWayId)



    
    useEffect(() => {
        setLogged(authService.isLogged);
    }, [bookmaker]);

    if(!logged && !isLoading && (!!isSuccess || !!error)){
        push('/')
    }
    
    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
    
        if(!!paymentWay){
            paymentWayJoinService.getPaymentWayJoinByPaymentWayId(paymentWay.id).then((res)=>{
                console.log(res);
                setPaymentWayJoin(res)
            }).catch((erro)=>{
                if(!!setErrorMessage){
                    setErrorMessage(erro.message)
                }
            })
        }

        return () => {
            active = false;
        };
    }, [loading,paymentWay]);

    
    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }
    
        if(!!paymentWayId){
            paymentWayService.getPaymentWayById(paymentWayId).then((res)=>{
                console.log(res);
                setPaymentWay(res)
            }).catch((erro)=>{
                if(!!setErrorMessage){
                    setErrorMessage(erro.message)
                }
            })
        }

        return () => {
            active = false;
        };
    });


    useEffect(() => {
        setLogged(authService.isLogged);
    }, [bookmaker]);

    
    const onSubmit = (
        paymentWayJoinCreation: PaymentWayJoinCreation,
        {setSubmitting, resetForm}: FormikHelpers<PaymentWayJoinCreation>
    ) => {
    
        console.log(setSubmitting, resetForm);
        console.log(paymentWay);
        console.log(paymentWayJoin);
        console.log(paymentWayJoinCreation);
        if(!!!(paymentWayJoinCreation?.paymentWay)&&!!paymentWay){
            paymentWayJoinCreation.paymentWay = paymentWay;
        }
        setSubmitting(true);
        //const paymentWayService = new PaymentWayService();
        paymentWayJoinService.joinPaymentWay(paymentWayJoin,paymentWayJoinCreation)
            .then((_res: PaymentWayJoin) => {
                setSubmitting(false);
                //resetForm();
                
                setSuccessMessage("Meio de pagamento cadastrado")
                push({ pathname: "bookmaker-created", query: { bookmakerLocalId: bookmaker?.id }} );
            })
            .catch((err: ServerError) => {
                setSubmitting(false);
                console.log("Erro interno!");
                setErrorMessage("Erro interno")
            });
    };

    return (
        <StyledPageContainer>
            <CustomHeader/>
            <StyledContainer>
                <SectionTitle
                    title={"Meio de Recebimento Pix"} description="Associe sua conta a um meio de recebimento Pix para criar Vale Cupons, propostas de assinatura e outros produtos baseados em Cupons Fungíveis."/>
                <JoinPaymentWayForm
                    paymentWayJoin={paymentWayJoin}
                    paymentWay={paymentWay}
                    onSubmit={onSubmit}
                />
                
                <Alert type="error" show={!!errorMessage} closeAll={()=> setErrorMessage("")}>
                    <p>{errorMessage}</p>
                </Alert>
                <Alert type="success" show={!!successMessage} closeAll={()=> setSuccessMessage("")}>
                    <p>{successMessage}</p>
                </Alert>
            </StyledContainer>
        </StyledPageContainer>
    );
};

const authService = new AuthService();

const JoinPaymentWayForm = ({paymentWayJoin,paymentWay,onSubmit}: 
    {paymentWayJoin?:PaymentWayJoin,paymentWay?:PaymentWay,onSubmit:((values: PaymentWayJoinCreation, formikHelpers: FormikHelpers<PaymentWayJoinCreation>) => void | Promise<any>) & Function}) => {

    const paymentWayAux = paymentWayJoin?.paymentWays || paymentWay

    console.log(paymentWayJoin);
   
    const initialValues: PaymentWayJoinCreation = {
        id: paymentWayJoin?.id,
        paymentWay: paymentWayJoin?.paymentWays || paymentWay,
        main: paymentWayJoin?.main,
        phoneMessage: paymentWayJoin?.phoneMessage,
        financialKey: paymentWayJoin?.financialKey,
    };

    console.log(initialValues);

    const whatsappMask = (value?: string) => {
        
        return !!!value?value:(value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1)$2')
            .replace(/(\(\d{2}\))(\d)/, '$1 $2 ')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1'))
            
    }

    
    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>  ) => {
        
        e.target.value = whatsappMask( e.target.value ) || e.target.value;
    };
    console.log(!!(paymentWayJoin?.main));
    
    console.log(!!!(paymentWayJoin?.main));
    return (
        <Formik

            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik: FormikProps<PaymentWayJoinCreation>) => (
                <StyledForm onSubmit={formik.handleSubmit}>
                    <SectionTitle
                        title={"Cadastrando: " + paymentWayName(paymentWayAux?.provider)} 
                        description={""}
                    />
                
                    <StyledFields>
                        <InputLabel id="demo-expiredAt-select-label">É o meio de pagamento padrão?</InputLabel>
                        <InputLabel id="demo-expiredAt-select-label">
                        
                        Sim
                        {!!(paymentWayJoin?.main)?
                        <Field type="radio"  value="1" label="Sim" name="main"  checked/>:
                        <Field type="radio"  value="1" label="Sim" name="main"/>}
                        
                        </InputLabel>
                        <InputLabel id="demo-expiredAt-select-label">
                        
                        Não
                        {!!!(paymentWayJoin?.main)?
                        <Field type="radio" value="0" label="Não" name="main" checked/>:
                        <Field type="radio" value="0" label="Não" name="main"/>}
                        </InputLabel>
                        <br/>
                        
                        <InputLabel id="demo-financialKey-select-label">Chave Pix</InputLabel>
                        <Field as={TextField}
                            id="financialKey"
                            name="financialKey"
                            type="text"
                            // placeholder="Chave Pix"
                            // label="Chave Pix"
                            variant="standard"
                            className="form-field"
                            value={formik.values.financialKey || paymentWayJoin?.financialKey}
                            error={formik.touched.financialKey && Boolean(formik.errors.financialKey)}
                            helperText={formik.touched.financialKey && formik.errors.financialKey}
                        />
                        
                        
                        <InputLabel id="demo-financialKey-select-label">Whatsapp para confirmação</InputLabel>
                        <Field as={TextField}
                            id="phoneMessage"
                            name="phoneMessage"
                            type="text"
                            // placeholder="Whatsapp para confirmação"
                            // label="Whatsapp para confirmação"
                            variant="standard"
                            className="form-field"
                            onKeyUp={onTextChange}
                            value={whatsappMask(formik.values.phoneMessage) || whatsappMask(paymentWayJoin?.phoneMessage)}
                            error={formik.touched.phoneMessage && Boolean(formik.errors.phoneMessage)}
                            helperText={formik.touched.phoneMessage && formik.errors.phoneMessage}
                        />
                        
       
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
                </StyledForm>
            )}

        </Formik>
    );
}

export default CreatePaymentWayJoinPage;