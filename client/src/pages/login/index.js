import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../../components/Firebase/firebase";
import { AuthContext } from "../../components/Firebase/auth";
import {
    Button, Form, FormGroup, Input,
    Card, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap';
import API from "../../utils/api";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../actions";
import "./style.css";
import logo from '../../assets/trackmeet-logo-black.svg';

// retrieve User data from the database
const getUserData = (email, callback) => {
    API.getUser(email)
        .then(res => {
            //console.log(res);
            console.log(res.data[0]);
            // now push the user data into global state
            callback(res.data[0]);
        })
        .catch(err => console.log(err));
}

const Login = ({ history }) => {
    const dispatch = useDispatch();

    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                getUserData(email.value, (user) => dispatch(updateUser(user)));
                history.push("/"); // this page loads on successful user login
            } catch (error) {
                alert(error);
            }
        },
        [history]);

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />
    }

    return (
        <div>
            <div>
                <Card id="login-card" className="mx-auto shadow-lg">
                    <CardImg top width="100%" src={logo} className="logo-black" alt="TrackMeet logo" />
                    <CardBody>
                        <CardTitle>Log in</CardTitle>
                        <Form onSubmit={handleLogin}>
                            <FormGroup>
                                <Input name="email" type="email" placeholder="Email" />
                            </FormGroup>
                            <FormGroup>
                                <Input name="password" type="password" placeholder="Password" />
                            </FormGroup>
                            <Button type="submit" className="btn-block">Log in</Button>
                        </Form>
                        <CardText>
                            <small>New to TrackMeet? <Link to="/signup">Create an account</Link></small>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        </div>
    );

};

export default withRouter(Login);