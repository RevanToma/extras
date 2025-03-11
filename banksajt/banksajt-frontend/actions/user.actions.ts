"use server"

import axios from "axios";



export const createUser = async () => {
    try {
        const response = await axios.post("http://localhost:3001/users", {
            username: "testuser",
            password: "mypassword"
        });

        console.log("Response:", response.data);
    } catch (error) {
        console.error("Error:", error);
    }
};


export const loginUser = async () => {
    const response = await axios.post("http://localhost:3001/sessions", {
        username: "testuser",
        password: "mypassword"
    });
    console.log("Token:", response.data);
};

