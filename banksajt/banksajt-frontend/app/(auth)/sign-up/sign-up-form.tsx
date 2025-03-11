"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();


    // handle sin in if successfull route to home page
    const handleSignIn = async () => {
        await createUser(username, password);
        router.push("/");
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-bold">Sign Up</h2>
            <input
                type="text"
                placeholder="Username"
                className="border p-2 mt-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleSignIn} className="cursor-pointer">
                Sign Up
            </Button>
        </div>
    );
}
export default SignUpForm
