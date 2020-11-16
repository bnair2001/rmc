import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, CardGroup, CardBody } from 'reactstrap';
import styles from "../styles/Home.module.css";
import Typing from 'react-typing-animation';

const Example = (props) => {
    return (
        <span>
        <Row >
             <Typing>  
                <Typing.Speed ms={50} />
                <span><h2>Anonymously post and read reviews on your university courses.</h2></span>
            </Typing>
        </Row>
        <Row className={"align-items-center " + styles.setht}>
           
            <Col xl="12">
                <CardGroup className="block" >
                    <Card>
                        <a class="card-block stretched-link text-decoration-none" href="/find">
                            <CardBody>
                                <CardTitle className="text-center"><h1>Find a Course</h1></CardTitle>
                            </CardBody>
                        </a>
                    </Card>
                    <Card>
                        <a class="card-block stretched-link text-decoration-none" href="/rate">
                            <CardBody>
                                <CardTitle className="text-center"><h1>Rate a Course</h1></CardTitle>
                            </CardBody>
                        </a>
                    </Card>
                </CardGroup>
            </Col>

        </Row>
        </span>
    );
};

export default Example;