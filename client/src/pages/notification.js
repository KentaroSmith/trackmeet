import React, { Component } from "react";
import Navbar from '../components/navbar/index';
import { Jumbotron, Input, InputGroup, InputGroupAddon, Row, Col, Button, ButtonGroup } from "reactstrap";

require('dotenv').config({ path: __dirname + '/../.env' })

const NEXMO_API_KEY = process.env.NEXMO_API_KEY
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET
const TO_NUMBER = process.env.NEXMO_TO_NUMBER
const FROM_NUMBER = process.env.NEXMO_FROM_NUMBER


const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: "9519aafd",
    apiSecret: "iGeH0kMEFRzOrF54"
})

const from = "15628464795"
let to = ""
const text = "A text message sent using the Nexmo SMS API"

class TextInvite extends Component {

    state = {
        to: "",
        from: "15628464795",
        text: "A text message sent using the Nexmo SMS API"

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(name);
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        console.log(to)
        event.preventDefault();

        nexmo.message.sendSms(from, this.state.to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
    };

    render() {
        return (
            <div className="notification">
                <Navbar />
                <Jumbotron><h2><center>You're All Set!</center></h2>

                    <h3><center>Would You Like To Notify Anyone Of Your Reservation?</center></h3>

                    <Row>
                        <InputGroup>
                            {/* <InputGroupAddon /> */}
                            <Col xs="3">
                                <Input type="tel"
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.handleInputChange}
                                    placeholder="Input Number Here" min={0} max={100} type="number" step="1" />
                            </Col>
                        </InputGroup>
                    </Row>
                    {/* <Row>
                        <InputGroup>
                            <InputGroupAddon />
                            <Col xs="3">
                                <Input
                                    name="to"
                                    value={this.state.to}
                                    onChange={this.handleInputChange}
                                    placeholder="Input Number Here" min={0} max={100} type="number" step="1" />
                            </Col>
                        </InputGroup>
                    </Row> */}
                    <ButtonGroup className="lead" size="lg">
                        <Button color="primary" onClick={this.handleFormSubmit}
                            type="success">Submit</Button>
                        <Button color="primary" href="/">Skip</Button>
                    </ButtonGroup>

                </Jumbotron>
            </div >

        );
    }
};

export default TextInvite;