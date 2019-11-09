import React from "react";
import app from "../../components/Firebase/firebase";
import { useSelector } from 'react-redux';
import {
    Button, Form, FormGroup, Input,
    Card, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap';
import Navbar from '../../components/navbar/index';
import API from "../../utils/api";
const mongojs = require("mongojs");

const makeReservation = (user) => {
    console.log("making reservation");

    // save reservation to database
    API.saveEvent({
        user: mongojs.ObjectId(user._id),
        userName: `${user.firstName} ${user.lastName}`,
        roomName: "Study Room 4",
        startTime: "12:00",
        endTime: "16:00"
    })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));

};

const Confirm = () => {
    const userData = useSelector(state => state.user);

    return (
        <>
            <Navbar />
            <h1>Reservation confirmed:</h1>
            <p>User: {userData.firstName} {userData.lastName}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
            <Button onClick={() => makeReservation(userData)}>Reserve room</Button>
            <Button onClick={() => app.auth().signOut()}>Sign out</Button>
        </>
    );
};

export default Confirm;