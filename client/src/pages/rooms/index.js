import React, { useCallback, useContext, useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../../components/Firebase/firebase";
import { AuthContext } from "../../components/Firebase/auth";
import {
    Button, Form, FormGroup, Input, Label,
    Card, CardImg, CardBody, CardText, CardHeader,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Container, Row, Col
} from 'reactstrap';
import API from "../../utils/api";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../actions";
import "./style.css";
import { set } from "mongoose";
import LocationForm from "../../components/LocationForm";
import LocationsList from "../../components/LocationsList"
import RoomForm from "../../components/RoomForm";

const mongojs = require("mongojs");

const Rooms = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); // actually a location ID
    const [description, setDescription] = useState("");
    const [locations, setLocations] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [activeLocationId, setActiveLocationId] = useState();
    const [roomsByLocation, setRoomsByLocation] = useState([]); // the rooms for all locations that have been expanded


    useEffect(() => {
        getLocations();
        getFeatures();
    }, []);

    const toggleCreate = () => setModalCreate(!modalCreate);
    const toggleUpdate = () => setModalUpdate(!modalUpdate);

    const getLocations = async () => {
        const res = await API.getLocations();
        console.log(res.data);
        setLocations(res.data);
    };

    const getFeatures = async () => {
        const res = await API.getFeatures()
        console.log(res.data);
        setFeatures(res.data);
    };

    const getRooms = async (locationId) => {
        const res = await API.getRoomsByLocation(locationId);
        let newRooms = [...roomsByLocation].filter((loc) => loc.locationId !== locationId); // removes the location if it's in roomsByLocation
        newRooms.push({ locationId, rooms: res.data }); // adds it back
        setRoomsByLocation(newRooms);
        setActiveLocationId(locationId);
    };

    const handleLocationChange = event => {
        const index = event.target.selectedIndex;
        const optionElement = event.target.childNodes[index];
        setLocation(optionElement.getAttribute('data-id'));
    };

    const handleFeatureChange = event => {
        const featureId = event.target.getAttribute('data-id');
        if (event.target.checked) {
            setSelectedFeatureIds([...selectedFeatureIds, featureId]);
        } else {
            setSelectedFeatureIds(selectedFeatureIds.filter((id) => (id !== featureId)));
        }
    };

    const addRoom = event => {
        event.preventDefault();
        console.log("Add room location: " + location); // not working. = null
        API.saveRoom({
            building: mongojs.ObjectId(location), // delete this line later
            location: mongojs.ObjectId(location),
            roomName: name,
            description: description,
            features: selectedFeatureIds.map((featureId) => (mongojs.ObjectId(featureId)))
        }
        ).then(res => console.log(res.data))
            .catch(err => console.log(err));

    };

    const addRoom2 = (event, name, description, selectedFeatureIds) => {
        console.log("addRoom2!!!!");
        event.preventDefault();
        console.log("Add room location: " + location); // not working. = null
        API.saveRoom({
            building: mongojs.ObjectId(location), // delete this line later
            location: mongojs.ObjectId(location),
            roomName: name,
            description: description,
            features: selectedFeatureIds.map((featureId) => (mongojs.ObjectId(featureId)))
        }
        ).then(res => console.log(res.data))
            .catch(err => console.log(err));

    };

    return (
        <div>
            <Card id="room-card" className="mx-auto shadow-lg">
                <CardHeader className="login-header">Create a room</CardHeader>
                <CardBody>
                    <Form onSubmit={addRoom}>
                        <FormGroup>
                            <Label for="selectLocation">Select a location</Label>
                            <Button color="danger" onClick={toggleUpdate}>Edit</Button>
                            <Button color="secondary" onClick={toggleCreate}>Add</Button>
                            <Input type="select" name="select" id="selectLocation"
                                onChange={handleLocationChange}
                            >
                                <option check="true">
                                    Select a location
                                </option>
                                {!locations || locations.map((loc) => (
                                    <option check="true" key={loc._id} data-id={loc._id}>
                                        {loc.name}
                                    </option>
                                ))
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input name="name" type="text" placeholder="Room name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input name="description" type="text" placeholder="Description"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </FormGroup>
                        {!features || features.map((feature) => (
                            <FormGroup check key={feature.name}>
                                <Label check>
                                    <Input type="checkbox" data-id={feature._id}
                                        onClick={handleFeatureChange}
                                    />{' '}
                                    {feature.name}
                                </Label>
                            </FormGroup>
                        ))
                        }
                        <Button type="submit" className="btn-block">Create room</Button>
                    </Form>
                </CardBody>
            </Card>

            <Container>
                <Row>
                    <Col xs="6">
                        <LocationsList
                            name={name}
                            locations={locations}
                            activeLocationId={activeLocationId}
                            roomsByLocation={roomsByLocation}
                            onNameChange={(event) => console.log(event.target.value)}
                            onClickLocation={getRooms}
                            onClickRoom={() => console.log("Room clicked")}
                        />
                    </Col>
                    <Col>
                        <RoomForm
                            features={features}
                            onSubmit={addRoom2}
                        />
                    </Col>
                </Row>
            </Container>
      
            

            <Modal isOpen={modalCreate} toggle={toggleCreate} className="location-modal">
                <ModalHeader toggle={toggleCreate}>Create New Location</ModalHeader>
                <ModalBody>
                    <LocationForm />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleCreate}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleCreate}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalUpdate} toggle={toggleUpdate} className="location-modal">
                <ModalHeader toggle={toggleUpdate}>Edit Location</ModalHeader>
                <ModalBody>
                    <LocationForm locationId={location} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleUpdate}>Save</Button>{' '}
                    <Button color="secondary" onClick={toggleUpdate}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}

export default withRouter(Rooms);