import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import app from "../../components/Firebase/firebase";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button, Form, FormGroup, Input,
    Card, CardImg, CardBody, CardTitle, CardText
} from 'reactstrap';
import Navbar from '../../components/navbar/index';
import API from "../../utils/api";
import "./style.css";
import { AuthContext } from "../../components/Firebase/auth";
import { updateUser } from "../../actions";

const mongojs = require("mongojs");


const makeReservation = (user, room) => {
    console.log("making reservation");

    // save reservation to database
    API.saveEvent({
        user: mongojs.ObjectId(user._id),
        userName: `${user.firstName} ${user.lastName}`,
        room: mongojs.ObjectId(room.id),
        roomName: room.roomName,
        startTime: "12:00",
        endTime: "16:00"
    })
        .then(res => {
            console.log(res.data);
            // redirect to the /reservations page

        })
        .catch(err => console.log(err));


};

const Confirm = () => {
    const { currentUser } = useContext(AuthContext);
    const userData = useSelector(state => state.user);
    const roomData = useSelector(state => state.room);
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);

    // loads once when the component mounts:
    useEffect(
        () => {
            // load user info into global state (Redux) if we haven't already
            getUserData(currentUser.email, (user) => {
                dispatch(updateUser(user));
                // load user data from database
                API.getEventsByUser(user._id)
                    .then(res => {
                        setEvents(res.data);
                    })
                    .catch(err => console.log(err));
            });
        },
        []);

    const getUserData = (email, callback) => {
        console.log("getting user for email: " + email);
        API.getUser(email)
            .then(res => {
                //console.log(res);
                console.log(res.data[0]);
                // now push the user data into global state
                callback(res.data[0]);
            })
            .catch(err => console.log(err));
        }

        return (
            <>
                <Navbar />
                <Card id="confirm-card" className="mx-auto shadow-lg">
                    <CardBody>
                        <CardTitle>Reservation confirmed:</CardTitle>
                        <p>Reserved by: {userData.firstName} {userData.lastName}</p>
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

                        <Button onClick={() => makeReservation(userData, roomData)} className="btn-block">Reserve room</Button>
                        <Button onClick={() => app.auth().signOut()} className="btn-block">Sign out</Button>
                        <Link to="/reservations">Go to reservations</Link>
                    </CardBody>
                </Card>
            </>
        );
    };

    export default withRouter(Confirm);