import React, { useState, useEffect, useContext } from "react";
import Reservation from "../../components/ReservationUpdate";
import { useSelector, useDispatch } from 'react-redux';
import {
    Container, Row, Col, Button,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import API from "../../utils/api";
import { AuthContext } from "../../components/Firebase/auth";
import { updateUser } from "../../actions";
import "./style.css";
import SMS from "../../utils/sms";
import moment from "moment";

const Reservations = () => {
    const { currentUser } = useContext(AuthContext);
    const user = useSelector(state => state.user);
    const [events, setEvents] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [eventToDelete, setEventToDelete] = useState({});
    const dispatch = useDispatch();

    const toggle = () => setModalDelete(!modalDelete);

    const showDeleteModal = (event) => {
        setEventToDelete(event);
        setModalDelete(!modalDelete);
    }

    // loads once when the component mounts:
    useEffect(
        () => {
            // load user info into global state (Redux) if we haven't already
            getUserData(currentUser.email, (user) => {
                dispatch(updateUser(user));
                // load user data from database
                API.getEventsByUser(user._id)
                .then(res => {
                    console.log(res.data);
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

    const getReservations = () => {
        console.log("getReservations: " + user._id);
        API.getEventsByUser(user._id)
            .then(res => {
                console.log(res.data);
                setEvents(res.data);
            })
            .catch(err => console.log(err));

        // FUTURE: an option for administrators to see all Events
    };

    const deleteReservation = (event) => {
        API.deleteEvent(event._id)
            .then(res => {
                console.log(res.data);
                getReservations();
                SMS.sendSMS(event.user.phone,
                    `Your reservation of ` +
                    `${event.room.roomName} at ${event.room.location.name} for ` +
                    `${moment(event.startTime).format("dddd, MMMM D, YYYY, h:mm a")} to ${moment(event.endTime).format("h:mm a")} ` +
                    `has been CANCELLED. ` +
                    `http://track-meet.herokuapp.com`
                );
                toggle();
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Container>
                <Row className="no-gutters">
                    <Col size="md-12">
                        {events.length === 0
                            ? <p className="text-center no-active-res">You have no active reservations.</p>
                            : <h1>Active reservations ({events.length}):</h1>
                        }
                    </Col>
                </Row>
                <Row className="no-gutters">
                    <Col size="md-12">
                        {!events ||
                            events.map(event => (
                                <div key={event._id}>
                                    <Reservation
                                        event={event}
                                        onDelete={() => showDeleteModal(event)}
                                    />
                                </div>
                            ))}
                    </Col>
                </Row>
            </Container>

            <Modal isOpen={modalDelete} toggle={toggle} className="modal-delete">
                <ModalHeader toggle={toggle}><FontAwesomeIcon icon={faCalendarTimes} size="1x" style={{marginRight: "0.5rem"}}/>Delete reservation?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this reservation?
                </ModalBody>
                <ModalFooter>
                    <Container>
                        <Row>
                            <Col>
                                <Button color="danger" className="btn-block" onClick={() => deleteReservation(eventToDelete)}>Delete</Button>{' '}
                            </Col>
                            <Col className="col-auto">
                                <div style={{width: "1rem"}}></div>
                            </Col>
                            <Col>
                                <Button color="secondary" className="btn-block" onClick={toggle}>Cancel</Button>
                            </Col>
                        </Row>
                    </Container>
                </ModalFooter>
            </Modal>
        </>
    );

};

export default Reservations;