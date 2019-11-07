import React from 'react';
import {
    Jumbotron,
    Button
} from 'reactstrap';

const Results = ({ roomName, features, building, occupancy, id }) => {
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
                <Button href="#" key={id}>Reserve this room</Button>
            </Jumbotron>

        </div>
    );
}


export default Results;