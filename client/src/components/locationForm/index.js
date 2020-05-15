import React, { useEffect, useState } from 'react';
import {
    Card, CardBody, CardHeader,
    Button, Container, Row, Col,
    Form, FormGroup, Input
} from 'reactstrap';
import API from "../../utils/api.js";

const LocationForm = ({ locationId }) => {
    // if locationId is passed in, form is in UPDATE mode
    // else, form is in CREATE mode
    const [location, setLocation] = useState({});

    useEffect(() => {
        console.log("useEffect, locationId = " + locationId);
        if (!!locationId) {
            getLocation(locationId);
        }
    }, [locationId]);

    const getLocation = (id) => {
        console.log("in getLocation, id = " + id);
        API.getLocation(id)
            .then(res => {
                console.log(res.data);
                setLocation(res.data);
            });
    };

    const updateLocation = (event) => {
        event.preventDefault();

        API.updateLocation(locationId, location)
            .then(res => {
                console.log(res.data);
            });
    };

    const createLocation = (event) => {
        event.preventDefault();

        API.saveLocation(location)
            .then(res => {
                console.log(res.data);
            });
    };

    return (
        <Form onSubmit={!!locationId ? updateLocation : createLocation}>
            location: {locationId}
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
            <Button type="submit" className="btn-block">Update</Button>
        </Form>
    );
};


export default LocationForm;