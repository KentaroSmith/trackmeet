import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Label, Input, Button, Form, FormGroup } from 'reactstrap';

const RoomForm = ({ location, features, onSubmit }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);

    const handleFeatureChange = event => {
        const featureId = event.target.getAttribute('data-id');
        if (event.target.checked) {
            setSelectedFeatureIds([...selectedFeatureIds, featureId]);
        } else {
            setSelectedFeatureIds(selectedFeatureIds.filter((id) => (id !== featureId)));
        }
    };

    return (
        <Card id="room-card" className="mx-auto shadow-lg">
            <CardHeader className="login-header">Create a room at {location}</CardHeader>
            <CardBody>
                <Form onSubmit={event => onSubmit(event, name, description, selectedFeatureIds)}>
                    <FormGroup>
                        <Input name="name" type="text" placeholder="Room name"
                            value={name}
                            onChange={event => setName(event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input name="description" type="text" placeholder="Description"
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </FormGroup>
                    {!features || features.map((feature) => (
                        <FormGroup check key={feature.name}>
                            <Label check>
                                <Input type="checkbox" data-id={feature._id}
                                    onClick={handleFeatureChange}
                                />{' '}
                                {feature.name}
                            </Label>
                        </FormGroup>
                    ))
                    }
                    <Button type="submit" className="btn-block">Create room</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default RoomForm