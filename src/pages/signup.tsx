import SignupForm from "../containers/SignupForm";
import {useState} from "react";
import SocialLogin from "../containers/SocialLogin";
import Container from "@mui/material/Container";


const Signup = () => {

    const [showSignUpForm, setShowSignUpForm] = useState(true);

    return (
        <Container>
            {showSignUpForm ? <SignupForm/> : <SocialLogin setShowSignUpForm={setShowSignUpForm}/>}
        </Container>
    );
}

export default Signup;