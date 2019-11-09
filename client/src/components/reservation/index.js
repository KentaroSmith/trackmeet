import React from 'react';
import { Link } from "react-router-dom";
import {
    Card, CardBody, CardTitle,
    Button
} from 'reactstrap';
import "./style.css";

const Reservation = ({ event }) => {

    return (
        <div className="reservation">
            <Card className="mx-auto shadow-lg">
                <CardBody>
                    <CardTitle>Reservation:</CardTitle>
                    
                    <p>Location: {!event.room || event.room.building}, {!event.room || event.room.roomName}</p>
                    <p>Max capacity: {!event.room || event.room.occupancy}</p>
                    <p>Features:</p>
                    <ul>
                        {!event.room || !event.room.features ||
                            event.room.features.map((feature, index) => (
                                <li key={feature} className="room-feature">{feature}</li>
                            ))}
                    </ul>
                    <p>Reservation period: Wednesday, Nov. 13, 6:00 - 8:00pm</p>
                    <p>Reserved by: {!event.user || event.user.firstName} {!event.user || event.user.lastName} ({!event.user || event.user.email}, {!event.user || event.user.phone})</p>

                    <Button className="btn-block">Edit</Button>
                    <Button className="btn-block">Delete</Button>
                </CardBody>
            </Card>
        </div>
    );
}


export default Reservation;