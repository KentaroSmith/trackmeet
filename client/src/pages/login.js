import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../components/Firebase/firebase";
import { AuthContext } from "../components/Firebase/auth";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/api";

// save new User data (except for password) to the database
const getUserData = (email) => {
    API.getUser(email)
        .then(res => {
            console.log(res)
            // now push the user data into global state
        })
        .catch(err => console.log(err));
}

const Login = ({ history }) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                getUserData(email.value);    
                //history.push("/confirm"); // this page loads on successful user login
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
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <Label>
                        Email
                    <Input name="email" type="email" placeholder="Email" />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
                    <Input name="password" type="password" placeholder="Password" />
                    </Label>
                </FormGroup>
                <Button type="submit">Log in</Button>
            </Form>
        </div>
    );

};

export default withRouter(Login);