import { useRouter } from 'next/router'
import Layout from '../../../components/Layout';
import Badges from '../../../components/Badges';
import { Row, Col, Card, CardTitle, CardText, Button, Badge, CardBody, FormGroup, Input, Form } from "reactstrap";
import styles from "../../../styles/Course.module.css";
import CommentCard from "../../../components/CommentCard";

const Post = () => {
  const router = useRouter()
  const { cid, uni } = router.query
  return (
    <Layout>
      {/* <p>Post: {cid}</p>
      <p>Uni: {uni}</p> */}
      <Row className="align-items-center mt-3">
        <Col sm="4">
          <Card body>
            <CardTitle>John Smith</CardTitle>
            <CardText>Professor of mathematics at university of uranus</CardText>
            <Badges/>
          </Card>
        </Col>
        <Col sm="8">
          <Card>
              <CardBody>
                <CardTitle className="text-center"><h1>CS 50</h1></CardTitle>
                <CardText className="text-center">University of Uranus</CardText>
              </CardBody>
          </Card>
          <Form>
          <FormGroup className={styles.parent}>
            <Input type="select" name="course" id="CourseSelect" className={styles.main}>
              <option>CS 50</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          </Form>
        </Col>
      </Row>
      <CommentCard />
    </Layout>

  );
}

export default Post