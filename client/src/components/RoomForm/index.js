import React, { useState, useEffect } from 'react';
import {
    Label, Input, Button, Form, FormGroup,
    UncontrolledPopover, PopoverBody, PopoverHeader,
    InputGroup, InputGroupAddon
} from 'reactstrap';

const RoomForm = ({ location, room, features, onSubmit }) => {
    const [name, setName] = useState(!!room ? room.roomName : "");
    const [description, setDescription] = useState(!!room ? room.description : "");
    const [capacity, setCapacity] = useState(!!room ? room.capacity : 1);
    const [selectedFeatureIds, setSelectedFeatureIds] = useState(!!room ? room.features : []);

    useEffect(() => {
        if (!!room) {
            setName(room.roomName);
            setDescription(room.description);
            setCapacity(room.capacity);
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
        <Form onSubmit={event => onSubmit(event, name, description, capacity, selectedFeatureIds)}>
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
            <InputGroup>
                <InputGroupAddon addonType="prepend">Room capacity:</InputGroupAddon>
                <Input
                    min={1} max={100}
                    type="number"
                    step="1"
                    value={capacity}
                    onChange={event => setCapacity(event.target.value)}
                />
                <InputGroupAddon addonType="append">people</InputGroupAddon>
            </InputGroup>
            {!features || features.map((feature) => (
                <FormGroup check key={feature.name}>
                    <Label check>
                        <Input type="checkbox" data-id={feature._id}
                            checked={selectedFeatureIds.includes(feature._id)}
                            onClick={handleFeatureChange}
                        />{' '}
                        <Button
                            id={"feature-" + feature._id}
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
            <Button type="submit" className="btn-block">Save</Button>
        </Form>
    );
};

export default RoomForm