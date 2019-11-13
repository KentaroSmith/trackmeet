import React from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
const Checkboxes = ({ feature }) => {
    return (
        <Form >
            <Label for="Features">Features: </Label>
            <FormGroup check>
                <Label check>
                    <Input type="checkbox" id="checkBox" value={feature}
                    />{' '} {feature}
                </Label>
            </FormGroup>
        </Form>
    )
}

export default Checkboxes