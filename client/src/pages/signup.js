import React, { useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router";
import app from "../components/Firebase/firebase";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import API from "../utils/API";

const SignUp = ({ history }) => {
    const [firstName, setFirstName] = useState("f");
    const [lastName, setLastName] = useState("l");
    const [email, setEmail] = useState("e");
    const [message, setMessage] = useState('default');

    const handleSignUp = useCallback(async event => {
        event.preventDefault();

        console.log(`adding user ${firstName} ${lastName} ${message}`);

        const { email, password } = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/confirm");
        } catch (error) {
            alert(error);
        }

        saveUserData();

    }, [history]);

    const saveUserData = () => {
        console.log(`adding user ${firstName} ${lastName} ${message}`);
        API.saveUser({
            firstName: firstName,
            lastName: lastName,
            email: email
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={message}
                    placeholder="Enter a message"
                    onChange={ e => {
                        const newMessage = e.target.value;
                        setMessage(prev => prev + newMessage);
                    } }
                />
                <p>
                    <strong>{message}</strong>
                </p>
            </div>
            <h1>Sign up</h1>
            <Form onSubmit={handleSignUp}>
                <FormGroup>
                    <Label>
                        First Name
                        <input
                            name="firstName" type="text" placeholder="First Name"
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}
                        />
                        <p>
                            <strong>{firstName}</strong>
                        </p>
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Last Name
                        <Input
                            name="lastName" type="text" placeholder="Last Name"
                            value={lastName}
                            onChange={({ target }) => setLastName(target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Phone
                    <Input name="phone" type="phone" placeholder="Phone" />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Email
                        <Input
                            name="email" type="email" placeholder="Email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
                    <Input name="password" type="password" placeholder="Password" />
                    </Label>
                </FormGroup>

                <Button type="submit">Sign Up</Button>
            </Form>
        </div>
    );

};

export default withRouter(SignUp);