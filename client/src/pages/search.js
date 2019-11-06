import React, { Component } from "react";
import Navbar from '../components/navbar/index'
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';


class RoomSearch extends Component {

    state = {
        roomName: "",
        features: ""
    }

    handleInputForm = event => {
        // Pull the name and value properties off of the event.target (the element which triggered the event)
        const { name } = event.target;

        // Set the state for the appropriate input field
        this.setState({
            [name]: name
        });
    };


    render() {
        return (
            <div className="search">
                <Navbar />
                <Jumbotron>
                    <Form>
                        <FormGroup>
                            <Label for="location">Location: {this.setState.roomName}</Label>
                            <Input type="select" name="select" id="selectLocation"
                                type="text"
                                placeholder="Location"
                                name="location"
                                value={this.state.roomName}
                                onChange={this.handleInputForm}
                            />
                        </FormGroup>
                    </Form>

                    <Form>
                        <FormGroup>
                            <Label for="room">Meeting Size</Label>
                            <Input type="select" name="select" id="roomSize">
                                <option>0-5</option>
                                <option>6-10</option>
                                <option>11-15</option>
                                <option>16-20</option>
                            </Input>
                        </FormGroup>
                    </Form>

                    <Form>
                        <Label for="Features">Features: {this.setState.features}</Label>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" id="checkBox"
                                    type="text"
                                    placeholder="Features"
                                    name="features"
                                    value={this.state.features}
                                    onChange={this.handleInputForm}
                                />{' '}
                            </Label>
                        </FormGroup>
                    </Form>

                    <FormGroup>
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
                    </Form>

                    <Button className="lead" size="lg">
                        <Button color="primary" href="/search">Search</Button>
                    </Button>

                </Jumbotron>
            </div>
            // <p className="lead">
            //     <Button color="primary" href="/results">Search</Button>
            // </p>
        );
    }
}

export default RoomSearch;

