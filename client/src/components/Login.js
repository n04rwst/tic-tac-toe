import React, {useState} from 'react';
import Axios from "axios";
import Cookies from "universal-cookie";

function Login({setIsAuth}) {
    const cookies = new Cookies();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        Axios.post("tic-tac-toe-production-1914.up.railway.app/login", {
            username,
            password,
        }).then(res => {
            const {token, userId, firstName, lastName, username} = res.data;
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            setIsAuth(true);
        });
    };

    return (
        <div className="login">
            <label>Login</label>

            <input
                type="text"
                placeholder="Your Username"
                onChange={event => {
                    setUsername(event.target.value);
                }}
            />

            <input
                type="password"
                placeholder="Your Password"
                onChange={event => {
                    setPassword(event.target.value);
                }}
            />

            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;