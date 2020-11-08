// import Head from 'next/head'
import React, { Component } from 'react';
import Layout from '../components/Layout';
import CreatableSelect from 'react-select/creatable';
import { Button, FormGroup, Form, Row, Col, Label, Input, Alert } from "reactstrap";
import Slider from 'rc-slider';
import styles from '../styles/Radio.module.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]
const options2 = [
  { value: 'cs501', label: 'cs501' },
  { value: 'Phi251', label: 'Phi251' },
  { value: 'map123', label: 'map123' },
]
const options3 = [
  { value: 'thala', label: 'thala' },
  { value: 'thalapathy', label: 'thalapathy' },
  { value: 'superstar', label: 'superstar' },
]

const marks = {
  1: <strong>1</strong>,
  2: <strong>2</strong>,
  3: <strong>3</strong>,
  4: <strong>4</strong>,
  5: <strong>5</strong>
};

export default class Rate extends Component {
  state = {
    universities: [],
    courses: [],
    profs: [],
    selectedProf: {},
    selectedUni: {},
    selectedCourse: {},
    uniSelect: false, //switch to disabled,
    qualityRating: 1,
    difficultyRating: 1,
    wytia: "",
    credit: "",
    textbook: "",
    attendance: "",
    grade: "None",
    comment: "",
    email: "",
    password: "",
    confirmPassword: "",
    tandc: false,
    errors: false,
  }
  handleUniChange = (newValue, actionMeta) => {
    this.setState({ selectedUni: newValue, uniSelect: true });
  };
  handleCourseChange = (newValue, actionMeta) => {
    this.setState({ selectedCourse: newValue });
  };
  handleProfChange = (newValue, actionMeta) => {
    this.setState({ selectedProf: newValue });
  };
  handleInputChange = (inputValue, actionMeta) => { };

  handleQualitySlider = (val) => {
    this.setState({ qualityRating: val });
  }

  handleDifficultySlider = (val) => {
    this.setState({ difficultyRating: val });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(this.state.selectedUni).length === 0 && this.state.selectedUni.constructor === Object){
      this.setState({errors: true});
    }
    else if(Object.keys(this.state.selectedCourse).length === 0 && this.state.selectedCourse.constructor === Object){
      this.setState({errors: true});
    }
    else if(Object.keys(this.state.selectedProf).length === 0 && this.state.selectedProf.constructor === Object){
      this.setState({errors: true});
    }
    else if(this.state.wytia === ""){
      this.setState({errors: true});
    }
    else if(this.state.credit === ""){
      this.setState({errors: true});
    }
    else if(this.state.textbook === ""){
      this.setState({errors: true});
    }
    else if(this.state.attendance === ""){
      this.setState({errors: true});
    }
    else if(this.state.comment === ""){
      this.setState({errors: true});
    }
    else if(this.state.tandc === false){
      this.setState({errors: true});
    }
    else{
      this.setState({errors: false});
    }
    console.log(this.state);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTac = () =>{
    this.setState({tandc: !this.state.tandc});
  } 
  componentDidMount() {
    this.setState({
      universities: options, //check if there is a nbetter way to do it with SSR
      courses: options2,
      profs: options3
    })
  }

