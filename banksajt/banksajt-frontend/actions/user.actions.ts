"use server"

import axios from "axios";



export const createUser = async (username: string, password: string) => {
    try {
        const response = await axios.post("http://localhost:3001/users", {
            username,
            password,
        });

        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
};


export const loginUser = async (username: string, password: string) => {
    const response = await axios.post("http://localhost:3001/sessions", {
        username,
        password
    });
    console.log("Token:", response.data);
};

