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
import Category from "../models/Category";
import {CategoryService} from "../services/CategoryService";
import {EventService} from "../services/EventService";
import CircularProgress from '@mui/material/CircularProgress';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { useRouter } from "next/router";
import { RowFlex } from "../styles/shared-styles";
import Currency from "../models/Currency";
import { CurrencyService } from "../services/CurrencyService";
import ServerError from "../models/ServerError";
import EventCreation from "../models/EventCreation";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import CustomButton from "../components/CustomButton";
import Alert from "../components/Alert/Alert";

import { NumericFormat,NumericFormatProps } from "react-number-format";
import Event from "../models/Event";

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
    ".duration-expired": {
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
        .required("O primeiro título é obrigatório."),
    hid2: yup
        .string()
        .required("Inclua ao menos mais um título."),
    description: yup
        .string()
        .required("Descrição é obrigatória."),
    beginningAt: yup
        .date()
        .required("A data e hora do evento é obrigatória."),
    duration: yup
        .number()
        .positive()
        .required("A duração do evento é obrigatória."),
    categories: yup
        .array().nullable().test(
            'not-null',
            'Selecione uma categoria válida.',
            category => {
                console.log(category)
                return !!category
            }
        )
        .required("Selecione ao menos uma categoria.")});

const initialValues: EventCreation = {
    hid: ""
};

// interface EventCreation {
//     hid: string;
//     description?: string;
//     visibility: number;
//     duration?: number;
//     category?: Event;
//     currency?: Currency;
//     maxAmmount?: number;
// }




