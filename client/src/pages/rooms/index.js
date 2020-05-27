import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
// import { AuthContext } from "../../components/Firebase/auth";
import {
    Button, Form, FormGroup, Input, Label,
    Card, CardBody, CardHeader,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Container, Row, Col, Collapse, Fade, ListGroup, ListGroupItem
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight as ArrowIcon,
    faTrashAlt as DeleteIcon,
    faPencilAlt as EditIcon,
    faPlus as AddIcon
} from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import API from "../../utils/api";
import "./style.css";
import LocationsList from "../../components/LocationsList";
import LocationForm from "../../components/LocationFormUpdate";
import FeatureForm from "../../components/FeatureForm";
import RoomForm from "../../components/RoomForm";

const mongojs = require("mongojs");

const Rooms = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); // actually a location ID
    const [featureId, setFeatureId] = useState(); // ID of the feature being edited
    const [description, setDescription] = useState("");
    const [locations, setLocations] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalAddFeature, setModalAddFeature] = useState(false);
    const [modalEditFeature, setModalEditFeature] = useState(false);
    const [activeLocationId, setActiveLocationId] = useState();
    const [activeLocationName, setActiveLocationName] = useState();
    const [activeRoomId, setActiveRoomId] = useState();
    const [activeRoom, setActiveRoom] = useState();
    const [roomsByLocation, setRoomsByLocation] = useState([]); // the rooms for all locations that have been expanded
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [roomCounts, setRoomCounts] = useState([]);
    const [hoveringFeature, setHoveringFeature] = useState();
    const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

    useEffect(() => {
        getLocations();
        getFeatures();
        getRoomCounts();
    }, []);

    const isMedium = useMediaQuery({ query: '(min-width: 768px)' })

    const toggleCreateLocation = () => setModalCreate(!modalCreate);
    const toggleUpdateLocation = () => setModalUpdate(!modalUpdate);
    const toggleAddFeature = () => setModalAddFeature(!modalAddFeature);
    const toggleEditFeature = () => setModalEditFeature(!modalEditFeature);


    const getLocations = async () => {
        const res = await API.getLocations();
        // console.log(res.data);
        setLocations(res.data);
    };

    const getFeatures = async () => {
        const res = await API.getFeatures();
        console.log(res.data);
        setFeatures(res.data);
    };

    const getRoomCounts = async () => {
        const res = await API.getRoomCountPerLocation();
        console.log(res.data);
        setRoomCounts(res.data);
    };

    // handles a click on a location
    const getRooms = async (locationId) => {
        console.log(locationId);
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

    const addFeature = async (feature) => {
        const res = await API.saveFeature(feature)
        //console.log(res.data);
        getFeatures();
        toggleAddFeature();
    };

    const updateFeature = async (id, feature) => {
        const res = await API.updateFeature(id, feature);
        //console.log(res.data);
        getFeatures();
        toggleEditFeature();
    };

    const deleteFeature = async (id) => {
        await API.deleteFeature(id);
        getFeatures();
    };



    return (
        <div>
            <Container>
                <Row>
                    <Col sm="12" md='6'>
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
                    <Col sm="12" md='6'>
                        <Card>
                            <CardHeader id="features-head" onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}>
                                <Container>
                                    <Row>
                                        <Col>
                                            <FontAwesomeIcon icon={ArrowIcon} size="1x" style={{ marginRight: 10 }} className={'fa-rotate-90'} />
                                            Room Features
                                        </Col>
                                        <Col className="col-auto">
                                            <Fade in={isFeaturesOpen}>
                                                <Button
                                                    className="add-btn"
                                                    disabled={!isFeaturesOpen}
                                                    onClick={(event) => {
                                                        event.stopPropagation(); // to prevent the Collapse action
                                                        toggleAddFeature();
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={AddIcon} size="1x" />
                                                </Button>
                                            </Fade>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardHeader>
                            <Collapse isOpen={isFeaturesOpen}>
                                <CardBody>
                                    <ListGroup>
                                        {
                                            !features || features.map((feature) => (
                                                <ListGroupItem
                                                    key={feature._id}
                                                    id={feature._id}
                                                    onMouseEnter={() => setHoveringFeature(feature._id)}
                                                    onMouseLeave={() => setHoveringFeature()}
                                                >
                                                    <Container>
                                                        <Row>
                                                            <Col>
                                                                {feature.name}
                                                            </Col>
                                                            <Col className="col-auto">
                                                                <div style={{ visibility: hoveringFeature === feature._id ? 'visible' : 'hidden' }}>
                                                                    <Button
                                                                        className="edit-btn"
                                                                        style={{ marginRight: 30 }}
                                                                        onClick={() => {
                                                                            setFeatureId(feature._id);
                                                                            toggleEditFeature();
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={EditIcon} size="1x" />
                                                                    </Button>
                                                                    <Button
                                                                        className="delete-btn"
                                                                        onClick={() => deleteFeature(feature._id)}
                                                                    >
                                                                        <FontAwesomeIcon icon={DeleteIcon} size="1x" />
                                                                    </Button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Container>


                                                </ListGroupItem>
                                            ))
                                        }
                                    </ListGroup>
                                </CardBody>
                            </Collapse>
                        </Card>
                    </Col>
                    {isMedium && <>
                        {modalAddFeature &&
                            <Col sm="12" md='6'>
                                <Card>
                                    <CardHeader>Add New Feature
                                <Button close onClick={() => setModalAddFeature(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </Button>
                                    </CardHeader>
                                    <CardBody>
                                        <FeatureForm
                                            onSave={addFeature}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        }
                        {modalEditFeature &&
                            <Col sm="12" md='6'>
                                <Card>
                                    <CardHeader>Edit Feature
                                        <Button close onClick={() => setModalEditFeature(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </Button>
                                    </CardHeader>
                                    <CardBody>
                                        <FeatureForm
                                            featureId={featureId}
                                            features={features}
                                            onSave={updateFeature}
                                        />
                                    </CardBody>
                                </Card>
                            </Col>
                        }
                    </>}
                </Row>
                <Row>
                    <Col sm="12" md='6'>
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
                    {!showAddForm || <Col sm="12" md='6'>
                        <RoomForm
                            location={activeLocationName}
                            features={features}
                            onSubmit={addRoom2}
                        />
                    </Col>}
                    {!showEditForm || <Col sm="12" md='6'>
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

            {!isMedium &&
                (<>
                    <Modal isOpen={modalAddFeature} toggle={toggleAddFeature} className="location-modal">
                        <ModalHeader toggle={toggleAddFeature}>Add New Feature</ModalHeader>
                        <ModalBody>
                            <FeatureForm
                                onSave={addFeature}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggleAddFeature}>Save</Button>{' '}
                            <Button color="secondary" onClick={toggleAddFeature}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEditFeature} toggle={toggleEditFeature} className="location-modal">
                        <ModalHeader toggle={toggleEditFeature}>Edit Feature</ModalHeader>
                        <ModalBody>
                            <FeatureForm
                                featureId={featureId}
                                features={features}
                                onSave={updateFeature}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={toggleEditFeature}>Save</Button>{' '}
                            <Button color="secondary" onClick={toggleEditFeature}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </>)
            }
        </div>
    );

}

export default withRouter(Rooms);