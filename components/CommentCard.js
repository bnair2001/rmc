import React from "react";
import { Card, CardTitle, CardText, Col, Row } from "reactstrap";
import styles from "../styles/Card.module.css";
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class CommentCard extends React.Component {
    render() {
        return (
            <div>
                <Card body className={styles.card}>
                    <Row >
                        <Col sm="2" className="align-self-center">
                            <Row><Col className="text-center">Quality</Col></Row>
                            <Row><Col className="text-center">3.0</Col></Row>
                            <Row><Col className="text-center">Difficulty</Col></Row>
                            <Row><Col className="text-center">4.0</Col></Row>
                        </Col>
                        <Col sm="10" >
                            <Row className={"justify-content-between "+ styles.nogutrow}>
                                <Col className={styles.nogutcol}>
                                    <CardTitle>CS50</CardTitle>
                                </Col>
                                <Col className={"text-right " + styles.nogutcol}>
                                    20 october, 2019.
                                </Col>
                                </Row>
                            <Row><CardText>With supporting text below as a natural lead-in to additional content. natural lead-in to additional content.natural lead-in to additional content.natural lead-in to additional content.natural lead-in to additional content.natural lead-in to additional content.natural lead-in to additional content.</CardText></Row>
                            <Row>
                                <CardText>
                                    <a href="#"><FontAwesomeIcon icon={faThumbsUp} className={styles.reaction} size="lg" /></a>
                                    <a href="#"><FontAwesomeIcon icon={faThumbsDown} className={styles.reaction} size="lg"/></a>
                                </CardText>
                            </Row>
                        </Col>
                    </Row>
                </Card>
                
            </div>

        );
    }
}

export default CommentCard;


