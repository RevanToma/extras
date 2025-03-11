import { Metadata } from "next";
import SignInForm from "./sign-in-form";



export const metaData: Metadata = {
    title: 'Sign In'
}

const SignInPage = () => {


    return <div>
        <h1>Sign In PAge</h1>
        <SignInForm />
    </div>
}
export default SignInPage;