import React, { useEffect, useState } from 'react';
import {
    Button, Container, Row, Col,
    Form, FormGroup, Input, Label
} from 'reactstrap';

const LocationForm = ({ locationId, locations, onSave }) => {
    // if locationId is passed in, form is in UPDATE mode
    // else, form is in CREATE mode
    const [location, setLocation] = useState({timeOpen: "09:00", timeClose: "17:00"});

    useEffect(() => {
        console.log("LocationForm, useEffect, locationId = " + locationId);
        if (!!locationId) {
            setLocation(locations.find((loc) => loc._id === locationId));
        }
    }, [locationId]);

    return (
        <Form onSubmit={(event) => {
            event.preventDefault();
            !locationId 
                ? onSave(location)
                : onSave(locationId, location);
            }}
        >
            <FormGroup>
                <Input name="name" type="text" placeholder="Location name"
                    value={location.name}
                    onChange={(event) => setLocation({ ...location, name: event.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Input name="address" type="text" placeholder="address"
                    value={location.address}
                    onChange={(event) => setLocation({ ...location, address: event.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Input name="city" type="text" placeholder="city"
                    value={location.city}
                    onChange={(event) => setLocation({ ...location, city: event.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Input name="state" type="text" placeholder="state"
                    value={location.state}
                    onChange={(event) => setLocation({ ...location, state: event.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Input name="zip" type="text" placeholder="zip"
                    value={location.zip}
                    onChange={(event) => setLocation({ ...location, zip: event.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Container>
                    <Row>
                        <Col>
                            <Label>Opens at:
                                <Input name="timeOpen" type="time"
                                    value={location.timeOpen}
                                    onChange={(event) => setLocation({ ...location, timeOpen: event.target.value })} />
                            </Label>
                        </Col>
                        <Col>
                            <Label>Closes at:
                                <Input name="timeClose" type="time"
                                    value={location.timeClose}
                                    onChange={(event) => setLocation({ ...location, timeClose: event.target.value })} />
                            </Label>
                        </Col>
                    </Row>
                </Container>
            </FormGroup>
            <Button type="submit" className="btn-block">{!!locationId ? "Update" : "Save"}</Button>
        </Form>
    );
};


export default LocationForm;