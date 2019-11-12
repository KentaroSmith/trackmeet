import React, { Component } from "react";
import Navbar from '../components/navbar/index';
import Results from "../components/results/index";
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container,
    Row,
    Col,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';
import API from "../utils/api";

class RoomSearch extends Component {

    state = {
        rooms: [],
        roomName: "",
        features: "",
        building: "",
        occupancy: ""
    }

    /*     handleInputForm = event => {
            // Pull the name and value properties off of the event.target (the element which triggered the event)
            const { name } = event.target;
    
            // Set the state for the appropriate input field
            this.setState({
                [name]: name
            });
        }; */
    handleSearch = event => {

        //testing the roomname search first
        API.searchRooms(this.state.roomName)
            .then(res => {
                console.log(res); //temp
                this.setState({
                    rooms: res.data,
                    roomName: res.data.roomName,
                    occupancy: res.data.occupancy,
                    features: res.data.features,
                    building: res.data.building
                })
            })
    };
    //See if redux can handle global state in a way that can carry over to the calendar page
    /*    seeSchedule=event=>{
           event.preventDefault();
           API.showSchedule(this.state.roomName)
           .then()
       } */

    render() {
        return (
            <div className="search">
                <Navbar activePage="search" />
                <Jumbotron>
                    <UncontrolledDropdown>
                        <DropdownToggle Button caret>
                            Search By
                    </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                By Room Name
                        </DropdownItem>
                            <DropdownItem>
                                By Room Features
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>

                    <Form>
                        <FormGroup>
                            <Label>Rooms:</Label>
                            <Input type="select" name="select" id="roomName">
                                <option>All Rooms</option>
                                <option>Study Room A</option>
                                <option>Study Room B</option>
                                <option>Study Room C</option>
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

                    <Form>
                        <Label for="Features">Features: {this.setState.features}</Label>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox"
                                /*                                     type="text"
                                                                    placeholder="Features"
                                                                    name="features"
                                                                    value={this.state.features}
                                                                    onChange={this.handleInputForm} */
                                />{' '} projector
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox"
                                />{' '} whiteboard
                            </Label>
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox"
                                />{' '} conference table
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox"
                                />{' '} computer
                            </Label>
                        </FormGroup>
                    </Form>

                    {/*                     <FormGroup>
                        <Label for="meeting-time">Enter a date and time for your party booking: </Label>
                        <Input id="meetingTime" type="datetime-local" name="dateTime" min="2019-10-01T00:00" max="2024-01-01T24:00">
                        </Input>
                    </FormGroup>

                    <Form>
                        <FormGroup>
                            <Label for="room">Meeting Duration(hours)</Label>
                            <Input type="select" name="select" id="roomSize">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Input>
                        </FormGroup>
                    </Form> */}


                    <Button size="lg" color="primary" onClick={() => this.handleSearch()}>Search</Button>


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

