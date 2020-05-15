import React from 'react';
import { UncontrolledCollapse, Button, InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';

const Filter = () => (
    <div>
        <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
            Room Filter
    </Button>
        <UncontrolledCollapse toggler="#toggler">
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>Capacity Range</InputGroupText>
                    <Input type="number"></Input>
                </InputGroupAddon>
            </InputGroup>
        </UncontrolledCollapse>
    </div>
);

export default Filter;