import React, { useState, useRef } from 'react';
import { ListGroup, ListGroupItem, Collapse, Button, Container, Row, Col, Badge,
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencilAlt as editIcon,
    faPlus as addIcon,
    faTrashAlt as deleteIcon,
    faBan as notAllowedIcon
} from '@fortawesome/free-solid-svg-icons';
import "./style.css";

const Room = ({ room, onClickEdit, onClickDelete }) => {
    const [hovering, setHovering] = useState(false);

    return (
        <ListGroupItem
            key={room._id}
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
                            style={{marginRight: 20}}
                        >
                            <FontAwesomeIcon icon={deleteIcon} size="1x" style={{ visibility: hovering ? 'visible' : 'hidden' }} />
                        </Button>
                        <Button
                            className="delete-btn"
                            onClick={onClickEdit}
                        >
                            <FontAwesomeIcon icon={editIcon} size="1x" style={{ visibility: hovering ? 'visible' : 'hidden' }} />
                        </Button>
                        
                    </Col>
                </Row>
            </Container>
        </ListGroupItem>
    );
}


const LocationsList = ({ locations, roomCounts, activeLocationId, roomsByLocation, onClickLocation, onClickAdd, onClickEdit, onClickDeleteLocation, onClickDelete, onClickRoom }) => {
    const activeLoc = useRef(0); // used to capture the LOCATION to be deleted
    const activeRoom = useRef(0); // used to capture the ROOM to be deleted
    const [showDeleteLocationModal, setShowDeleteLocationModal] = useState(false);
    const [showDeleteRoomModal, setShowDeleteRoomModal] = useState(false);

    const toggleDeleteLocationModal = () => setShowDeleteLocationModal(!showDeleteLocationModal);
    const toggleDeleteRoomModal = () => setShowDeleteRoomModal(!showDeleteRoomModal);

    const roomCount = (locId) => {
        const result = roomCounts.find((loc) => loc._id === locId);
        return !!result ? result.count : 0;
    }

    return (
        <>
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
                                        <Button
                                            className="delete-btn fa-stack"
                                            onClick={() => {
                                                activeLoc.current = location;
                                                toggleDeleteLocationModal();
                                            }}
                                            style={{ marginRight: 10 }}
                                            disabled={roomCount(location._id) > 0}
                                        >
                                            <FontAwesomeIcon icon={deleteIcon} className="fa-stack-1x" />
                                            {(roomCount(location._id) > 0) &&
                                                <FontAwesomeIcon icon={notAllowedIcon} className="not-sign fa-stack-2x" />
                                            }
                                        </Button>
                                        <Button className="edit-btn" onClick={onClickEdit} style={{ marginRight: 15 }}>
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
                                                        onClickEdit={() => onClickRoom(room._id)}
                                                        onClickDelete={() => {
                                                            activeRoom.current = room;
                                                            toggleDeleteRoomModal();
                                                        }}
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

            <Modal isOpen={showDeleteLocationModal} toggle={toggleDeleteLocationModal} className="delete-modal">
                <ModalHeader toggle={toggleDeleteLocationModal}>
                    Delete location?
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete <strong>{activeLoc.current.name}</strong>?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                        onClick={() => {
                            onClickDeleteLocation(activeLoc.current._id);
                            toggleDeleteLocationModal();
                        }}>
                        Yes, delete it
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteLocationModal}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showDeleteRoomModal} toggle={toggleDeleteRoomModal} className="delete-modal">
                <ModalHeader toggle={toggleDeleteRoomModal}>
                    Delete room?
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete <strong>{activeRoom.current.roomName}</strong>?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger"
                        onClick={() => {
                            onClickDelete(activeRoom.current._id)
                            toggleDeleteRoomModal();
                        }}>
                        Yes, delete it
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteRoomModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default LocationsList;