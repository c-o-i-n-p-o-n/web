import {Autocomplete, Button, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {styled} from "@mui/system";
import {Field, Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as yup from 'yup';
import CustomHeader from "../containers/CustomHeader/CustomHeader";
import SectionTitle from "../containers/SectionTitle";
import * as React from "react";
import {useEffect, useState} from "react";
import { useQuery } from "react-query";
import {AutocompleteChangeDetails, AutocompleteChangeReason} from "@mui/base/AutocompleteUnstyled/useAutocomplete";
import Event from "../models/Event";
import {EventService} from "../services/EventService";
import {MatchService} from "../services/MatchService";
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from "next/router";
import { RowFlex } from "../styles/shared-styles";
import Currency from "../models/Currency";
import { CurrencyService } from "../services/CurrencyService";
import ServerError from "../models/ServerError";
import {MatchCreation} from "../models/MatchCreation";

import CustomButton from "../components/CustomButton";
import Alert from "../components/Alert/Alert";

import { NumericFormat,NumericFormatProps } from "react-number-format";
import Match from "../models/Match";
import { AuthService } from "../services/AuthService";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }

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
    ".visibility-expired": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "& > *": {
            width: "49%"
        }
    },
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

const validationSchema = yup.object({
    hid: yup
        .string()
        .required("Título obrigatório."),
    description: yup
        .string()
        .required("Descrição é obrigatória."),
    visibility: yup
        .number()
        .oneOf([0, 1, 2])
        .required("Visibilidade obrigatória."),
    expiredAt: yup
        .number()
        .positive(),
    event: yup
        .object().nullable().test(
            'not-null',
            'Selecione um evento válido.',
            event => !!event,
        )
        .required("Selecione um evento."),
    currency: yup
        .object().nullable().test(
            'not-null',
            'Selecione uma moeda válida.',
            currency => !!currency,
        )
        .required("Selecione uma moeda.")});

const initialValues: MatchCreation = {
    hid: "",
    visibility: 0
};

// interface MatchCreation {
//     hid: string;
//     description?: string;
//     visibility: number;
//     expiredAt?: number;
//     event?: Event;
//     currency?: Currency;
//     maxAmmount?: number;
// }




const CreateMatchPage = () => {
    return (
        <StyledPageContainer>
            <CustomHeader/>
            <StyledContainer>
                <SectionTitle
                    title={"Criar aposta"} description=""/>
                <CreateMatchForm/>
            </StyledContainer>
        </StyledPageContainer>
    );
};

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;
  
      return (
        <NumericFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values: any) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            });
          }}
          thousandSeparator
          valueIsNumericString
          prefix="$"
        />
      );
    },
);

const authService = new AuthService();

