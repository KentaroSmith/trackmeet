import React from 'react';
import { withRouter } from "react-router-dom";
import {
    Button, Card, CardHeader, CardFooter, CardBody, Badge, Container, Row, Col,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { updateRoom, updateTimes } from "../../actions";
import "./style.css";

const Result = ({ room, locations, features, startTime, endTime, history }) => {
    const dispatch = useDispatch();
    let featureList = [];
    let locationName = "";
    for (let i = 0; i < features.length; i++) {
        if (room.features.includes(features[i]._id)) {
            featureList.push(features[i].name);
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
        <Card className="search-result h-100" >
            <CardHeader>
                <div className="location">{locationName}</div>
                <h4 className="roomName">{room.roomName}</h4>
            </CardHeader>
            <CardBody>
                {/* <p className="description">{room.description} </p> */}

                <Container>
                    <Row>
                        <Col>
                            <p className="description card-text">{room.description} </p>
                        </Col>
                    </Row>
                    <Row className="align-items-center" style={{ marginBottom: 10 }}>
                        <Col xs='12' style={{padding: 0}} >
                            {!featureList || featureList.map((feature) => {
                                return (
                                    <span key={feature}>
                                        <Badge pill style={{marginRight: 10}}>{feature}</Badge>
                                    </span>
                                )
                            })}
                        </Col>
                    </Row>
                </Container>
               

            </CardBody> 
            <CardFooter>
                <Container>
                    <Row className="align-items-center">
                        <Col xs="6">
                            <span className="capacity text-muted">Capacity: {room.capacity}</span>
                        </Col>
                        <Col xs="6" className="text-right">
                            <Button
                                outline
                                onClick={updateReservation}
                                key={room._id}>
                                Reserve
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </CardFooter>
        </Card>
    );
}


export default withRouter(Result);