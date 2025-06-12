import {Autocomplete, Button, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import {styled} from "@mui/system";
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import * as yup from 'yup';
//import CustomHeader from "../components/CustomHeader";
//import SectionTitle from "../components/SectionTitle";
import * as React from "react";
import {useEffect, useState} from "react";
import {AutocompleteChangeDetails, AutocompleteChangeReason} from "@mui/base/AutocompleteUnstyled/useAutocomplete";
import Category from "../models/Category";
import {BetService} from "../services/BetService";

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

const initialValues: BetCreation = {
    categories: [],
};

interface BetCreation {
    categories: Category[];
}

const onSubmit = (
    values: any,
    {setSubmitting, resetForm}: FormikHelpers<BetCreation>
) => {

    console.log(setSubmitting, resetForm);
    console.log(values);
};


const CreateBetPage = () => {
    return (
        <StyledPageContainer>
            {/* <CustomHeader/>
            <StyledContainer>
                <SectionTitle
                    title={"Criar Matches"} description="Preencha os campos abaixo para criar sua aposta."/>
                <CreateBetForm/>
            </StyledContainer> */}
        </StyledPageContainer>
    );
};

const CreateBetForm = () => {

    const betService = new BetService();

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            //setCategories(await betService.getCategories());
            console.log(categories);
        }

        fetchCategories().catch(console.log);
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik: FormikProps<BetCreation>) => (
                <StyledForm onSubmit={formik.handleSubmit}>

                    <StyledFields>
                        {/*<Field as={TextField}*/}
                        {/*    key="category"*/}
                        {/*    id="category"*/}
                        {/*    name="category"*/}
                        {/*    label="Categoria"*/}
                        {/*    placeholder="Escolha uma categoria"*/}
                        {/*    className="form-field"*/}
                        {/*    variant="outlined"*/}
                        {/*    error={formik.touched.category && Boolean(formik.errors.category)}*/}
                        {/*    helperText={formik.touched.category && formik.errors.category} />*/}

                        <Autocomplete
                            multiple
                            options={categories.map((option) => option.hid)}
                            freeSolo
                            autoSelect
                            className="form-field"
                            onChange={(
                                event: React.SyntheticEvent,
                                value: any,
                                reason: AutocompleteChangeReason,
                                details?: AutocompleteChangeDetails<string>,
                            ) => {
                                const option = details?.option;
                                let category = categories.find(category => category.hid === option);
                                console.log(category);
                                formik.values.categories.push(category || {id: undefined, hid: option || ""});
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Categoria"
                                    placeholder="Escolha uma categoria"
                                    key="category"
                                    // id={`category.${params.id}`}
                                />
                            )}
                        />


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


                    <Button type="submit" variant="contained">CONFIRMAR E PROSSEGUIR</Button>

                </StyledForm>
            )}

        </Formik>
    );
}

export default CreateBetPage;