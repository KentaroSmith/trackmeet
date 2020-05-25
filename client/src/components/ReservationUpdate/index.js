import React from 'react';
import {
    Card, CardBody, CardHeader,
    Button, Container, Row, Col
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons';
import "./style.css";
import moment from "moment";
import format from "../../utils/format";

const Reservation = ({ event, onDelete }) => {

    return (
        <div>
            <Card className="mx-auto shadow-lg reservation-card">
                <CardHeader>
                    <Container>
                        <Row>
                            <Col className="vertical-align">
                                <h3>
                                    <span>{moment(event.startTime).format("dddd, MMM. D, YYYY")}, </span>
                                    <span>{moment(event.startTime).format("h:mm a")} to {moment(event.endTime).format("h:mm a")}</span>
                                </h3>
                            </Col>
                            <Col className="col-auto">
                                {/*<Button className="modify-btn" ><FontAwesomeIcon icon={faPencilAlt} /></Button>*/}
                                <Button className="delete-btn" onClick={onDelete}><FontAwesomeIcon icon={faCalendarTimes} size="3x" /></Button>
                            </Col>
                        </Row>
                    </Container>
                </CardHeader>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <h4>Location:</h4>
                                <p style={{marginBottom: "0"}}>
                                    {!event.room.location || event.room.location.name}, {!event.room || event.room.roomName}
                                    <br />Max capacity: {!event.room || event.room.capacity}
                                    <br />Room features:
                                </p>
                                <ul>
                                    {!event.room || !event.room.features ||
                                        event.room.features.map((feature) => (
                                            <li key={feature._id} className="room-feature">{feature.name}</li>
                                        ))}
                                </ul>
                            </Col>
                            <Col>
                                <h4>Reserved by:</h4>
                                <p>
                                    {!event.user || event.user.firstName} {!event.user || event.user.lastName}
                                    <br /><a href={!event.user || "mailto:" + event.user.email}>{!event.user || event.user.email}</a>
                                    <br />{!event.user || format.formatPhoneNumber(event.user.phone)}
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