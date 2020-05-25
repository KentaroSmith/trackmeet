import React, { Component } from "react";
import Result from "../../components/Result/index";
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
    Col,
    Card,
    CardBody,
    ButtonGroup,
    Collapse
} from 'reactstrap';
import API from "../../utils/api";
import "./style.css";

class RoomSearch extends Component {

    state = {
        locationSearch: "",
        rooms: [],
        locations: [], // array of object IDs for selected (checked) locations
        features: [], // array of object IDs for selected (checked) features
        capacity: 1,
        startTime: "",
        endTime: "",
        day: "",
        allFeatures: [],
        allLocations: [],
        validate: {
            emailState: ''
        },
        cSelected: [],
    };
    searchChoice = {
        location: false,
        features: false
    };

    componentDidMount() {
        this.getLocations();
        this.getFeatures();
    };

    handleSearch = event => {
        API.searchRooms({
            params: {
                locations: this.state.cSelected.includes('location') 
                    ? this.state.locations
                    : this.state.allLocations.map((loc) => loc._id),
                capacity: this.state.capacity,
                features: this.state.cSelected.includes('feature') 
                    ? this.state.features
                    : []
            }
        })
            .then(res => {
                this.setState({ rooms: res.data })
            })
    };

    locationSelect = event => {
        API.searchRoomsByName(event.target.value)
            .then(res => {
                this.setState({
                    rooms: res.data,
                    // roomName: res.data.roomName,
                    // capacity: res.data.capacity,
                    // features: res.data.features,
                    // building: res.data.building
                })
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
            [name]: value,
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
        this.setState({ allLocations: res.data });
    };

    getFeatures = async () => {
        const res = await API.getFeatures()
        console.log(res.data);
        this.setState({ allFeatures: res.data });
    };

    onCheckboxBtnClick = (selected) => {
        if (!this.state.cSelected.includes(selected)) {
            this.setState({ cSelected: this.state.cSelected.concat(selected) });
        } else {
            this.setState({ cSelected: this.state.cSelected.filter((item) => item !== selected) });
        }
    }

    render() {
        let hiddenElements = {
            display: "none"
        }
        return (
            <div className="search">
                <Jumbotron >
                    {/* <Form>
                        <FormGroup>
                            <Label>Search Method: </Label>
                            <Input type="select" name="select" id="filterChoice" onChange={this.chooseFilter}>
                                <option value="none"> </option>
                                <option value="roomName">Sort by Room Name</option>
                                <option value="featureList">Sort by Room Feature</option>
                            </Input>

                        </FormGroup>
                    </Form> */}

                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.onCheckboxBtnClick('location')} active={this.state.cSelected.includes('location')}>Location</Button>
                        <Button color="primary" onClick={() => this.onCheckboxBtnClick('feature')} active={this.state.cSelected.includes('feature')}>Feature</Button>
                        <Button color="primary" onClick={() => this.onCheckboxBtnClick('capacity')} active={this.state.cSelected.includes('capacity')}>Capacity</Button>
                    </ButtonGroup>

                    {/* <Form id="roomNameList" style={hiddenElements}>
                        <FormGroup>
                            <Label>Rooms:</Label>
                            <Input type="select" name="select" id="roomName" onChange={this.locationSelect}>
                                <option value="all">All Rooms</option>
                                <option value="Study Room A">Study Room A</option>
                                <option value="Study Room B">Study Room B</option>
                                <option value="Study Room C">Study Room C</option>
                            </Input>
                        </FormGroup>
                    </Form> */}
                    <Form>
                        <Collapse isOpen={this.state.cSelected.includes('location')} >
                            <Label>Locations:</Label>
                            <Container fluid>
                                <Row>
                                    {this.state.allLocations.map((location) => {
                                        return (
                                            <Col xs='12' sm='6' md='4' xl='3'>
                                                <FormGroup check key={location._id}>
                                                    <Label check>
                                                        <Input
                                                            type="checkbox"
                                                            data-id={location._id}
                                                            onChange={(event) => {
                                                                !!event.target.checked
                                                                    ? this.setState({ locations: this.state.locations.concat(location._id) })
                                                                    : this.setState({ locations: this.state.locations.filter(locId => locId !== location._id) })
                                                            }}
                                                        />
                                                        {location.name}
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            </Container>
                            {/* </Col> */}
                        </Collapse>

                        <Collapse isOpen={this.state.cSelected.includes('feature')} >

                            <Label for="Features">Features: </Label>
                            {this.state.allFeatures.map((feature) => {
                                return (
                                    <FormGroup check key={feature._id}>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                data-id={feature._id}
                                                onChange={(event) => {
                                                    !!event.target.checked
                                                        ? this.setState({ features: this.state.features.concat(feature._id) })
                                                        : this.setState({ features: this.state.features.filter(featureId => featureId !== feature._id) })
                                                }}
                                            />
                                            {feature.name}
                                        </Label>
                                    </FormGroup>
                                );
                            })}

                        </Collapse>

                        <Collapse isOpen={this.state.cSelected.includes('capacity')} >

                            <FormGroup>
                                <Label>Person capacity needed:</Label>
                                <Input
                                    value={this.state.capacity}
                                    type='number'
                                    min='1'
                                    max='100'
                                    onChange={(event) => this.setState({ capacity: event.target.value })}
                                />
                            </FormGroup>

                        </Collapse>

                    </Form>


                    <Form>
                        <FormGroup>
                            <Row form>
                                <Col xs='12' sm='6'>
                                    <Label>Reservation Date</Label><Input type="date" id="day" value={this.state.day} onChange={this.handleDay}></Input>
                                </Col>
                                <Col xs='6' sm='3'>
                                    <Label for="start">Start Time {this.state.startTime}</Label>
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
                                <Col xs='6' sm='3'>
                                    <Label for="end">End Time {this.state.endTime}</Label>
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
                    </Form>
                    <Button size="lg" color="primary" onClick={() => this.handleSearch()}>Show all rooms</Button>
                </Jumbotron>

                <Container>
                    <Row >
                        <Col xs='12' className='pb-3'>
                            <Card>
                                <CardBody>
                                    {this.state.rooms.length === 0
                                        ? <h1 className='m-0'>No available rooms.</h1>
                                        : <h1 className='m-0'>Showing {this.state.rooms.length} available room{(this.state.rooms.length > 1) && 's'}:</h1>
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row >
                        {this.state.rooms.length === 0 ||
                            this.state.rooms.map(room => (
                                <Col md="6" lg='4' key={room._id} className='pb-3'>
                                    <Result
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