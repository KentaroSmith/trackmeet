import React from 'react';
import { Link } from "react-router-dom";
import {
    Jumbotron,
    Button
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { updateRoom } from "../../actions";

const Results = ({ roomName, features, building, occupancy, id }) => {
    const dispatch = useDispatch();

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
                <p className="features"> {features} </p>
                <p className="building"> {building} </p>
                <p className="occupancy"> {occupancy} </p>
                <label>Start Time <input type="datetime-local"></input></label>
                <label>End Time <input type="time"></input></label>

                <Button
                    onClick={() => dispatch(updateRoom({
                        id: id,
                        building: building,
                        roomName: roomName,
                        features: features,
                        occupancy: occupancy
                    }))}
                    key={id}>Reserve this room</Button>
                <Link to="/confirm">Continue</Link>
            </Jumbotron>

        </div>
    );
}


export default Results;