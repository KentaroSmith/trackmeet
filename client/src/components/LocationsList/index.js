import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Collapse, Button, Container, Row, Col, Badge} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

const Room = ({ room, onClick, onClickDelete }) => {
    const [hovering, setHovering] = useState(false);

    return (
        <ListGroupItem
            key={room._id}
            onClick={onClick}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <Container className='room'>
                <Row>
                    <Col>{room.roomName}</Col>
                    <Col className="col-auto">
                        <Button
                            className="delete-btn"
                            onClick={onClickDelete}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} size="1x" style={{ visibility: hovering ? 'visible' : 'hidden' }}/>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    );
}


const LocationsList = ({ locations, activeLocationId, roomsByLocation, onClickLocation, onClickAdd, onClickDelete, onClickRoom }) => {

    const handleMouseOver = (event) => {
        // console.log("hi");
        console.log(event.target);
    };

    return (
        <ListGroup>
            {locations.map((location) => (
                <ListGroupItem
                    key={location._id}
                    tag="a"
                    action
                    onClick={() => onClickLocation(location._id)}
                >
                    <Container>
                        <Row>
                            <Col>{location.name} <Badge pill>0</Badge></Col>
                            {activeLocationId === location._id
                                ? <Col className="col-auto">
                                    <Button className="add-btn" onClick={onClickAdd}><FontAwesomeIcon icon={faPlus} size="1x" /> </Button>
                                </Col>
                                : null}
                        </Row>
                    </Container>

                    <Collapse isOpen={activeLocationId === location._id}>
                        <ListGroup>
                            {roomsByLocation.map((loc) => {
                                return loc.locationId === location._id
                                    ? loc.rooms.map((room) => (
                                        <Room
                                            key={room._id}
                                            room={room}
                                            onClick={() => onClickRoom(room._id)}
                                            onClickDelete={() => onClickDelete(room._id)}
                                        />
                                    ))
                                    : null
                            })}
                        </ListGroup>
                    </Collapse>
                </ListGroupItem>
            )
            )}
        </ListGroup>
    );
}

export default LocationsList;