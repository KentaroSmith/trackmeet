import React, { useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, CardHeader, CardBody, Label, Form, FormGroup, Input, Button } from 'reactstrap';
import { AuthContext } from "../../components/Firebase/auth";

const ProfilePage = () => {
    const { currentUser } = useContext(AuthContext);
    const user = useSelector(state => state.user);

    const [userCopy, setUserCopy] = useState();

    useEffect(() => {
        console.log(user);
        setUserCopy(user);
    }, [user])

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
                                <Form>
                                    <FormGroup>
                                        <Label>First name</Label>
                                        <Input 
                                            name="first name" 
                                            type="text" 
                                            placeholder="First name"
                                            value={!!userCopy ? userCopy.firstName : ""}
                                            onChange={(event) => setUserCopy({...userCopy, firstName: event.target.value})}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Last name</Label>
                                        <Input 
                                            name="last name" 
                                            type="text" 
                                            placeholder="Last name"
                                            value={user.lastName}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Phone</Label>
                                        <Input 
                                            name="phone" 
                                            type="phone" 
                                            placeholder="Phone"
                                            value={user.phone}
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