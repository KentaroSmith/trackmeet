import React from 'react';
import { withRouter } from "react-router-dom";
import {
    Jumbotron,
    Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { updateRoom, updateTimes } from "../../actions";

const Result = ({ room, locations, features, startTime, endTime, history }) => {
    const dispatch = useDispatch();
    let featureList = [];
    let locationName = "";
    for (let i = 0; i < features.length; i++) {
        if (room.features.includes(features[i]._id)) {
            featureList.push(features[i].name + " ");
        }
    };
    for (let i = 0; i < locations.length; i++) {
        if (locations[i]._id === room.location) {
            locationName = locations[i].name;
        }
    };

    const updateReservation = () => {
        dispatch(updateRoom(room));

        dispatch(updateTimes({
            startTime: startTime,
            endTime: endTime
        }));

        history.push('/confirm')
    }

    return (
        <div className="search-result">

            {/* <Jumbotron>
                <h1 className="display-3">Results:</h1>
                <p className="lead"></p>
                <hr className="my-2"></hr>
                <p></p>
                <p className="lead">
                    <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron> */}
            <Jumbotron>
                <h3 className="roomName">{room.roomName}</h3>
                <p className="features"> <strong>Room Features: </strong> {featureList} </p>
                <p className="building"> <strong>Location: </strong> {locationName} </p>
                <p className="capacity"> <strong>Capacity: </strong> {room.capacity} </p>
                {/*This was a test to make sure that start/end times carried over to results*/}
                {/*                 <p> {startTime} </p>
                <p> {endTime} </p> */}

                <Button
                    onClick={updateReservation}
                    key={room._id}>
                    Reserve this room
                </Button>
            </Jumbotron>

        </div>
    );
}


export default withRouter(Result);