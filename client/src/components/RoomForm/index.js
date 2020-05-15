import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Label, Input, Button, Form, FormGroup,
    UncontrolledPopover, PopoverBody, PopoverHeader } from 'reactstrap';

const RoomForm = ({ location, room, features, onSubmit }) => {
    const [name, setName] = useState(!!room ? room.roomName : "");
    const [description, setDescription] = useState(!!room ? room.description : "");
    const [selectedFeatureIds, setSelectedFeatureIds] = useState(!!room ? room.features : []);
    const [displayedPopover, setDisplayedPopover] = useState("");

    useEffect(() => {
        if (!!room) {
            setName(room.roomName);
            setDescription(room.description);
            setSelectedFeatureIds(room.features);
        }
    }, [room]);

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
                                    checked={selectedFeatureIds.includes(feature._id)}
                                    onClick={handleFeatureChange}
                                />{' '}
                                <Button 
                                    id={"feature-"+ feature._id}
                                    type="button"
                                >
                                    {feature.name}
                                </Button>
                            </Label>
                            <UncontrolledPopover
                                trigger="focus"
                                placement="right"
                                // isOpen={feature._id === displayedPopover}
                                target={"feature-" + feature._id}
                                // toggle={() => setDisplayedPopover(feature._id)}
                            >
                                <PopoverHeader>{feature.name}</PopoverHeader>
                                <PopoverBody>
                                    {feature.description}
                                </PopoverBody>
                            </UncontrolledPopover>
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