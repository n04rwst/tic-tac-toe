import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from "universal-cookie";

function SignUp({setIsAuth}) {
    const cookies = new Cookies();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const signUp = () => {
        Axios.post("tic-tac-toe-production-1914.up.railway.app/signup", user)
            .then(res => {
                const {token, userId, firstName, lastName, username, hashedPassword} = res.data;
                cookies.set("token", token);
                cookies.set("userId", userId);
                cookies.set("firstName", firstName);
                cookies.set("lastName", lastName);
                cookies.set("username", username);
                cookies.set("hashedPassword", hashedPassword);
                setIsAuth(true);
            });
    };

    return (
        <div className="signUp">
            <label>Sign Up</label>

            <input
                type="text"
                placeholder="Your First Name"
                onChange={event => {
                    setUser({ ...user, firstName: event.target.value });
                }}
            />

            <input
                type="text"
                placeholder="Your Last Name"
                onChange={event => {
                    setUser({ ...user, lastName: event.target.value });
                }}
            />

            <input
                type="text"
                placeholder="Your Username"
                onChange={event => {
                    setUser({ ...user, username: event.target.value });
                }}
            />

            <input
                type="password"
                placeholder="Your Password"
                onChange={event => {
                    setUser({ ...user, password: event.target.value });
                }}
            />

            <button onClick={signUp}>Sign Up</button>
        </div>
    );
}

export default SignUp;