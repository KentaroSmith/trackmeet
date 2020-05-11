import React, { useState } from 'react';
import { ListGroup, ListGroupItem, Collapse } from 'reactstrap';
import API from '../../utils/api';

const LocationsList = ({ locations }) => {
    const [activeId, setActiveId] = useState();
    const [roomsByLocation, setRoomsByLocation] = useState([]); // the rooms for all locations that have been expanded

    const getRooms = async (locationId) => {
        const res = await API.getRoomsByLocation(locationId);
        let newRooms = [...roomsByLocation].filter((loc) => loc.locationId !== locationId); // removes the location if it's in roomsByLocation
        newRooms.push({ locationId, rooms: res.data }); // adds it back
        setRoomsByLocation(newRooms);
        setActiveId(locationId);
    };

    return (
        <ListGroup>
            {locations.map((location) => (
                <ListGroupItem
                    key={location._id}
                    // active={activeId === location._id}
                    tag="a"
                    action
                    onClick={() => {
                        getRooms(location._id);
                    }}
                >
                    {location.name}
                    <Collapse isOpen={activeId === location._id}>
                        <ListGroup>
                            {roomsByLocation.map((val) => {
                                return val.locationId === location._id
                                    ? val.rooms.map((room) => <ListGroupItem key={room._id}>{room.roomName}</ListGroupItem>)
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