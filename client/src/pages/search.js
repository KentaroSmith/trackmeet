import React, { Component } from "react";
import Result from "../components/Result/index";
import moment from "moment";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    FormFeedback,
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
        capacity: "",
        startTime: "",
        endTime: "",
        day: "",
        allFeatures: [],
        allLocations: [],
        validate: {
            emailState: ''
        },
    };
    searchChoice = {
        location: false,
        features: false
    };
    featuresArray = {
        features: []
    };

    componentDidMount() {
        this.getLocations();
        this.getFeatures();
    };

    handleSearch = event => {
        API.searchRooms(this.state.roomName)
            .then(res => {
                this.setState({
                    rooms: res.data,
                    roomName: res.data.roomName,
                    capacity: res.data.capacity,
                    features: res.data.features,
                    building: res.data.building
                })
            })
    };

    locationSelect = event => {
        API.searchRoomsByName(event.target.value)
            .then(res => {
                this.setState({
                    rooms: res.data,
                    roomName: res.data.roomName,
                    capacity: res.data.capacity,
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
        this.setState({ startTime: event.target.value });
    }
    validateTimes = (event) => {
        const { validate } = this.state;
        if ((event.target.name === "startTime" && this.state.endTime > event.target.value) ||
            (event.target.name === "endTime" && event.target.value > this.state.startTime)) {
            validate.timeState = 'has-success'
        } else {
            validate.timeState = 'has-danger'
        }
        this.setState({ validate });
        //this.setState({ end: event.target.value });
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
          [ name ]: value,
        });
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

    getLocations = async () => {
        const res = await API.getLocations()
        console.log(res.data);
        this.setState({ ...this.state, allLocations: res.data });
    };

    getFeatures = async () => {
        const res = await API.getFeatures()
        console.log(res.data);
        this.setState({ ...this.state, allFeatures: res.data });
    };

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
                            <Row form>
                                <Col>
                                    <Label>Reservation Date</Label><Input type="date" id="day" value={this.state.day} onChange={this.handleDay}></Input>
                                </Col>
                                <Col>
                                    <Label>Start Time {this.state.startTime}</Label>
                                    <Input 
                                        type="time" 
                                        id="start" 
                                        name="startTime"  
                                        step="900" 
                                        value={this.state.startTime} 
                                        onChange={(event) => {
                                            this.validateTimes(event);
                                            this.handleChange(event);
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Label>End Time {this.state.endTime}</Label>
                                    <Input 
                                        type="time" 
                                        id="end" 
                                        name="endTime"  
                                        step="900" 
                                        value={this.state.endTime} 
                                        valid={this.state.validate.timeState === 'has-success'}
                                        invalid={this.state.validate.timeState === 'has-danger'}
                                        onChange={(event) => {
                                            this.validateTimes(event);
                                            this.handleChange(event);
                                        }}
                                    />
                                    <FormFeedback invalid>End Time must be later than Start Time.</FormFeedback>
                                </Col>
                            </Row>
                        </FormGroup>
                        {/* <Button onClick={() => this.saveTimeBlock()}>Select Time Slot</Button>
                        <h3>Selected Time Slot: {moment(this.state.startTime).format("ddd, MMM D YYYY, h:mm a")} to {moment(this.state.endTime).format("h:mm a")}</h3> */}

                    </Form>
                    <Button size="lg" color="primary" onClick={() => this.handleSearch()}>Show all rooms</Button>

                </Jumbotron>

                <Container>
                    <Row>
                        <Col size="md-12">
                            {this.state.rooms.length === 0
                                ? <h1>No results.</h1>
                                : <h1>Results ({this.state.rooms.length}):</h1>
                            }
                        </Col>
                    </Row>
                    <Row style={{overflowX: "auto", whiteSpace: "nowrap"}} >
                        {this.state.rooms.length === 0 ||
                            this.state.rooms.map(room => (
                                <Col xs="4" style={{display: "inline-block", float: "none" }}>
                                    <Result
                                        key={room._id}
                                        room={room}
                                        locations={this.state.allLocations}
                                        features={this.state.allFeatures}
                                        startTime={moment(`${this.state.day} ${this.state.startTime}`)}
                                        endTime={moment(`${this.state.day} ${this.state.endTime}`)}
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default RoomSearch;

