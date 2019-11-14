import React, { useState, useEffect, useContext } from "react";
import Reservation from "../../components/reservation/index";
import { useSelector, useDispatch } from 'react-redux';
import {
    Container, Row, Col
} from 'reactstrap';
import API from "../../utils/api";
import { AuthContext } from "../../components/Firebase/auth";
import { updateUser } from "../../actions";
import "./style.css";

const Reservations = () => {
    const { currentUser } = useContext(AuthContext);
    const user = useSelector(state => state.user);
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();

    //console.log("the user is " + currentUser.email)

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
        //console.log("getting user for email: " + email);
        API.getUser(email)
            .then(res => {
                //console.log(res);
                console.log(res.data[0]);
                // now push the user data into global state
                callback(res.data[0]);
            })
            .catch(err => console.log(err));
    }

    const loadReservations = () => {
        //console.log("loadReservations: " + user._id)
        API.getEventsByUser(user._id)
            .then(res => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch(err => console.log(err));

        // FUTURE: an option for administrators to see all Events
    };

    const deleteReservation = (id) => {
        API.deleteEvent(id)
            .then(res => {
                console.log(res.data);
                loadReservations();
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Container>
                <Row>
                    <Col size="md-12">
                        {events.length === 0
                            ? <p className="text-center">You have no active reservations.</p>
                            : <h1>Active reservations ({events.length}):</h1>
                        }
                        {!events ||
                            events.map(event => (
                                <div key={event._id}>
                                    <Reservation
                                        event={event}
                                        onDelete={() => deleteReservation(event._id)}
                                    />
                                </div>
                            ))}
                    </Col>
                </Row>
            </Container>
        </>
    );

};

export default Reservations;