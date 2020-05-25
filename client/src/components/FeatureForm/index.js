import React, { useEffect, useState } from 'react';
import {
    Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import API from "../../utils/api.js";

const FeatureForm = ({ featureId }) => {
    // if featureId is passed in, form is in UPDATE mode
    // else, form is in CREATE mode

    console.log(featureId);

    const [feature, setFeature] = useState({name: "", description: ""} );

    useEffect(() => {
        console.log("useEffect, locationId = " + featureId);
        if (!!featureId) {
            getFeature(featureId);
        }
    }, [featureId]);

    const getFeature = (id) => {
        console.log("feature id " + id );
        API.getFeature(id)
            .then(res => {
                console.log(res.data);
                setFeature(res.data);
            });
    };

    const updateFeature = (event) => {
        console.log("updating feature");
        event.preventDefault();

        API.updateFeature(featureId, feature)
            .then(res => {
                console.log(res.data);
            });
    };

    const createFeature = (event) => {
        console.log("creating feature");

        event.preventDefault();

        API.saveFeature(feature)
            .then(res => {
                console.log(res.data);
            });
    };

    return (
        <Form onSubmit={!!featureId ? updateFeature : createFeature}>
            feature: {featureId}
            <FormGroup>
                <Input name="name" type="text" placeholder="Name of feature"
                    value={feature.name}
                    onChange={(event) => setFeature({ name: event.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Input name="description" type="text" placeholder="Description"
                    value={feature.description}
                    onChange={(event) => setFeature({ description: event.target.value })}
                />
            </FormGroup>
           
            <Button type="submit" className="btn-block">{!!featureId ? "Update" : "Save"}</Button>
        </Form>
    );
};


export default FeatureForm;