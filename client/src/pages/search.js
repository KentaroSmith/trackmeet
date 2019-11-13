import React, { Component } from "react";
import Navbar from '../components/navbar/index';
import Results from "../components/results/index";
import Checkboxes from "../components/feature";
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
        occupancy: ""
    }
    searchChoice = {
        location: false,
        features: false
    }
    featuresArray = {
        features: []
    }

    handleInputForm = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { searchTerm } = event.target;
        console.log(searchTerm)
        // Set the state for the appropriate input field
        /*         this.setState({
                    locationSearch: searchTerm
                }); */
    };
    handleSearch = event => {

        //testing the roomname search first
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
        console.log(event.target.value)
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
        /*         this.setState({
                    locationSearch: this.value
        
                }) */
    }
    //See if redux can handle global state in a way that can carry over to the calendar page
    /*    seeSchedule=event=>{
           event.preventDefault();
           API.showSchedule(this.state.roomName)
           .then()
       } */
    chooseFilter = event => {
        console.log(event.target.value)
        let searchOne = document.getElementById("roomNameList");
        let searchTwo = document.getElementById("featureList");
        if (event.target.value === "roomName") {
            this.searchChoice.location = true;
            this.searchChoice.features = false;
            console.log("Location is set to: " + this.searchChoice.location)
        }
        else if (event.target.value === "featureList") {
            this.searchChoice.features = true;
            this.searchChoice.location = false;
            console.log("Features is set to: " + this.searchChoice.features)
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
                console.log(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i].features)
                    allFeatures.push.apply(allFeatures, res.data[i].features);
                    console.log(allFeatures)

                }
                allFeatures.sort();
                console.log(allFeatures);
                //This is currently not working. this.featuresArray.push() is not recognized.
                this.featuresArray = allFeatures;
                console.log(this.featuresArray)
            })

    }
    render() {
        let hiddenElements = {
            display: "none"
        }
        return (
            <div className="search">
                <Navbar />
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
                            {/*                             <Label for="location">Location: {this.setState.roomName}</Label>
                            <Input type="select" name="select" id="selectLocation"
                                type="text"
                                placeholder="Location"
                                name="location"
                                value={this.state.roomName}
                                onChange={this.handleInputForm}
                            /> */}
                        </FormGroup>
                    </Form>

                    {/*                     <Form>
                        <FormGroup>
                            <Label for="room">Meeting Size</Label>
                            <Input type="select" name="select" id="roomSize">
                                <option>0-5</option>
                                <option>6-10</option>
                                <option>11-15</option>
                                <option>16-20</option>
                            </Input>
                        </FormGroup>
                    </Form> */}

                    <Form id="featureList" style={hiddenElements} /* onChange={this.getAllFeatures} */>
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
                    {/* this component is experimental, still actively working on coming up with a key to use for each checkbox*/}
                    {/* <Checkboxes id="featureList" style={hiddenElements} onChange={this.getAllFeatures}
                    feature={this.featuresArray}
                    /> */}
                    <Button size="lg" color="primary" onClick={() => this.handleSearch()}>Show all rooms</Button>


                </Jumbotron>

                <Container>
                    <Row>
                        <Col size="md-12">
                            <h1>Results:</h1>
                            {this.state.rooms.length === 0 ? "" :
                                this.state.rooms.map(room => (
                                    <Results
                                        key={room.id}
                                        roomName={room.roomName}
                                        features={room.features}
                                        occupancy={room.occupancy}
                                        building={room.building}
                                    /* seeSchedule={event => this.seeSchedule()} */
                                    />
                                ))}
                        </Col>
                    </Row>
                </Container>
            </div>

            // <p className="lead">
            //     <Button color="primary" href="/results">Search</Button>
            // </p>
        );
    }
}

export default RoomSearch;

