// import Head from 'next/head'
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Button, FormGroup, Form, Row, Col, Label, Input, Alert } from "reactstrap";
import Slider from 'rc-slider';
import styles from '../styles/Radio.module.css';
import axios from 'axios';
import LoadingSm from '../components/LoadingSm';
import Router from 'next/router'

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

const tags = [
  {value:"LOTS OF HOMEWORK", label:"LOTS OF HOMEWORK"},
  {value:"GIVES GOOD FEEDBACK", label:"GIVES GOOD FEEDBACK"},
  {value:"AMAZING LECTURES", label:"AMAZING LECTURES"},
  {value:"PARTICIPATION MATTERS", label:"PARTICIPATION MATTERS"},
  {value:"TOUGH GRADER", label:"TOUGH GRADER"},
  {value:"TEST HEAVY", label:"TEST HEAVY"},
  {value:"CARING", label:"CARING"}, 
  {value:"HILARIOUS", label:"HILARIOUS"}
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
    loading: true,
    courseFormLoad: false,
    profFormLoad: false,
    universities: [],
    courses: [],
    profs: [],
    selectedProf: {},
    selectedUni: {},
    selectedCourse: {},
    uniSelect: false,
    courseSelect: false,
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
    errMessage: "",
    tags:[],
    selectedTag:[]
  }
  handleUniChange = (newValue, actionMeta) => {
    this.setState({ selectedUni: newValue, courseFormLoad: true});
    this.fetchCourses(newValue);
  };
  fetchCourses = async (newValue) =>{
    try {
      let result = await axios.post("/api/find-form",{"uni_id": newValue.value,"course_id": "","prof_id": ""});
      this.setState({
        courses: result.data.data,
        uniSelect: true ,
        courseFormLoad: false
      })
    } catch (error) {
      console.log(error);
    }
  };
  handleCourseChange = (newValue, actionMeta) => {
    this.setState({ selectedCourse: newValue, profFormLoad: true});
    this.fetchProfs(newValue);
  };
  fetchProfs = async(newValue) => {
    try {
      let result = await axios.post("/api/find-form",
      {"uni_id": this.state.selectedUni.value,
      "course_id": newValue.value,
      "prof_id": ""});
      this.setState({
        profs: result.data.data,
        courseSelect: true ,
        profFormLoad: false
      })
    } catch (error) {
      console.log(error);
    }
  };
  handleProfChange = (newValue, actionMeta) => {
    this.setState({ selectedProf: newValue });
  };
  handleTagChange = (newValue, actionMeta) => {
    this.setState({ selectedTag: newValue });
  };
  handleInputChange = (inputValue, actionMeta) => { };

  handleQualitySlider = (val) => {
    this.setState({ qualityRating: val });
  }

  handleDifficultySlider = (val) => {
    this.setState({ difficultyRating: val });
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    if (Object.keys(this.state.selectedUni).length === 0 && this.state.selectedUni.constructor === Object) {
      this.setState({ errors: true , errMessage: "Please select or create your university"});
    }
    else if (Object.keys(this.state.selectedCourse).length === 0 && this.state.selectedCourse.constructor === Object) {
      this.setState({ errors: true, errMessage: "Please select or create your course" });
    }
    else if (Object.keys(this.state.selectedProf).length === 0 && this.state.selectedProf.constructor === Object) {
      this.setState({ errors: true, errMessage: "Please select or create your professor" });
    }
    else if (this.state.wytia === "") {
      this.setState({ errors: true, errMessage: "Please answer if you would take this class again" });
    }
    else if (this.state.credit === "") {
      this.setState({ errors: true, errMessage: "Please answer if you took this class for credit" });
    }
    else if (this.state.textbook === "") {
      this.setState({ errors: true, errMessage: "Please answer if you needed a textbook for this class" });
    }
    else if (this.state.attendance === "") {
      this.setState({ errors: true, errMessage: "Please answer if your attendance was mandatory" });
    }
    else if (this.state.comment === "") {
      this.setState({ errors: true, errMessage: "Please leave a comment"});
    }
    else if (this.state.tandc === false) {
      this.setState({ errors: true, errMessage: "Please agree to the terms and conditions" });
    }
    else {
      this.setState({loading:true});
      const formData = {
        selectedUni: this.state.selectedUni,
        selectedCourse: this.state.selectedCourse,
        selectedProf: this.state.selectedProf,
        qualityRating: this.state.qualityRating,
        difficultyRating: this.state.difficultyRating,
        wytia: this.state.wytia === "YES",
        credit: this.state.credit === "YES",
        textbook: this.state.textbook === "YES",
        attendance: this.state.attendance === "YES",
        grade: this.state.grade,
        tags: this.state.selectedTag,
        comment: this.state.comment,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        tandc: this.state.tandc
      }
      try {
        const response = await axios.post('/api/rate', formData);
        this.setState({ errors: false });
        Router.push('/success/'+response.data.data.pid);
      } catch (error) {
        console.log(error);
        this.setState({ errors: true, errMessage:"Something went wrong...Try again Later!", loadin:false });
      }
      console.log(formData);
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTac = () => {
    this.setState({ tandc: !this.state.tandc });
  }
  async componentDidMount() {
    try {
      let result = await axios.post("/api/find-form",{"uni_id": "","course_id": "","prof_id": ""});
      this.setState({
        universities: result.data.data,
        loading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Layout>
       {this.state.loading ? <Loading />:<Form>
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
          {this.state.courseFormLoad ? <LoadingSm/>: <FormGroup>
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
          </FormGroup>}
          {this.state.profFormLoad?<LoadingSm />:<FormGroup>
            {/* Select Prof */}
            <h5>Professor</h5>
            <CreatableSelect
              isClearable
              onChange={this.handleProfChange}
              onInputChange={this.handleInputChange}
              options={this.state.profs}
              placeholder="Select or enter your professor"
              isDisabled={!this.state.courseSelect}
            />
          </FormGroup>}
          <FormGroup >
            {/* Quality */}
            <h5>Quality:</h5>
            <Slider min={1} max={5} marks={marks} name="quality" onChange={(val) => this.handleQualitySlider(val)} className="mb-4" />
          </FormGroup>
          <FormGroup>
            {/* Difficulty */}
            <h5>Difficulty:</h5>
            <Slider min={1} max={5} marks={marks} name="difficulty" onChange={(val) => this.handleDifficultySlider(val)} className="mb-5" />
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
          <FormGroup>
            <h5>Select the tags that best describe your course <small>(Optional)</small></h5>
            <Select
                isMulti
                name="tags"
                options={tags}
                className="basic-multi-select"
                classNamePrefix="tag_select"
                defaultValue = {this.state.tags}
                onChange = {this.handleTagChange}
                onInputChange={this.handleInputChange}
            />
          </FormGroup>
          
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
                <Input type="password" name="password" id="password" onChange={(e) => this.handleChange(e)} value={this.state.password} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="confirmPassword" sm={2}>Confirm Password</Label>
              <Col sm={10}>
                <Input type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => this.handleChange(e)} value={this.state.confirmPassword} />
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
          {/* alert */}
          {this.state.errors && <Alert color="danger">
          {this.state.errMessage}
          </Alert>}
          {/* submit */}
          <Row className="align-items-center mb-3">
            <Col></Col>
            <Col className="text-center">
              <Button color="primary" onClick={(e) => this.handleSubmit(e)} className="pl-5 pr-5">Submit</Button>
            </Col>
            <Col></Col>
          </Row>

        </Form>}
       
      </Layout>
    );
  }
}