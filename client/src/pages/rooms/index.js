import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
// import { AuthContext } from "../../components/Firebase/auth";
import {
    Button, Form, FormGroup, Input, Label,
    Card, CardBody, CardHeader,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Container, Row, Col
} from 'reactstrap';
import API from "../../utils/api";
import "./style.css";
import LocationForm from "../../components/LocationForm";
import LocationsList from "../../components/LocationsList";
import RoomForm from "../../components/RoomForm";

const mongojs = require("mongojs");

const Rooms = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); // actually a location ID
    const [description, setDescription] = useState("");
    const [locations, setLocations] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [activeLocationId, setActiveLocationId] = useState();
    const [activeLocationName, setActiveLocationName] = useState();
    const [activeRoomId, setActiveRoomId] = useState();
    const [activeRoom, setActiveRoom] = useState();
    const [roomsByLocation, setRoomsByLocation] = useState([]); // the rooms for all locations that have been expanded
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [roomCounts, setRoomCounts] = useState([]);

    useEffect(() => {
        getLocations();
        getFeatures();
        getRoomCounts();
    }, []);

    const toggleCreateLocation = () => setModalCreate(!modalCreate);
    const toggleUpdateLocation = () => setModalUpdate(!modalUpdate);

    const getLocations = async () => {
        const res = await API.getLocations();
        // console.log(res.data);
        setLocations(res.data);
    };

    const getFeatures = async () => {
        const res = await API.getFeatures();
        // console.log(res.data);
        setFeatures(res.data);
    };

    const getRoomCounts = async () => {
        const res = await API.getRoomCountPerLocation();
        console.log(res.data);
        setRoomCounts(res.data);
    };

    // handles a click on a location
    const getRooms = async (locationId) => {
        const res = await API.getRoomsByLocation(locationId);
        console.log(res.data);
        let newRooms = [...roomsByLocation].filter((loc) => loc.locationId !== locationId); // removes the location if it's in roomsByLocation
        newRooms.push({ locationId, rooms: res.data }); // adds it back
        setRoomsByLocation(newRooms);
        setActiveLocationId(locationId);
        let currentLoc = locations.find((location) => location._id === locationId);
        setActiveLocationName(currentLoc.name);
    };

    // handles a click on a room
    const handleRoomChange = async (roomId) => {
        setActiveRoomId(roomId);
        const activeLoc = roomsByLocation.find((loc) => loc.locationId === activeLocationId);
        const activeRooms = activeLoc.rooms;
        setActiveRoom(activeRooms.find((room) => room._id === roomId));
        setShowAddForm(false);
        setShowEditForm(true);
    };

    const handleLocationChange = event => {
        const index = event.target.selectedIndex;
        const optionElement = event.target.childNodes[index];
        setLocation(optionElement.getAttribute('data-id'));
        setActiveLocationId(optionElement.getAttribute('data-id'));
    };

    const addRoom = event => {
        event.preventDefault();
        console.log("Add room location: " + location); // not working. = null
        API.saveRoom({
            location: mongojs.ObjectId(location),
            roomName: name,
            description: description,
            features: selectedFeatureIds.map((featureId) => (mongojs.ObjectId(featureId)))
        }
        ).then(res => {
            console.log(res.data);
            getRooms(location);
            setShowAddForm(false);
        })
            .catch(err => console.log(err));

    };

    const addRoom2 = (event, name, description, capacity, selectedFeatureIds) => {
        console.log("addRoom2!!!!");
        event.preventDefault();
        console.log("Add room location: " + activeLocationId); // not working. = null
        API.saveRoom({
            location: mongojs.ObjectId(activeLocationId),
            roomName: name,
            description,
            capacity,
            features: selectedFeatureIds.map((featureId) => (mongojs.ObjectId(featureId)))
        }
        ).then(res => {
            console.log(res.data);
            getRooms(activeLocationId);
            getRoomCounts();
            setShowAddForm(false);
        })
            .catch(err => console.log(err));

    };

    const updateRoom = (event, name, description, capacity, selectedFeatureIds) => {
        console.log("updateRoom");
        event.preventDefault();
        console.log("Update room at location: " + activeLocationId); // not working. = null
        API.updateRoom(activeRoomId,
            {
                building: mongojs.ObjectId(activeLocationId), // delete this line later
                location: mongojs.ObjectId(activeLocationId),
                roomName: name,
                description,
                capacity,
                features: selectedFeatureIds.map((featureId) => (mongojs.ObjectId(featureId)))
            }
        ).then(res => {
            console.log(res.data);
            getRooms(activeLocationId);
            setShowEditForm(false);
        })
            .catch(err => console.log(err));

    };

    const deleteRoom = async (id) => {
        await API.deleteRoom(id);
        getRooms(activeLocationId);
        getRoomCounts();
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col xs="6">
                        <Card id="room-card" className="mx-auto shadow-lg">
                            <CardHeader className="login-header">Locations</CardHeader>
                            <CardBody>
                                <Form onSubmit={addRoom}>
                                    <FormGroup>
                                        <Label for="selectLocation">Select a location</Label>
                                        <Button color="danger" onClick={toggleUpdateLocation}>Edit</Button>
                                        <Button color="secondary" onClick={toggleCreateLocation}>Add</Button>
                                        <Input type="select" name="select" id="selectLocation"
                                            onChange={handleLocationChange}
                                        >
                                            <option check="true">Select a location</option>
                                            {!locations || locations.map((loc) => (
                                                <option check="true" key={loc._id} data-id={loc._id}>
                                                    {loc.name}
                                                </option>
                                            ))
                                            }
                                        </Input>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        <LocationsList
                            locations={locations}
                            roomCounts={roomCounts}
                            activeLocationId={activeLocationId}
                            roomsByLocation={roomsByLocation}
                            onNameChange={(event) => console.log(event.target.value)}
                            onClickLocation={getRooms}
                            onClickAdd={() => {
                                setShowEditForm(false);
                                setShowAddForm(true);
                                }}
                            onClickRoom={handleRoomChange}
                            onClickDelete={deleteRoom}
                        />
                    </Col>
                    {!showAddForm || <Col xs="6">
                        <RoomForm
                            location={activeLocationName}
                            features={features}
                            onSubmit={addRoom2}
                        />
                    </Col>}
                    {!showEditForm || <Col xs="6">
                        <RoomForm
                            location={activeLocationName}
                            room={activeRoom}
                            features={features}
                            onSubmit={updateRoom}
                        />
                    </Col>}
                </Row>
            </Container>

            <Modal isOpen={modalCreate} toggle={toggleCreateLocation} className="location-modal">
                <ModalHeader toggle={toggleCreateLocation}>Create New Location</ModalHeader>
                <ModalBody>
                    <LocationForm />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleCreateLocation}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleCreateLocation}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalUpdate} toggle={toggleUpdateLocation} className="location-modal">
                <ModalHeader toggle={toggleUpdateLocation}>Edit Location</ModalHeader>
                <ModalBody>
                    <LocationForm locationId={location} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleUpdateLocation}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleUpdateLocation}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default withRouter(Rooms);