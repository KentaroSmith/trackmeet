import React from 'react';
import { withRouter } from "react-router-dom";
import {
    Jumbotron,
    Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { updateRoom, updateTimes } from "../../actions";

const Results = ({ roomName, features, building, occupancy, id, startTime, endTime, history }) => {
    const dispatch = useDispatch();
    let featureList = [];
    for (let i = 0; i < features.length; i++) {
        featureList.push(features[i] + " ")
    };

    const updateReservation = () => {
        dispatch(updateRoom({
            id: id,
            building: building,
            roomName: roomName,
            features: features,
            occupancy: occupancy
        }));

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
                <h3 className="roomName">{roomName}</h3>
                <p className="features"> <strong>Room Features: </strong> {featureList} </p>
                <p className="building"> <strong>Location: </strong> {building} </p>
                <p className="occupancy"> <strong>Max Occupancy: </strong> {occupancy} </p>
                {/*This was a test to make sure that start/end times carried over to results*/}
                {/*                 <p> {startTime} </p>
                <p> {endTime} </p> */}

                <Button
                    onClick={updateReservation}
                    key={id}>Reserve this room 
                </Button>
            </Jumbotron>

        </div>
    );
}


export default withRouter(Results);