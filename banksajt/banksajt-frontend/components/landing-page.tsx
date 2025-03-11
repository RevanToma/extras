"use client"
import Link from "next/link"
import { Button } from "./ui/button"


const LandingPage = () => {


    return (
        <>
            <h1 className="text-3xl font-bold">Welcome to the Bank</h1>

            <nav className="mt-4 flex gap-4">
                <Button asChild className="font-semibold text-xl">

                    <Link href="/sign-up">
                        Sign Up
                    </Link>
                </Button>
                <Button asChild variant='outline' className="font-semibold text-xl" >

                    <Link href="/sign-in">
                        Sign In
                    </Link>
                </Button>
            </nav>


        </>
    )
}
export default LandingPage;