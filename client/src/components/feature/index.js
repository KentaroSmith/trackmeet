import React from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
const Checkboxes = ({feature, key}) =>{
    return(
        <Form key={key}>
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