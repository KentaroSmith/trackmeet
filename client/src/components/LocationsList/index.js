import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Collapse, Button } from 'reactstrap';

const LocationsList = ({ locations, activeLocationId, roomsByLocation, onClickLocation, onClickRoom }) => {

    return (
        <ListGroup>
            {locations.map((location) => (
                <ListGroupItem
                    key={location._id}
                    tag="a"
                    action
                    onClick={() => onClickLocation(location._id) }
                >
                    {location.name}
                    <Collapse isOpen={activeLocationId === location._id}>
                        <Button>Add Room</Button>
                        <ListGroup>
                            {roomsByLocation.map((loc) => {
                                return loc.locationId === location._id
                                    ? loc.rooms.map((room) => (
                                        <ListGroupItem 
                                            key={room._id}
                                            onClick={() => onClickRoom() }
                                        >
                                            {room.roomName}
                                        </ListGroupItem>
                                        ))
                                    : null
                            })}
                        </ListGroup>
                    </Collapse>
                </ListGroupItem>
            )
            )}
        </ListGroup>
    );
}

export default LocationsList;