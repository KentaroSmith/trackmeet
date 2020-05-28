import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Collapse, Button, Container, Row, Col, Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt as editIcon,
    faPlus as addIcon,
    faTrashAlt as deleteIcon,
    faBan as notAllowedIcon
} from '@fortawesome/free-solid-svg-icons';
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
                            onClick={(event) => {
                                event.stopPropagation(); // to prevent the onClick action for ListGroupItem
                                onClickDelete()
                            }}
                        >
                            <FontAwesomeIcon icon={deleteIcon} size="1x" style={{ visibility: hovering ? 'visible' : 'hidden' }} />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    );
}


const LocationsList = ({ locations, roomCounts, activeLocationId, roomsByLocation, onClickLocation, onClickAdd, onClickEdit, onClickDeleteLocation, onClickDelete, onClickRoom }) => {

    const roomCount = (locId) => {
        const result = roomCounts.find((loc) => loc._id === locId);
        return !!result ? result.count : 0;
    }

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
                            <Col>{location.name} <Badge pill>{roomCount(location._id)}</Badge></Col>
                            {activeLocationId === location._id
                                ? <Col className="col-auto">
                                    <Button className="delete-btn fa-stack" onClick={() => onClickDeleteLocation(location._id)} style={{ marginRight: '20' }}>
                                        <FontAwesomeIcon icon={deleteIcon} className="fa-stack-1x"  /> 
                                        <FontAwesomeIcon icon={notAllowedIcon} className="not-sign fa-stack-2x"  /> 
                                    </Button>
                                    <Button className="edit-btn" onClick={onClickEdit} style={{ marginRight: '20' }}>
                                        <FontAwesomeIcon icon={editIcon} size="1x" /> 
                                    </Button>
                                    <Button className="add-btn" onClick={onClickAdd}>
                                        <FontAwesomeIcon icon={addIcon} size="1x" />
                                    </Button>
                                </Col>
                                : null}
                        </Row>
                    </Container>

                    <Collapse isOpen={activeLocationId === location._id}>
                        <ListGroup>
                            {(roomCount(location._id) === 0)
                                ? (<ListGroupItem>No rooms yet.</ListGroupItem>)
                                : <>
                                    {roomsByLocation.map((loc) => {
                                        return (loc.locationId === location._id)
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
                                </>
                            }
                        </ListGroup>
                    </Collapse>
                </ListGroupItem>
            )
            )}
        </ListGroup>
    );
}

export default LocationsList;