"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";

const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        await loginUser(username, password);
        // router.push("/me/accounts");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-bold">Login</h2>
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
            <Button onClick={handleLogin} className="mt-4 px-4 py-2">
                Login
            </Button>
        </div>
    );
}

export default SignInForm;