const CreateMatchForm = () => {

    const eventService = new EventService();
    const currencyService = new CurrencyService();
    const [openEvent, setOpenEvent] = React.useState(false);
    const [eventQueryStr, setEventQueryStr] = React.useState('');
    const [openCurrency, setOpenCurrency] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currencyQueryStr, setCurrencyQueryStr] = React.useState('');
    //const [visibility, setVisibility] = React.useState(0);
    const [events, setEvents] = useState<readonly Event[]>([]);
    const [currencies, setCurrencies] = useState<readonly Currency[]>([]);
    const loadingEvent = openEvent && events.length === 0;
    const loadingCurrency = openCurrency && currencies.length === 0;
    const { push } = useRouter();

    const [logged, setLogged] = useState<Boolean>(authService.isLogged);

    //push('login');
    
    const { isLoading, error, data: user, isSuccess } = useQuery(['getUser'], authService.getUser);

    useEffect(() => {
        setLogged(authService.isLogged);
    }, [user]);

    if(!logged && !isLoading && (!!isSuccess || !!error)){
        //push('login')
        push('/')
    }

    useEffect(() => {
        let active = true;
        if (!loadingEvent) {
          return undefined;
        }
        const fetchEvents = async () => {
            setEvents(await eventService.getEvents(eventQueryStr));
            console.log(events);
        }

        fetchEvents().catch(console.log);
        return () => {
            active = false;
        };
    });//, [loadingEvent]);
    
    useEffect(() => {
        let active = true;
        if (!loadingCurrency) {
          return undefined;
        }
        const fetchCurrencies = async () => {
            setCurrencies(await currencyService.getCurrenciesByQuery(currencyQueryStr));
            console.log(currencies);
        }

        fetchCurrencies().catch(console.log);
        return () => {
            active = false;
        };
    });//, [loadingCurrency]);

    React.useEffect(() => {
      if (!openEvent) {
        setEvents([]);
      }
    }, [openEvent]);

    React.useEffect(() => {
      if (!openCurrency) {
        setCurrencies([]);
      }
    }, [openCurrency]);


    const createEventHandler = () => {
        push('create-event');
    }

    const createCoinHandler = () => {
        push('create-coin');
    }

    const router = useRouter();

    const onSubmit = (
        match: MatchCreation,
        {setSubmitting, resetForm}: FormikHelpers<MatchCreation>
    ) => {
    
        console.log(setSubmitting, resetForm);
        console.log(match);
        setSubmitting(true);
        const matchService = new MatchService();
        matchService.createMatch(match)
            .then((_res: Match) => {
                setSubmitting(false);
                resetForm();
                router.push({ pathname: "match-created", query: { matchId: _res.id }} );
            })
            .catch((err: ServerError) => {
                setSubmitting(false);
                console.log("Erro interno");
                setErrorMessage("Erro interno")
            });
    };


    return (
       
       
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik: FormikProps<MatchCreation>) => (
                <StyledForm onSubmit={formik.handleSubmit}>

                    <StyledFields>
                        {/*<Field as={TextField}*/}
                        {/*    key="event"*/}
                        {/*    id="event"*/}
                        {/*    name="event"*/}
                        {/*    label="Categoria"*/}
                        {/*    placeholder="Escolha uma categoria"*/}
                        {/*    className="form-field"*/}
                        {/*    variant="outlined"*/}
                        {/*    error={formik.touched.event && Boolean(formik.errors.event)}*/}
                        {/*    helperText={formik.touched.event && formik.errors.event} />*/}
                        <RowFlex>
                        <Autocomplete
                            // multiple
                            options={events.map((option) => option.hid)}
                            freeSolo
                            autoSelect
                            className="form-field"
                            style={{width: '100%'}}
                            open={openEvent}
                            onOpen={() => {
                                setOpenEvent(true);
                            }}
                            onClose={() => {
                                setOpenEvent(false);
                            }}
                            loading={loadingEvent}
                            onChange={(
                                event: React.SyntheticEvent,
                                value: any,
                                reason: AutocompleteChangeReason,
                                details?: AutocompleteChangeDetails<string>,
                            ) => {
                                console.log(details);
                                const option = details?.option;
                                setEventQueryStr(option || '');
                                console.log(option);
                                let eventAux = events.find(event => event.description === option || event.hid === option);
                                console.log(eventAux);
                                formik.values.event = eventAux || {id: undefined, hid: option || ""};
                            }}
                            renderInput={(params) => {
                                console.log(params);
                                return (
                                

                                <Field as={TextField}
                                {...params}
                                label="Evento"
                                name="event"
                                key="event"
                                id="event"
                              placeholder="Escolha um evento"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.event && Boolean(formik.errors.event)}
                              helperText={formik.touched.event && formik.errors.event}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                    {loadingEvent ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                                }}/> 
                            )}}
                        />
                        <StyledButton onClick={createEventHandler}>{"+"}</StyledButton>
                        </RowFlex>
                        <Field as={TextField}
                              key="hid"
                              id="hid"
                              name="hid"
                              label="Título da aposta"
                              placeholder="Título da aposta"
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
                               placeholder="Descrição da aposta"
                               className="form-field"
                               variant="outlined"
                               error={formik.touched.description && Boolean(formik.errors.description)}
                               helperText={formik.touched.description && formik.errors.description}/> 
                        <div className="visibility-expired">
                            <StyledFields>
                                <InputLabel id="demo-simple-select-label">Visibilidade</InputLabel>
                                

                                
                                <Field as={Select}
                                
                                labelId="demo-simple-select-label"
                                value={formik.touched.visibility}
                                label="Visibilidade"
                                name="visibility"
                                key="visibility"
                                id="visibility"
                                placeholder="Visibilidade"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.visibility && Boolean(formik.errors.visibility)}
                              helperText={formik.touched.visibility && formik.errors.visibility}
                              onChange={(event: any)=>{formik.values.visibility = (event.target.value as unknown) as number || 0}}
                                >
                                <MenuItem value={0}>Todos</MenuItem>
                                <MenuItem value={1}>Apenas copiando e colando ou QRCode</MenuItem>
                                <MenuItem value={2}>Apenas eu (por enquanto)</MenuItem>
                                </Field>



                            </StyledFields>
                            <StyledFields>
                                <InputLabel id="demo-expiredAt-select-label">Encerrar antes do evento</InputLabel>
                                <Field as={Select}
                                
                                labelId="demo-expiredAt-select-label"
                                value={formik.touched.expiredAt}
                                label="Encerrar antes do Evento"
                                name="expiredAt"
                                key="expiredAt"
                                id="expiredAt"
                                placeholder="Encerrar antes do Evento"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.expiredAt && Boolean(formik.errors.expiredAt)}
                              helperText={formik.touched.expiredAt && formik.errors.expiredAt}
                              onChange={(event: any)=>{formik.values.expiredAt = (event.target.value as unknown) as number || 0}}

                                >
                                    <MenuItem value={60000}>1 minuto antes</MenuItem>
                                    <MenuItem value={600000}>10 minutos antes</MenuItem>
                                    <MenuItem value={1800000}>30 minutos antes</MenuItem>
                                    <MenuItem value={3600000}>1 hora antes</MenuItem>
                                    <MenuItem value={86400000}>1 dia antes</MenuItem>
                                </Field>
                            </StyledFields>
                        </div>
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


                        {/*<Field as={TextField}*/}
                        {/*       key="event"*/}
                        {/*       id="event"*/}
                        {/*       name="event"*/}
                        {/*       label="Evento"*/}
                        {/*       placeholder="Escolha um evento"*/}
                        {/*       className="form-field"*/}
                        {/*       variant="outlined"*/}
                        {/*       error={formik.touched.description && Boolean(formik.errors.description)}*/}
                        {/*       helperText={formik.touched.description && formik.errors.description}/>*/}

                        {/*<Field as={TextField}*/}
                        {/*       key="match"*/}
                        {/*       id="match"*/}
                        {/*       name="match"*/}
                        {/*       label="Match"*/}
                        {/*       placeholder="ex: ambos marcam"*/}
                        {/*       className="form-field"*/}
                        {/*       variant="outlined"*/}
                        {/*       error={formik.touched.description && Boolean(formik.errors.description)}*/}
                        {/*       helperText={formik.touched.description && formik.errors.description}/>*/}
                    </StyledFields>


                    {/* <Button type="submit" variant="contained">CONFIRMAR E PROSSEGUIR</Button> */}

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

export default CreateMatchPage;