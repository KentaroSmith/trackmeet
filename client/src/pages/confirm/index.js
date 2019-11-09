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
    const roomData = useSelector(state => state.room);

    return (
        <>
            <Navbar />
            <Card className="mx-auto shadow-lg">
                <CardBody>
                    <CardTitle>Reservation confirmed:</CardTitle>
                    <p>User: {userData.firstName} {userData.lastName}</p>
                    <p>Email: {userData.email}</p>
                    <p>Phone: {userData.phone}</p>
                    <p>Location: {roomData.building}</p>
                    <p>Room: {roomData.roomName}</p>
                    <p>Max capacity: {roomData.occupancy}</p>
                    <p>Features:</p>
                    <ul>
                    {!roomData.features || 
                    roomData.features.map((feature, index) => ( 
                        <li key={feature}>{feature}</li>
                    ))}
                    </ul>
                    <p>Reservation period:</p>
                    <p>Wednesday, Nov. 13</p>
                    <p>6:00 - 8:00pm</p>

                    <Button onClick={() => makeReservation(userData)} className="btn-block">Reserve room</Button>
                    <Button onClick={() => app.auth().signOut()} className="btn-block">Sign out</Button>
                </CardBody>
            </Card>
        </>
    );
};

export default Confirm;