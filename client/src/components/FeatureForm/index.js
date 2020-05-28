import React, { useEffect, useState } from 'react';
import {
    Button, Form, FormGroup, Input,
} from 'reactstrap';

const FeatureForm = ({ featureId, features, onSave }) => {
    // if featureId is passed in, form is in UPDATE mode
    // else, form is in CREATE mode

    const [feature, setFeature] = useState({name: "", description: ""} );

    useEffect(() => {
        console.log("useEffect, locationId = " + featureId);
        if (!!featureId) {
            setFeature(features.find((feature) => feature._id === featureId));
        }
    }, [featureId]);


    return (
        <Form onSubmit={(event) => {
                event.preventDefault();
                !featureId 
                    ? onSave(feature)
                    : onSave(featureId, feature);
            }}
        >
            <FormGroup>
                <Input name="name" type="text" placeholder="Name of feature"
                    value={feature.name}
                    onChange={(event) => setFeature( {...feature,  name: event.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Input name="description" type="text" placeholder="Description"
                    value={feature.description}
                    onChange={(event) => setFeature( {...feature,  description: event.target.value })}
                />
            </FormGroup>
           
            <Button type="submit" className="btn-block">{!!featureId ? "Update" : "Save"}</Button>
        </Form>
    );
};


export default FeatureForm;