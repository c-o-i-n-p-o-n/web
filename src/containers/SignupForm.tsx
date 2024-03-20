import styled from "@emotion/styled";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import * as yup from 'yup';

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import UserCreation from "../models/UserCreation";

import CircularProgress from '@mui/material/CircularProgress';
import RegisterLogo from "./RegisterLogo";
import { UserService } from "../services/UserService";
import { User } from "../models/User";
import ServerError from "../models/ServerError";
import { useRouter } from "next/router";
import CustomButton from "../components/CustomButton";

const SignupForm = () => {

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required("Nome obrigatório."),
        lastName: yup
            .string()
            .required("Sobrenome obrigatório."),
        cpf: yup
            .string()
            .required("CPF obrigatório.")
            .test("cpf-test", "CPF inválido", (_value) => true),
        birthDate: yup
            .date()
            .required("Data de nascimento obrigatória."),
        email: yup
            .string()
            .email()
            .required("email obrigatório."),
        password: yup
            .string()
            .required("password obrigatório."),
        acceptedTerms: yup
            .boolean()
            .isTrue()
            .required()
    });

    const initialValues: UserCreation = {
        firstName: "",
        lastName: "",
        cpf: "",
        birthDate: new Date(),
        email: "",
        password: "",
        acceptedTerms: false
    };

    const StyledForm = styled(Form)({
        display: "flex",
        flexDirection: "column",
        ".cpf-birthDate": {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            "& > *": {
                width: "49%"
            }
        },
        ".form-field": {
            margin: "1vh 0"
        },
        ".submit-button-terms": {
            margin: "2vh 0",
        }
    })

    const StyledContainer = styled("div")({
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    })

    const StyledPageContainer = styled(Container)({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "75vh"
    })

    const router = useRouter();

    const onSubmit = (
        user: UserCreation,
        { setSubmitting, resetForm }: FormikHelpers<UserCreation>
    ) => {
        setSubmitting(true);
        const userService = new UserService();
        userService.createUser(user)
            .then((_res: User) => {
                setSubmitting(false);
                resetForm();
                router.push("/");
            })
            .catch((err: ServerError) => {
                setSubmitting(false);
            });

    };

    const cpfMask = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }

    return (
        <StyledContainer>
            <StyledPageContainer>
                <RegisterLogo />

                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {(formik: FormikProps<UserCreation>) => (
                            <StyledForm onSubmit={formik.handleSubmit}>
                                <Field as={TextField}
                                    key="firstName"
                                    id="firstName"
                                    name="firstName"
                                    label="Nome"
                                    placeholder="Nome"
                                    className="form-field"
                                    variant="standard"
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName} />

                                <Field as={TextField}
                                    key="lastName"
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Sobrenome"
                                    label="Sobrenome"
                                    className="form-field"
                                    variant="standard"
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />

                                <div className="cpf-birthDate">
                                    <Field as={TextField}
                                        id="cpf"
                                        name="cpf"
                                        type="text"
                                        placeholder="CPF"
                                        label="CPF"
                                        variant="standard"
                                        className="form-field"
                                        value={cpfMask(formik.values.cpf)}
                                        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
                                        helperText={formik.touched.cpf && formik.errors.cpf}
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker<Date>
                                            value={formik.values.birthDate}
                                            label="Data de nascimento"
                                            onChange={(newValue: Date | null, _keyboardInputValue?: string | undefined) => {
                                                formik.setValues({ ...formik.values, birthDate: newValue! });
                                            }}
                                            renderInput={(params) =>
                                                <Field as={TextField}
                                                    id="birthDate"
                                                    name="birthDate"
                                                    variant="standard"
                                                    placeholder="dd/mm/yyyy"
                                                    className="form-field"
                                                    {...params}
                                                    error={formik.touched.birthDate && Boolean(formik.errors.birthDate)} />}
                                        />
                                    </LocalizationProvider>
                                </div>

                                <Field as={TextField}
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email"
                                    label="Email"
                                    className="form-field"
                                    variant="standard"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <Field as={TextField}
                                    id="password"
                                    name="password"
                                    type="text"
                                    placeholder="Senha"
                                    label="Senha"
                                    className="form-field"
                                    variant="standard"
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />

                                <FormControlLabel
                                    value="end"
                                    className="submit-button-terms"
                                    control={<Checkbox id="acceptedTerms" onChange={formik.handleChange} />}
                                    sx={{
                                        color: "#4A4A4A"
                                    }}
                                    label="Li e aceito os Termos e Condições de Uso e a Política de Privacidade. "
                                    labelPlacement="end"
                                />

                                <CustomButton
                                    color="primary"
                                    variant="contained"
                                    // className="submit-button-terms"
                                    fullWidth
                                    type="submit"
                                    disabled={!(formik.isValid && formik.dirty)}
                                    loading={formik.isSubmitting}
                                >
                                    CADASTRAR
                                </CustomButton>
                            </StyledForm>
                        )}
                    </Formik>
                </div>
            </StyledPageContainer>
        </StyledContainer>
    )
}

export default SignupForm;