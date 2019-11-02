import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../components/Firebase/firebase";
import { AuthContext } from "../components/Firebase/auth";

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/confirm");
            } catch (error) {
                alert(error);
            }
        },
        [history]);

const { currentUser } = useContext(AuthContext);

if (currentUser) {
    return <Redirect to="/confirm" />
}

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
            <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Log in</button>
            </form>
        </div>
    );

};

export default withRouter(Login);