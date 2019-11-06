import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "../components/Firebase/firebase";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import API from "../utils/API";

// save new User data (except for password) to the database
const saveUserData = (firstName, lastName, phone, email) => {
    API.saveUser({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}

const SignUp = ({ history }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const handleSignUp = useCallback(async event => {
        event.preventDefault();

        const { emailAddress, password, passwordConfirm } = event.target.elements;

        if (password.value !== passwordConfirm.value ||
            password.value === '' ||
            email.value === '') { 
                alert("Invalid email or password values.")
                return; 
        }

        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(emailAddress.value, password.value);
            history.push("/confirm"); // this page loads upon successful user creation in Firebase
        } catch (error) {
            alert(error);
        }

        saveUserData(firstName, lastName, phone, email);

    }, [history, firstName, lastName, phone, email]);

    return (
        <div>
            <h1>Sign up</h1>
            <Form onSubmit={handleSignUp}>
                <FormGroup>
                    <Label>
                        First Name
                        <Input
                            name="firstName" type="text" placeholder="First Name"
                            value={firstName}
                            onChange={event => setFirstName(event.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Last Name
                        <Input
                            name="lastName" type="text" placeholder="Last Name"
                            value={lastName}
                            onChange={event => setLastName(event.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Phone
                        <Input
                            name="phone" type="phone" placeholder="Phone"
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Email
                        <Input
                            name="emailAddress" type="email" placeholder="Email"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Password
                    <Input name="password" type="password" placeholder="Password" />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>
                        Confirm Password
                    <Input name="passwordConfirm" type="password" placeholder="Confirm Password" />
                    </Label>
                </FormGroup>

                <Button type="submit">Sign Up</Button>
            </Form>
        </div>
    );

};

export default withRouter(SignUp);