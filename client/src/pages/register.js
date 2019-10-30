import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import API from "../utils/API";

class Register extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    };

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;

        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    addUser = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();

        API.saveUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
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
                    <Label for="password">Password</Label>
                    <Input
                        type="password" name="password" id="password" placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordConfirm">Password</Label>
                    <Input
                        type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm Password"
                        value={this.state.passwordConfirm}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
                <Button onClick={this.addUser} >Submit</Button>
            </Form>
        );
    }
}

export default Register;