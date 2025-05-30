import './styles/App.css';
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {StreamChat} from "stream-chat";
import {Chat} from "stream-chat-react"
import Cookies from "universal-cookie"
import {useState} from "react";
import JoinGame from "./components/JoinGame";


function App() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const cookies = new Cookies();
    const token = cookies.get("token");
    const client = StreamChat.getInstance(apiKey);

    const [isAuth, setIsAuth] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    const logout = () => {
        cookies.remove("token");
        cookies.remove("userId");
        cookies.remove("firstName");
        cookies.remove("lastName");
        cookies.remove("hashedPassword");
        cookies.remove("username");
        client.disconnectUser();
        setIsAuth(false);
    };

    if (token) {
        client.connectUser({
            id: cookies.get("userId"),
            name: cookies.get("username"),
            firstName: cookies.get("firstName"),
            lastName: cookies.get("lastName"),
            hashedPassword: cookies.get("hashedPassword"),
        }, token)
            .then(_ => setIsAuth(true))
            .catch(err => console.log(err));
    }

    if (isAuth) {
        return (
            <div className="app">
                <Chat client={client}>
                    <JoinGame logout={logout} />
                </Chat>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="form-toggle">
                <button
                    className={!isSignUp ? "active" : ""}
                    onClick={() => setIsSignUp(false)}
                >
                    Login
                </button>
                <button
                    className={isSignUp ? "active" : ""}
                    onClick={() => setIsSignUp(true)}
                >
                    Sign Up
                </button>
            </div>
            <div className="form-box">
                {isSignUp
                    ? <SignUp setIsAuth={setIsAuth} />
                    : <Login setIsAuth={setIsAuth} />
                }
            </div>
        </div>
    );
}

export default App;
