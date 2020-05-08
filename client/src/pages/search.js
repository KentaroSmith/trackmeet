import React, { Component } from "react";
import Results from "../components/results/index";
import moment from "moment";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col
} from 'reactstrap';
import API from "../utils/api";

class RoomSearch extends Component {

    state = {
        locationSearch: "",
        rooms: [],
        roomName: "",
        features: "",
        building: "",
        occupancy: "",
        startTime: "",
        endTime: "",
        start: "",
        end: "",
        day: ""
    }
    searchChoice = {
        location: false,
        features: false
    }
    featuresArray = {
        features: []
    }
    handleSearch = event => {

        API.searchRooms(this.state.roomName)
            .then(res => {
                this.setState({
                    rooms: res.data,
                    roomName: res.data.roomName,
                    occupancy: res.data.occupancy,
                    features: res.data.features,
                    building: res.data.building
                })
            })
    };
    locationSelect = event => {
        API.searchRoomsByLocation(event.target.value)
            .then(res => {
                this.setState({
                    rooms: res.data,
                    roomName: res.data.roomName,
                    occupancy: res.data.occupancy,
                    features: res.data.features,
                    building: res.data.building
                })
            })
    }
    chooseFilter = event => {
        let searchOne = document.getElementById("roomNameList");
        let searchTwo = document.getElementById("featureList");
        if (event.target.value === "roomName") {
            this.searchChoice.location = true;
            this.searchChoice.features = false;
        }
        else if (event.target.value === "featureList") {
            this.searchChoice.features = true;
            this.searchChoice.location = false;
        }
        else {
            this.searchChoice.features = false;
            this.searchChoice.location = false;
        }
        if (this.searchChoice.location) {
            searchOne.style.display = "block";
            searchTwo.style.display = "none";
        }
        else if (this.searchChoice.features) {
            searchOne.style.display = "none";
            searchTwo.style.display = "block";
        }
    }
    getAllFeatures = () => {
        let allFeatures = [];
        API.searchRooms()
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    allFeatures.push.apply(allFeatures, res.data[i].features);
                }
                allFeatures.sort();
                console.log(allFeatures);
                //This is currently not working. this.featuresArray.push() is not recognized.
                this.featuresArray = allFeatures;
                console.log(this.featuresArray)
            })

    }
    handleDay = (event) => {
        this.setState({ day: event.target.value });
    }
    handleStart = (event) => {
        this.setState({ start: event.target.value });
    }
    handleEnd = (event) => {
        this.setState({ end: event.target.value });
    }

    saveTimeBlock = event => {
        let day = this.state.day;
        let startTime = this.state.start;
        let endTime = this.state.end;

        this.setState({
            startTime: moment(`${day} ${startTime}`),
            endTime: moment(`${day} ${endTime}`) 
        })
    }

    render() {
        let hiddenElements = {
            display: "none"
        }
        return (
            <div className="search">
                <Jumbotron >
                    <Form>
                        <FormGroup>
                            <Label>Search Method: </Label>
                            <Input type="select" name="select" id="filterChoice" onChange={this.chooseFilter}>
                                <option value="none"> </option>
                                <option value="roomName">Sort by Room Name</option>
                                <option value="featureList">Sort by Room Feature</option>
                            </Input>

                        </FormGroup>
                    </Form>

                    <Form id="roomNameList" style={hiddenElements}>
                        <FormGroup>
                            <Label>Rooms:</Label>
                            <Input type="select" name="select" id="roomName" onChange={this.locationSelect}>
                                <option value="all">All Rooms</option>
                                <option value="Study Room A">Study Room A</option>
                                <option value="Study Room B">Study Room B</option>
                                <option value="Study Room C">Study Room C</option>
                            </Input>
                        </FormGroup>
                    </Form>
                    <Form id="featureList" style={hiddenElements}>
                        <Label for="Features">Features: </Label>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox" value="projector"
                                />{' '} projector
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox" value="whiteboard"
                                />{' '} whiteboard
                            </Label>
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox" value="conference table"
                                />{' '} conference table
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox" value="computer"
                                />{' '} computer
                            </Label>
                        </FormGroup>
                    </Form>
                    <Form>
                        <FormGroup>
                            <Label>Reservation Date <Input type="date" id="day" value={this.state.day} onChange={this.handleDay}></Input> </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>Start Time <Input type="time" id="start" value={this.state.start} onChange={this.handleStart}></Input></Label>
                            <Label>End Time <Input type="time" id="end" value={this.state.end} onChange={this.handleEnd}></Input></Label>
                        </FormGroup>
                        <Button onClick={() => this.saveTimeBlock()}>Select Time Slot</Button>
                        <h3>Selected Time Slot: {moment(this.state.startTime).format("ddd, MMM D YYYY, h:mm a")} to {moment(this.state.endTime).format("h:mm a")}</h3>

                    </Form>
                    <Button size="lg" color="primary" onClick={() => this.handleSearch()}>Show all rooms</Button>

                </Jumbotron>

                <Container>
                    <Row>
                        <Col size="md-12">
                            <h1>Results:</h1>
                            {this.state.rooms.length === 0 ? "" :
                                this.state.rooms.map(room => (
                                    <Results
                                        key={room._id}
                                        id={room._id}
                                        roomName={room.roomName}
                                        features={room.features}
                                        occupancy={room.occupancy}
                                        building={room.building}
                                        startTime={this.state.startTime}
                                        endTime={this.state.endTime}
                                    />
                                ))}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default RoomSearch;