  render() {
    return (
      <Layout>
        <Form>
          <FormGroup>
            {/* Select University */}
            <h5>University</h5>
            <CreatableSelect
              isClearable
              onChange={this.handleUniChange}
              onInputChange={this.handleInputChange}
              options={this.state.universities}
              placeholder="Select or create your Uni"
            />
          </FormGroup>
          <FormGroup>
            {/* Select Course */}
            <h5>Course</h5>
            <CreatableSelect
              isClearable
              onChange={this.handleCourseChange}
              onInputChange={this.handleInputChange}
              options={this.state.courses}
              placeholder="Select or create your Course"
              isDisabled={!this.state.uniSelect}
            />
          </FormGroup>
          <FormGroup>
            {/* Select Prof */}
            <h5>Professor</h5>
            <CreatableSelect
              isClearable
              onChange={this.handleProfChange}
              onInputChange={this.handleInputChange}
              options={this.state.profs}
              placeholder="Select or enter your professor"
              isDisabled={!this.state.uniSelect}
            />
          </FormGroup>
          <FormGroup >
            {/* Quality */}
            <h5>Quality:</h5>
            <Slider min={1} max={5} marks={marks} name="quality" onChange={(val) => this.handleQualitySlider(val)} className="mb-4"/>
          </FormGroup>
          <FormGroup>
            {/* Difficulty */}
            <h5>Difficulty:</h5>
            <Slider min={1} max={5} marks={marks} name="difficulty" onChange={(val) => this.handleDifficultySlider(val)} className="mb-5"/>
          </FormGroup>
          <FormGroup>
            {/* Would you take this again */}
            <Row>
              <Col sm="4">
                <h5>Would you take this class again?</h5>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Yup
              <input type="radio" name="wytia" value="YES" onClick={(e) => this.handleChange(e)} checked={this.state.wytia === "YES"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Nope
              <input type="radio" name="wytia" value="NO" onClick={(e) => this.handleChange(e)} checked={this.state.wytia === "NO"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            {/* Class taken for credit? */}
            <Row>
              <Col sm="4">
                <h5>Did you take this class for credit?</h5>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Yup
              <input type="radio" name="credit" value="YES" onChange={(e) => this.handleChange(e)} checked={this.state.credit === "YES"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Nope
              <input type="radio" name="credit" value="NO" onChange={(e) => this.handleChange(e)} checked={this.state.credit === "NO"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            {/* Textbook Use */}
            <Row>
              <Col sm="4">
                <h5>Did you follow a textbook?</h5>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Yup
              <input type="radio" name="textbook" value="YES" onChange={(e) => this.handleChange(e)} checked={this.state.textbook === "YES"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Nope
              <input type="radio" name="textbook" value="NO" onChange={(e) => this.handleChange(e)} checked={this.state.textbook === "NO"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            {/* Attendance */}
            <Row>
              <Col sm="4">
                <h5>Was attendance mandatory?</h5>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Yup
              <input type="radio" name="attendance" value="YES" onChange={(e) => this.handleChange(e)} checked={this.state.attendance === "YES"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
              <Col sm="2">
                <label className={styles.container}>Nope
              <input type="radio" name="attendance" value="NO" onChange={(e) => this.handleChange(e)} checked={this.state.attendance === "NO"} />
                  <span className={styles.checkmark}></span>
                </label>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            {/* Grade Received */}
            <Label for="gradeReceived"><h5>Grade Received <small>(Optional)</small></h5></Label>
            <Input type="select" name="grade" id="gradeReceived" value={this.state.grade} onChange={(e) => this.handleChange(e)}>
              <option>None</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
              <option>E</option>
            </Input>
          </FormGroup>
          {/* Select tags */}
          {/* Get specific */}
          <FormGroup>
            <Label for="comment"><h5>Your feedback:</h5></Label>
            <Input type="textarea" name="comment" id="comment" value={this.state.comment} onChange={(e) => this.handleChange(e)} />
          </FormGroup>
          {/* Create account */}
          <FormGroup>
            <h5>Create Account <small>(optional)</small></h5>
            <Label for="comment"><h6>Dont worry!, You'll stay anonymous.</h6></Label>
            <FormGroup row>
              <Label for="email" sm={2}>Email</Label>
              <Col sm={10}>
                <Input type="email" name="email" id="email" onChange={(e) => this.handleChange(e)} value={this.state.email} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="password" sm={2}>Password</Label>
              <Col sm={10}>
                <Input type="password" name="password" id="password"  onChange={(e) => this.handleChange(e)} value={this.state.password} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="confirmPassword" sm={2}>Confirm Password</Label>
              <Col sm={10}>
                <Input type="password" name="confirmPassword" id="confirmPassword"  onChange={(e) => this.handleChange(e)} value={this.state.confirmPassword} />
              </Col>
            </FormGroup>
          </FormGroup>
          {/* captcha */}
          {/* terms and conditions */}
          <FormGroup check className="mt-2 mb-3">
            <Label check>
              <Input type="checkbox" id="checkbox2" name="tandc" checked={this.state.tandc} onChange={this.handleTac} />{' '}
              I acknowledge that I have read and agreed to the Rate My Course <a href="#">Site Guidelines</a>, <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
              Submitted data becomes the property of RateMyCourses.com. IP addresses are logged.
              {/* recheck before launch */}
            </Label>
          </FormGroup>
          {/* submit */}
          <Row className="align-items-center mb-3">
            <Col></Col>
            <Col className="text-center">
            <Button color="primary" onClick={(e) => this.handleSubmit(e)} className="pl-5 pr-5">Submit</Button>
            </Col>
            <Col></Col>
          </Row>
          
        </Form>
        {this.state.errors && <Alert color="danger">
        Oops! You missed something!
      </Alert>}
      </Layout>
    );
  }
}