const CreateEventPage = () => {
    return (
        <StyledPageContainer>
            <CustomHeader/>
            <StyledContainer>
                <SectionTitle
                    title={"Criar evento"} description="partida esportiva, eleição, sorteio, promoção, etc"/>
                <CreateEventForm/>
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

const CreateEventForm = () => {

    const categoryService = new CategoryService();
    const currencyService = new CurrencyService();
    const [openCategory, setOpenCategory] = React.useState(false);
    const [categoryQueryStr, setCategoryQueryStr] = React.useState('');
    const [openCurrency, setOpenCurrency] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currencyQueryStr, setCurrencyQueryStr] = React.useState('');
    //const [visibility, setVisibility] = React.useState(0);
    const [categories, setCategories] = useState<readonly Category[]>([]);
    const [allCategories, setAllCategories] = useState<readonly Category[]>([]);
    const loadingCategory = openCategory && categories.length === 0;
    const { push } = useRouter();

    useEffect(() => {
        let active = true;
        if (!loadingCategory) {
          return undefined;
        }
        const fetchCategories = async () => {
            setCategories(await categoryService.getCategories(categoryQueryStr));
            console.log(categories);
        }

        fetchCategories().catch(console.log);
        return () => {
            active = false;
        };
    });//, [loadingCategory]);

    React.useEffect(() => {
      if (!openCategory) {
        setCategories([]);
      }
    }, [openCategory]);


    const createCategoryHandler = () => {
        push('create-category');
    }

    const router = useRouter();

    const onSubmit = (
        event: EventCreation,
        {setSubmitting, resetForm}: FormikHelpers<EventCreation>
    ) => {
    
        console.log(setSubmitting, resetForm);
        console.log(event);
        setSubmitting(true);
        const eventService = new EventService();
        eventService.createEvent(event)
            .then((_res: Event) => {
                setSubmitting(false);
                resetForm();
                router.push("event-created");
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
            {(formik: FormikProps<EventCreation>) => (
                <StyledForm onSubmit={formik.handleSubmit}>

                    <StyledFields>
                        <RowFlex>
                        <Autocomplete
                            multiple
                            options={categories.map((option) => option.hid)}
                            getOptionLabel={(option) => {
                                console.log(option);
                                return option;
                            }}
                            freeSolo
                            autoSelect
                            className="form-field"
                            style={{width: '100%'}}
                            open={openCategory}
                            onOpen={() => {
                                setOpenCategory(true);
                            }}
                            onClose={() => {
                                setOpenCategory(false);
                            }}
                            loading={loadingCategory}
                            onKeyUpCapture={(params)=>{
                                console.log(params);
                                const key = params?.key;
                                console.log(key);

                                if(!!!categories.find(category => category.description?.includes(key) || category.hid?.includes(key))){
                                    setCategoryQueryStr(key);
                                }
                            }}
                            onChange={(
                                event: React.SyntheticEvent,
                                value: any,
                                reason: AutocompleteChangeReason,
                                details?: AutocompleteChangeDetails<string>,
                            ) => {
                                console.log(details);
                                console.log(value);
                                const option = details?.option;
                                //setCategoryQueryStr(option || '');
                                console.log(option);
                                let categoryAux = categories.find(category => category.description === option || category.hid === option);
                                console.log(categoryAux);
                                //if(!!categoryAux){
                                //    setCategoryQueryStr(option || '');
                                //}
                                let categoriesAux:Category[] | undefined = []//formik.values.categories
                                //if(!categoriesAux){
                                //    categoriesAux = [];
                                //}
                                //console.log(categoriesAux);
                                console.log(categoryAux);
                                if(!!categoryAux) {
                                    categoriesAux = categoriesAux.concat(allCategories, [categoryAux]);
                                    console.log(categoriesAux);
                                    formik.values.categories = categoriesAux;
                                    setAllCategories(categoriesAux);
                                }else{
                                    console.log(categoriesAux);
                                }
                                
                            }}
                            renderInput={(params) => {
                                console.log(params);
                                return (
                                

                                <Field as={TextField}
                                {...params}
                                label="Categoria"
                                name="categories"
                                key="categories"
                                id="categories"
                              placeholder="Escolha uma categoria"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.categories && Boolean(formik.errors.categories)}
                              helperText={formik.touched.categories && formik.errors.categories}
                              InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                    {loadingCategory ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                                }}/> 
                            )}}
                        />
                        <StyledButton onClick={createCategoryHandler}>{"+"}</StyledButton>
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
                              key="hid2"
                              id="hid2"
                              name="hid2"
                              label="Título auxiliar da aposta"
                              placeholder="Título auxiliar da aposta"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.hid2 && Boolean(formik.errors.hid2)}
                              helperText={formik.touched.hid2 && formik.errors.hid2}/> 
                              
                        <Field as={TextField}
                              key="hid3"
                              id="hid3"
                              name="hid3"
                              label="Segundo título auxiliar da aposta"
                              placeholder="Segundo título auxiliar da aposta"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.hid3 && Boolean(formik.errors.hid3)}
                              helperText={formik.touched.hid3 && formik.errors.hid3}/> 
                              
                        <Field as={TextField}
                              key="hid4"
                              id="hid4"
                              name="hid4"
                              label="Terceiro título auxiliar da aposta"
                              placeholder="Terceiro título auxiliar da aposta"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.hid4 && Boolean(formik.errors.hid4)}
                              helperText={formik.touched.hid4 && formik.errors.hid4}/> 
                              
                        <Field as={TextField}
                              key="hid5"
                              id="hid5"
                              name="hid5"
                              label="Quarto título auxiliar da apostaa"
                              placeholder="Quarto título auxiliar da aposta"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.hid5 && Boolean(formik.errors.hid5)}
                              helperText={formik.touched.hid5 && formik.errors.hid5}/> 
                              

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

                               

                        <Field as={TextField}
                              key="photo"
                              id="photo"
                              name="photo"
                              label="Imagem (URL)"
                              placeholder="https://drive.google.com/file/d/..."
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.photo && Boolean(formik.errors.photo)}
                              helperText={formik.touched.photo && formik.errors.photo}/> 

                        <div className="duration-expired">

                            <StyledFields>
                                <InputLabel id="demo-duration-select-label">Duração do evento</InputLabel>
                                <Field as={Select}
                                
                                labelId="demo-duration-select-label"
                                value={formik.touched.duration}
                                label="Duração do evento"
                                name="duration"
                                key="duration"
                                id="duration"
                                placeholder="Duração do evento"
                              className="form-field"
                              variant="outlined"
                              error={formik.touched.duration && Boolean(formik.errors.duration)}
                              helperText={formik.touched.duration && formik.errors.duration}
                              onChange={(event: any)=>{formik.values.duration = (event.target.value as unknown) as number || 0}}

                                >
                                    <MenuItem value={60000}>1 minuto</MenuItem>
                                    <MenuItem value={600000}>10 minutos</MenuItem>
                                    <MenuItem value={1800000}>30 minutos</MenuItem>
                                    <MenuItem value={3600000}>1 hora</MenuItem>
                                    <MenuItem value={86400000}>1 dia</MenuItem>
                                </Field>
                            </StyledFields>

                            
                            <StyledFields>
                            <InputLabel id="demo-beginningAt-select-label">Data do evento</InputLabel>

                            <LocalizationProvider dateAdapter={AdapterDateFns} 
                                    labelId="demo-beginningAt-select-label">
                                
                                <DateTimePicker<Date>
                                    value={formik.values.beginningAt || null}
                                    // label="Data do evento"
                                    onChange={(newValue: Date | null, _keyboardInputValue?: string | undefined) => {
                                        formik.setValues({ ...formik.values, beginningAt: newValue! });
                                    }}
                                    inputFormat="dd/MM/yyyy HH:mm"
                                    renderInput={(params) =>
                                        <Field as={TextField}
                                            id="beginningAt"
                                            name="beginningAt"
                                            variant="outlined"
                                            placeholder="dd/mm/yyyy HH:MM"
                                            className="form-field"
                                            {...params}
                                            error={formik.touched.beginningAt && Boolean(formik.errors.beginningAt)} />}
                                />
                            </LocalizationProvider></StyledFields>
                        </div>


                        {/*<Field as={TextField}*/}
                        {/*       key="categories"*/}
                        {/*       id="categories"*/}
                        {/*       name="categories"*/}
                        {/*       label="Categorias"*/}
                        {/*       placeholder="Escolha um categoria"*/}
                        {/*       className="form-field"*/}
                        {/*       variant="outlined"*/}
                        {/*       error={formik.touched.description && Boolean(formik.errors.description)}*/}
                        {/*       helperText={formik.touched.description && formik.errors.description}/>*/}

                        {/*<Field as={TextField}*/}
                        {/*       key="event"*/}
                        {/*       id="event"*/}
                        {/*       name="event"*/}
                        {/*       label="Event"*/}
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

export default CreateEventPage;