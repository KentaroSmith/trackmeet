import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../../components/Firebase/firebase";
import {
    Button, Form, FormGroup, Input,
    Card, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap';
import API from "../../utils/api";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../actions";
import "./style.css";
import logo from '../../assets/trackmeet-logo.png';

// save new User data (except for password) to the database
const saveUserData = (firstName, lastName, phone, email, callback) => {
    API.saveUser({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email
    })
        .then(res => {
            console.log(res.data);
            // now push the user data into global state
            callback(res.data);
        })
        .catch(err => console.log(err));
}

const SignUp = ({ history }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

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
            //getUserData(email.value, (user) => dispatch(updateUser(user)));
            saveUserData(firstName, lastName, phone, email, (user) => dispatch(updateUser(user)));
            history.push("/"); // this page loads upon successful user creation in Firebase
        } catch (error) {
            alert(error);
        }

        //saveUserData(firstName, lastName, phone, email, );

    }, [history, firstName, lastName, phone, email]);

    return (
        <div>
            <Card id="signup-card" className="mx-auto shadow-lg">
                <CardImg top width="100%" src={logo} alt="TrackMeet logo" />
                <CardBody>
                    <CardTitle>Sign up</CardTitle>

                    <Form onSubmit={handleSignUp}>
                        <FormGroup>
                            <Input
                                name="firstName" type="text" placeholder="First Name"
                                value={firstName}
                                onChange={event => setFirstName(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                name="lastName" type="text" placeholder="Last Name"
                                value={lastName}
                                onChange={event => setLastName(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                name="phone" type="phone" placeholder="Phone"
                                value={phone}
                                onChange={event => setPhone(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                name="emailAddress" type="email" placeholder="Email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input name="password" type="password" placeholder="Password" />
                        </FormGroup>
                        <FormGroup>
                            <Input name="passwordConfirm" type="password" placeholder="Confirm Password" />
                        </FormGroup>

                        <Button type="submit" className="btn-block">Sign Up</Button>
                    </Form>
                    <CardText>
                        <small>Already have an account? <Link to="/login">Sign in</Link></small>
                    </CardText>
                </CardBody>
            </Card>
        </div>
    );

};

export default withRouter(SignUp);