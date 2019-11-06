import React, { useState } from 'react';
import {
    Jumbotron,
    Button
} from 'reactstrap';

const Results = (props) => {
    return (
        <div>
            <Jumbotron>
                <h1 className="display-3">Results:</h1>
                <p className="lead"></p>
                <hr className="my-2"></hr>
                <p></p>
                <p className="lead">
                    <Button color="primary">Learn More</Button>
                </p>
            </Jumbotron>
        </div>
    );
}


export default Results;