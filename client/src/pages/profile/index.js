import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, CardBody, Label, Form, FormGroup, Input, Button } from 'reactstrap';
import API from "../../utils/api";

const ProfilePage = () => {
    const user = useSelector(state => state.user);
    const [userCopy, setUserCopy] = useState();

    useEffect(() => {
        setUserCopy(user);
    }, [user])

    const saveUser = (event) => {
        event.preventDefault();
        API.updateUser(userCopy);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <CardHeader>
                                User Profile
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={saveUser}>
                                    <FormGroup>
                                        <Label>First name</Label>
                                        <Input
                                            name="first name"
                                            type="text"
                                            placeholder="First name"
                                            value={!!userCopy ? userCopy.firstName : ""}
                                            onChange={(event) => setUserCopy({ ...userCopy, firstName: event.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Last name</Label>
                                        <Input
                                            name="last name"
                                            type="text"
                                            placeholder="Last name"
                                            value={!!userCopy ? userCopy.lastName : ""}
                                            onChange={(event) => setUserCopy({ ...userCopy, lastName: event.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Phone</Label>
                                        <Input
                                            name="phone"
                                            type="phone"
                                            placeholder="Phone"
                                            value={!!userCopy ? userCopy.phone : ""}
                                            onChange={(event) => setUserCopy({ ...userCopy, phone: event.target.value })}
                                        />

                                    </FormGroup>
                                    <Button type='submit'>Save Changes</Button>
                                </Form>
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProfilePage;