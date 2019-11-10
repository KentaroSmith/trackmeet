import React from 'react';
import { Link } from "react-router-dom";
import {
    Card, CardBody, CardHeader, CardTitle,
    Button, Container, Row, Col
} from 'reactstrap';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

let formatPhoneNumber = (str) => {
    //Filter only numbers from the input
    let cleaned = ('' + str).replace(/\D/g, '');

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    };

    return null
};

const Reservation = ({ event, onDelete }) => {

    return (
        <div className="reservation">
            <Card className="mx-auto shadow-lg">
                <CardHeader>
                    <Container>
                        <Row>
                            <Col>
                                Wednesday, Nov. 13, 6:00 - 8:00pm
                    </Col>
                            <Col className="col-md-auto">
                                <Button className="modify-btn" v><FontAwesomeIcon icon={faPencilAlt} /></Button>
                                <Button className="delete-btn" onClick={onDelete}><FontAwesomeIcon icon={faCalendarTimes} /></Button>
                            </Col>
                        </Row>
                    </Container>


                </CardHeader>
                <CardBody>

                    <CardTitle>Reservation:</CardTitle>

                    <p>Location: {!event.room || event.room.building}, {!event.room || event.room.roomName}</p>
                    <p>Max capacity: {!event.room || event.room.occupancy}</p>
                    <p>Room features:</p>
                    <ul>
                        {!event.room || !event.room.features ||
                            event.room.features.map((feature, index) => (
                                <li key={feature} className="room-feature">{feature}</li>
                            ))}
                    </ul>
                    <p>Reserved by: {!event.user || event.user.firstName} {!event.user || event.user.lastName} | <a href={!event.user || "mailto:" + event.user.email}>{!event.user || event.user.email}</a> | {!event.user || formatPhoneNumber(event.user.phone)}</p>
                </CardBody>
            </Card>
        </div>
    );
}


export default Reservation;