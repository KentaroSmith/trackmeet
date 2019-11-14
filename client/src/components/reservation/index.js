import React from 'react';
import {
    Card, CardBody, CardHeader,
    Button, Container, Row, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
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
        <div>
            <Card className="mx-auto shadow-lg reservation-card">
                <CardHeader>
                    <Container>
                        <Row>
                            <Col>
                                <h3>Reservation for: Wednesday, Nov. 13, 6:00 - 8:00pm</h3>
                                <h3>Reservation for: {event.room.startTime} </h3>
                            </Col>
                            <Col className="col-md-auto">
                                {/*<Button className="modify-btn" ><FontAwesomeIcon icon={faPencilAlt} /></Button>*/}
                                <Button className="delete-btn" onClick={onDelete}><FontAwesomeIcon icon={faCalendarTimes} /></Button>
                            </Col>
                        </Row>
                    </Container>
                </CardHeader>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <h4>Location:</h4>
                                <p>
                                    {!event.room || event.room.building}, {!event.room || event.room.roomName}
                                    <br />Max capacity: {!event.room || event.room.occupancy}
                                    <br />Room features:
                                    <ul>
                                        {!event.room || !event.room.features ||
                                            event.room.features.map((feature, index) => (
                                                <li key={feature} className="room-feature">{feature}</li>
                                            ))}
                                    </ul>
                                </p>
                            </Col>
                            <Col>

                                <h4>Reserved by:</h4>
                                <p>
                                    {!event.user || event.user.firstName} {!event.user || event.user.lastName}
                                    <br /><a href={!event.user || "mailto:" + event.user.email}>{!event.user || event.user.email}</a>
                                    <br />{!event.user || formatPhoneNumber(event.user.phone)}
                                </p>
                            </Col>
                        </Row>
                    </Container>

                </CardBody>
            </Card>
        </div>
    );
}


export default Reservation;