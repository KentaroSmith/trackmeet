import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import API from "../utils/API";
import { FirebaseContext } from '../components/Firebase';

const Register = () => (
    <div>
        <h1>Sign Up</h1>
        <FirebaseContext.Consumer>
            {firebase => <SignUpForm firebase={firebase} />}
        </FirebaseContext.Consumer>
    </div>
);

const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
    error: null,
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    addUser = event => {

        // create user in Firebase
        const { email, password } = this.state;
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });

        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        // Save non-authorization user data to MongoDB
        API.saveUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        const {
            firstName,
            lastName,
            email,
            password,
            passwordConfirm,
            error,
        } = this.state;

        const isInvalid =
            password !== passwordConfirm ||
            password === '' ||
            email === '';

        return (
            <Form>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                        type="text" name="firstName" id="firstName" placeholder="First Name"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                        type="text" name="lastName" id="lastName" placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input
                        type="email" name="email" id="exampleEmail" placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                        type="phone" name="phone" id="phone" placeholder="Phone"
                        value={this.state.phone}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password" name="password" id="password" placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordConfirm">Confirm Password</Label>
                    <Input
                        type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm Password"
                        value={this.state.passwordConfirm}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <Button
                    onClick={this.addUser}
                    disabled={isInvalid}>Submit</Button>
                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

export default Register;

export { SignUpForm };