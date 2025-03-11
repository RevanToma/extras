import { Metadata } from "next";
import SignUpForm from "./sign-up-form";


export const metaData: Metadata = {
    title: 'Sign Up'
}


const SignUpPage = () => {


    return <div>
        <h1>Sign Up Page</h1>
        <SignUpForm />
    </div>
}
export default SignUpPage;