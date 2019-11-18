import React, { useCallback, useContext, useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../../components/Firebase/firebase";
import { AuthContext } from "../../components/Firebase/auth";
import {
    Button, Form, FormGroup, Input, Label,
    Card, CardImg, CardBody, CardText, CardHeader
} from 'reactstrap';
import API from "../../utils/api";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../actions";
import "./style.css";

const Rooms = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        getFeatures();
    }, []);

    const getFeatures = () => {
        API.getFeatures()
            .then(res => {
                console.log(res.data);
                setFeatures(res.data);
            });
    };

    const addRoom = event => {
        event.preventDefault();
        API.saveRoom({
            building: "Regnier Center",
            roomName: name
        }
        ).then(res => console.log(res.data))
            .catch(err => console.log(err));

    };

    return (
        <div>
            <Card id="room-card" className="mx-auto shadow-lg">
                <CardHeader className="login-header">Create a room</CardHeader>
                <CardBody>
                    <Form onSubmit={addRoom}>
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
                                    <Input type="checkbox" data-id={feature._id} />{' '}
                                    {feature.name}
                                </Label>
                            </FormGroup>
                        ))
                        }
                        <Button type="submit" className="btn-block">Create room</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );

}

export default withRouter(Rooms);