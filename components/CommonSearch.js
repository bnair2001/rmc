import { Row, Col, Button } from "reactstrap";
import styles from "../styles/Home.module.css";

export default function CommonSearch() {
    return (
        <Row className={"align-items-center " + styles.setht}>
            <Col xl="12">
                <div class="form-group has-search">
                    <span class="fa fa-search form-control-feedback"></span>
                    <input type="text" class="form-control" placeholder="Search for your University" />
                </div>
                <div class="form-group has-search">
                    <span class="fa fa-search form-control-feedback"></span>
                    <input type="text" class="form-control" placeholder="Search for your professor or course name" />
                </div>
                <div className="mx-auto" style={{ width: "150px" }}>
                    <Button color="dark" style={{ width: "150px" }} >Search</Button>
                </div>
            </Col>
        </Row>
    );
}
