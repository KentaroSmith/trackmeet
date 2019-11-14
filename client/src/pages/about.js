import React, { Component } from "react";
import { FaGithub, FaUser, FaAt } from 'react-icons/fa';
import { Card, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody, CardLink } from 'reactstrap';
import dan from '../assets/img/dan.jpeg';
import todd from '../assets/img/todd.jpg';
import kyle from '../assets/img/kyle.jpeg';
import './about.css';

class AboutUs extends Component {
    render() {
        return (
            <div className="about" >
                <CardDeck>
                    <Card>
                        <CardImg top width="100%" src={dan} alt="Card image cap" />
                        <CardBody>
                            <CardTitle className="font-weight-bold">Dan Smith</CardTitle>
                            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                            <CardText>Loving father to an adorable 8 year old (dog), Dan is a field technology expert for the City of Lawrence, looking to challenge himself by entering the world of Web Development.</CardText>
                            <CardLink className="text-success" href="https://kentarosmith.github.io/" target="_blank"><FaUser d="m35.9 31.4q0 2.6-1.6 4.2t-4.3 1.5h-19.5q-2.7 0-4.4-1.5t-1.6-4.2q0-1.2 0.1-2.3t0.3-2.5 0.6-2.4 0.9-2.2 1.4-1.8 1.9-1.2 2.5-0.4q0.2 0 1 0.5t1.6 1 2.4 1.1 3 0.5 3-0.5 2.4-1.1 1.7-1 0.9-0.5q1.4 0 2.5 0.4t1.9 1.2 1.4 1.8 0.9 2.2 0.6 2.4 0.4 2.5 0 2.3z m-7.1-20q0 3.6-2.5 6.1t-6.1 2.5-6-2.5-2.6-6.1 2.6-6 6-2.5 6.1 2.5 2.5 6z" />
                            </CardLink>
                            <CardLink className="text-success" href="https://github.com/KentaroSmith" target="_blank">
                                <FaGithub d="m17.5 2.5c9.7 0 17.5 8 17.5 18 0 7.9-5 14.7-12 17h-0.3c-0.6 0-0.9-0.5-0.9-0.9 0-0.7 0.1-2.5 0.1-4.9 0-1.6-0.7-2.8-1.3-3.3 3.9-0.5 8.1-2 8.1-8.9 0-1.9-0.7-3.6-1.8-4.8 0.1-0.5 0.8-2.3-0.2-4.8h-0.4c-0.6 0-2.1 0.3-4.4 1.9-1.4-0.4-2.9-0.6-4.4-0.6s-3 0.2-4.4 0.6c-2.3-1.6-3.8-1.9-4.4-1.9h-0.4c-1 2.5-0.3 4.3-0.2 4.8-1.1 1.2-1.8 2.9-1.8 4.8 0 6.9 4.1 8.4 8 8.9-0.5 0.4-0.9 1.2-1.1 2.4-0.5 0.2-1.2 0.5-2 0.5-1 0-2.2-0.4-3.1-2 0 0-1-1.7-2.7-1.9-0.2 0-1.7 0-0.1 1.1 0 0 1.2 0.6 2 2.7 0 0 0.7 2.6 4.1 2.6 0.6 0 1.1 0 1.7-0.2v3c0 0.4-0.2 0.9-0.8 0.9h-0.3c-7-2.3-12-9.1-12-17 0-10 7.8-18 17.5-18z" />
                            </CardLink>

                            <CardLink className="text-success" href="daniel.smith8795@gmail.com" target="_blank"><FaAt d="m24.7 17.3q0-2.4-1.2-3.8t-3.3-1.3q-1.4 0-2.8 0.6t-2.4 1.9-1.8 3.1-0.7 4q0 2.5 1.2 3.9t3.4 1.3q2.1 0 3.9-1.5t2.7-3.7 1-4.5z m12.6 2.7q0 2.5-0.8 4.4t-2.2 3-3 1.7-3.2 0.6q-0.1 0-0.4 0t-0.3 0q-2.1 0-3.2-1.2-0.6-0.7-0.7-1.8-1.2 1.4-3 2.4t-3.8 1q-3.6 0-5.6-2.1t-2-6q0-3.5 1.5-6.5t4-4.7 5.5-1.7q1.9 0 3.4 0.7t2.4 2.3l0-0.5 0.3-1.2q0-0.1 0.1-0.3t0.2-0.1h2.7q0.1 0 0.3 0.2 0.1 0.2 0 0.4l-2.7 13.7q-0.1 0.5-0.1 1.1 0 0.8 0.3 1.1t1 0.3q0.6 0 1.3-0.1t1.6-0.5 1.7-1.2 1.3-1.9 0.5-3.1q0-6.5-3.9-10.4t-10.4-3.9q-2.9 0-5.5 1.1t-4.6 3.1-3 4.5-1.1 5.6 1.1 5.5 3 4.6 4.6 3 5.5 1.2q5.1 0 9.1-3.2 0.2-0.2 0.5-0.2t0.5 0.3l0.9 1.1q0.2 0.2 0.2 0.5-0.1 0.3-0.3 0.5-2.3 1.8-5.1 2.8t-5.8 1q-3.4 0-6.6-1.3t-5.5-3.7-3.6-5.5-1.4-6.6 1.4-6.7 3.6-5.4 5.5-3.7 6.6-1.3q7.7 0 12.5 4.7t4.7 12.4z" />
                            </CardLink>


                        </CardBody>
                    </Card>
                    <Card>
                        <CardImg top width="100%" src={todd} alt="Card image cap" />
                        <CardBody>
                            <CardTitle className="font-weight-bold">Todd Bartelt</CardTitle>
                            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                            <CardText>Todd's career as a software developer and engineer gave him opportunities to develop custom Windows applications for dozens of factory-floor and building-automation applications, and his love for making cool stuff eventually drew him to KU's program in full-stack web development. Todd lives in Lenexa, Kansas with his long-suffering wife and four wise-cracking kids.</CardText>
                            <CardLink className="text-success" href="https://toddbartelt.com" target="_blank"><FaUser d="m35.9 31.4q0 2.6-1.6 4.2t-4.3 1.5h-19.5q-2.7 0-4.4-1.5t-1.6-4.2q0-1.2 0.1-2.3t0.3-2.5 0.6-2.4 0.9-2.2 1.4-1.8 1.9-1.2 2.5-0.4q0.2 0 1 0.5t1.6 1 2.4 1.1 3 0.5 3-0.5 2.4-1.1 1.7-1 0.9-0.5q1.4 0 2.5 0.4t1.9 1.2 1.4 1.8 0.9 2.2 0.6 2.4 0.4 2.5 0 2.3z m-7.1-20q0 3.6-2.5 6.1t-6.1 2.5-6-2.5-2.6-6.1 2.6-6 6-2.5 6.1 2.5 2.5 6z" />
                            </CardLink>
                            <CardLink className="text-success" href="https://github.com/bartelto" target="_blank">
                                <FaGithub d="m17.5 2.5c9.7 0 17.5 8 17.5 18 0 7.9-5 14.7-12 17h-0.3c-0.6 0-0.9-0.5-0.9-0.9 0-0.7 0.1-2.5 0.1-4.9 0-1.6-0.7-2.8-1.3-3.3 3.9-0.5 8.1-2 8.1-8.9 0-1.9-0.7-3.6-1.8-4.8 0.1-0.5 0.8-2.3-0.2-4.8h-0.4c-0.6 0-2.1 0.3-4.4 1.9-1.4-0.4-2.9-0.6-4.4-0.6s-3 0.2-4.4 0.6c-2.3-1.6-3.8-1.9-4.4-1.9h-0.4c-1 2.5-0.3 4.3-0.2 4.8-1.1 1.2-1.8 2.9-1.8 4.8 0 6.9 4.1 8.4 8 8.9-0.5 0.4-0.9 1.2-1.1 2.4-0.5 0.2-1.2 0.5-2 0.5-1 0-2.2-0.4-3.1-2 0 0-1-1.7-2.7-1.9-0.2 0-1.7 0-0.1 1.1 0 0 1.2 0.6 2 2.7 0 0 0.7 2.6 4.1 2.6 0.6 0 1.1 0 1.7-0.2v3c0 0.4-0.2 0.9-0.8 0.9h-0.3c-7-2.3-12-9.1-12-17 0-10 7.8-18 17.5-18z" />
                            </CardLink>
                            <CardLink className="text-success" href="toddfbartelt@gmail.com" target="_blank"><FaAt d="m24.7 17.3q0-2.4-1.2-3.8t-3.3-1.3q-1.4 0-2.8 0.6t-2.4 1.9-1.8 3.1-0.7 4q0 2.5 1.2 3.9t3.4 1.3q2.1 0 3.9-1.5t2.7-3.7 1-4.5z m12.6 2.7q0 2.5-0.8 4.4t-2.2 3-3 1.7-3.2 0.6q-0.1 0-0.4 0t-0.3 0q-2.1 0-3.2-1.2-0.6-0.7-0.7-1.8-1.2 1.4-3 2.4t-3.8 1q-3.6 0-5.6-2.1t-2-6q0-3.5 1.5-6.5t4-4.7 5.5-1.7q1.9 0 3.4 0.7t2.4 2.3l0-0.5 0.3-1.2q0-0.1 0.1-0.3t0.2-0.1h2.7q0.1 0 0.3 0.2 0.1 0.2 0 0.4l-2.7 13.7q-0.1 0.5-0.1 1.1 0 0.8 0.3 1.1t1 0.3q0.6 0 1.3-0.1t1.6-0.5 1.7-1.2 1.3-1.9 0.5-3.1q0-6.5-3.9-10.4t-10.4-3.9q-2.9 0-5.5 1.1t-4.6 3.1-3 4.5-1.1 5.6 1.1 5.5 3 4.6 4.6 3 5.5 1.2q5.1 0 9.1-3.2 0.2-0.2 0.5-0.2t0.5 0.3l0.9 1.1q0.2 0.2 0.2 0.5-0.1 0.3-0.3 0.5-2.3 1.8-5.1 2.8t-5.8 1q-3.4 0-6.6-1.3t-5.5-3.7-3.6-5.5-1.4-6.6 1.4-6.7 3.6-5.4 5.5-3.7 6.6-1.3q7.7 0 12.5 4.7t4.7 12.4z" />
                            </CardLink>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardImg top width="100%" src={kyle} alt="Card image cap" />
                        <CardBody>
                            <CardTitle className="font-weight-bold">Kyle Wuellner</CardTitle>
                            {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                            <CardText>Kyle is currently working in the medical field and was seeking out a career change. That is what lead him to enroll in KU's Coding Bootcamp. Upon graduation he is looking forward to starting his new career. Kyle lives in Shawnee with his wife and three kids.</CardText>
                            <CardLink className="text-success" href="https://kwuellner.github.io" target="_blank"><FaUser d="m35.9 31.4q0 2.6-1.6 4.2t-4.3 1.5h-19.5q-2.7 0-4.4-1.5t-1.6-4.2q0-1.2 0.1-2.3t0.3-2.5 0.6-2.4 0.9-2.2 1.4-1.8 1.9-1.2 2.5-0.4q0.2 0 1 0.5t1.6 1 2.4 1.1 3 0.5 3-0.5 2.4-1.1 1.7-1 0.9-0.5q1.4 0 2.5 0.4t1.9 1.2 1.4 1.8 0.9 2.2 0.6 2.4 0.4 2.5 0 2.3z m-7.1-20q0 3.6-2.5 6.1t-6.1 2.5-6-2.5-2.6-6.1 2.6-6 6-2.5 6.1 2.5 2.5 6z" />
                            </CardLink>
                            <CardLink className="text-success" href="https://github.com/kwuellner" target="_blank">
                                <FaGithub d="m20.1 2.9q4.7 0 8.6 2.3t6.3 6.2 2.3 8.6q0 5.6-3.3 10.1t-8.4 6.2q-0.6 0.1-0.9-0.2t-0.3-0.7q0 0 0-1.7t0-3q0-2.1-1.2-3.1 1.3-0.2 2.3-0.4t2.1-0.9 1.8-1.5 1.2-2.3 0.5-3.4q0-2.7-1.8-4.6 0.8-2-0.2-4.5-0.6-0.2-1.8 0.2t-2 1l-0.9 0.5q-2-0.6-4.3-0.6t-4.2 0.6q-0.4-0.2-1-0.6t-1.9-0.8-1.9-0.3q-1 2.5-0.1 4.5-1.8 1.9-1.8 4.6 0 1.9 0.5 3.4t1.1 2.3 1.8 1.5 2.1 0.9 2.3 0.4q-0.9 0.8-1.1 2.3-0.4 0.2-1 0.3t-1.3 0.1-1.4-0.5-1.3-1.4q-0.4-0.7-1-1.1t-1.1-0.6l-0.5 0q-0.5 0-0.6 0.1t-0.1 0.2 0.2 0.3 0.2 0.3l0.2 0.1q0.5 0.2 1 0.9t0.7 1.1l0.2 0.5q0.3 0.9 1 1.4t1.5 0.7 1.5 0.1 1.3-0.1l0.5 0q0 0.8 0 1.9t0 1.2q0 0.5-0.3 0.7t-0.9 0.2q-5.2-1.7-8.4-6.2t-3.3-10.1q0-4.7 2.3-8.6t6.2-6.2 8.6-2.3z m-10.6 24.6q0.1-0.2-0.2-0.3-0.2-0.1-0.2 0.1-0.1 0.1 0.1 0.2 0.2 0.2 0.3 0z m0.7 0.7q0.1-0.1-0.1-0.3-0.2-0.2-0.3-0.1-0.2 0.1 0 0.4 0.3 0.2 0.4 0z m0.7 1q0.2-0.1 0-0.4-0.2-0.3-0.4-0.1-0.2 0.1 0 0.4t0.4 0.1z m0.9 1q0.2-0.2-0.1-0.4-0.3-0.3-0.4-0.1-0.2 0.2 0 0.4 0.3 0.3 0.5 0.1z m1.3 0.5q0-0.2-0.3-0.3-0.4-0.1-0.4 0.1t0.2 0.4q0.4 0.1 0.5-0.2z m1.4 0.1q0-0.2-0.4-0.2-0.4 0-0.4 0.2 0 0.3 0.4 0.3 0.4 0 0.4-0.3z m1.3-0.2q-0.1-0.2-0.4-0.2-0.4 0.1-0.3 0.4t0.4 0.1 0.3-0.3z" />
                            </CardLink>
                            <CardLink className="text-success" href="kyle.m.wuellner@gmail.com" target="_blank"><FaAt d="m24.7 17.3q0-2.4-1.2-3.8t-3.3-1.3q-1.4 0-2.8 0.6t-2.4 1.9-1.8 3.1-0.7 4q0 2.5 1.2 3.9t3.4 1.3q2.1 0 3.9-1.5t2.7-3.7 1-4.5z m12.6 2.7q0 2.5-0.8 4.4t-2.2 3-3 1.7-3.2 0.6q-0.1 0-0.4 0t-0.3 0q-2.1 0-3.2-1.2-0.6-0.7-0.7-1.8-1.2 1.4-3 2.4t-3.8 1q-3.6 0-5.6-2.1t-2-6q0-3.5 1.5-6.5t4-4.7 5.5-1.7q1.9 0 3.4 0.7t2.4 2.3l0-0.5 0.3-1.2q0-0.1 0.1-0.3t0.2-0.1h2.7q0.1 0 0.3 0.2 0.1 0.2 0 0.4l-2.7 13.7q-0.1 0.5-0.1 1.1 0 0.8 0.3 1.1t1 0.3q0.6 0 1.3-0.1t1.6-0.5 1.7-1.2 1.3-1.9 0.5-3.1q0-6.5-3.9-10.4t-10.4-3.9q-2.9 0-5.5 1.1t-4.6 3.1-3 4.5-1.1 5.6 1.1 5.5 3 4.6 4.6 3 5.5 1.2q5.1 0 9.1-3.2 0.2-0.2 0.5-0.2t0.5 0.3l0.9 1.1q0.2 0.2 0.2 0.5-0.1 0.3-0.3 0.5-2.3 1.8-5.1 2.8t-5.8 1q-3.4 0-6.6-1.3t-5.5-3.7-3.6-5.5-1.4-6.6 1.4-6.7 3.6-5.4 5.5-3.7 6.6-1.3q7.7 0 12.5 4.7t4.7 12.4z" />
                            </CardLink>
                        </CardBody>
                    </Card>
                </CardDeck >
            </div >
        );
    };
};

export default AboutUs;