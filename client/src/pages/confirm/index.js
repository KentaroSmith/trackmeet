import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import {
    Button,
    Card, CardHeader, CardBody
} from 'reactstrap';
import API from "../../utils/api";
import "./style.css";
import { AuthContext } from "../../components/Firebase/auth";
import { updateUser } from "../../actions";
import SMS from "../../utils/sms";
import moment from "moment";
import format from "../../utils/format";

const mongojs = require("mongojs");


const Confirm = ({ history }) => {
    const { currentUser } = useContext(AuthContext);
    const userData = useSelector(state => state.user);
    const roomData = useSelector(state => state.room);
    const timesData = useSelector(state => state.times);
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    const [features, setFeatures] = useState([]);
    const [locationName, setLocationName] = useState("");

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
            getLocationName();
            getFeatures();
        },
        []);

    const makeReservation = (user, room, times) => {
        //console.log("making reservation");

        // save reservation to database
        API.saveEvent({
            user: mongojs.ObjectId(user._id),
            userName: `${user.firstName} ${user.lastName}`,
            room: mongojs.ObjectId(room.id),
            roomName: room.roomName,
            startTime: times.startTime,
            endTime: times.endTime
        })
            .then(res => {
                //console.log(res.data);

                //send SMS confirmation
                SMS.sendSMS(
                    userData.phone,
                    `CONFIRMATION: You have reserved ${roomData.roomName} ` +
                    `at ${roomData.building} for ` +
                    `${moment(timesData.startTime).format("dddd, MMMM D, YYYY, h:mm a")} to ${moment(timesData.endTime).format("h:mm a")}. ` +
                    `http://track-meet.herokuapp.com`
                )
                //{moment(timesData.startTime).format("dddd, MMMM D, YYYY")}
                //<br />{moment(timesData.startTime).format("h:mm a")} to {moment(timesData.endTime).format("h:mm a")}</p>

                // redirect to the /reservations page
                history.push("/reservations");
            })
            .catch(err => console.log(err));
    };

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

    const getLocationName = async () => {
        const res = await API.getLocation(roomData.location)
        setLocationName(res.data.name);
    };

    const getFeatures = async () => {
        const res = await API.getFeatures()
        setFeatures(res.data);
    };

    return (
        <>
            <Card id="confirm-card" className="mx-auto shadow-lg">
                <CardHeader><h3>Reservation summary:</h3></CardHeader>
                <CardBody>
                    <h4>Location:</h4>
                    <p>{locationName}, {roomData.roomName}
                        <br />Max capacity: {roomData.occupancy}
                        <br />Features:
                    <ul>
                        {(roomData.features.length > 0) &&
                            features.map((feature) => (
                                roomData.features.includes(feature._id)
                                    ? <li key={feature._id}>{feature.name}</li>
                                    : null
                            ))}
                    </ul>
                    </p>
                    <h4>Reservation period:</h4>
                    <p>{moment(timesData.startTime).format("dddd, MMMM D, YYYY")}
                        <br />{moment(timesData.startTime).format("h:mm a")} to {moment(timesData.endTime).format("h:mm a")}</p>

                    <h4>Reserved by:</h4>
                    <p>{userData.firstName} {userData.lastName}
                        <br />{userData.email}
                        <br />{format.formatPhoneNumber(userData.phone)}</p>
                    <Button onClick={() => makeReservation(userData, roomData, timesData)} className="btn-block">Reserve room</Button>
                </CardBody>
            </Card>
        </>
    );
};

export default withRouter(Confirm);