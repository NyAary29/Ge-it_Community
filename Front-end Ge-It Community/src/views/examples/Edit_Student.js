import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Row } from "reactstrap";
import MyLoading from "../../components/Loading/MyLoading";
import Header from "../../components/Headers/Header";
import "../../assets/css/Login_admin.css";

const Edit_Student = () => {
  const { matricule } = useParams();
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState({
    N_matricule: '',
    nom: '',
    prenom: '',
    adresse: '',
    birthday: '',
    tel: '',
    email: '',
    password: '',
    niveau: '',
    sexe: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8800/student/${matricule}`)
      .then(res => {
        setStudentData(res.data[0]);
      })
      .catch(err => {
        console.error("Erreur de récupération des données de l'étudiant", err);
      });
  }, [matricule]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8800/modify_student/${matricule}`, studentData)
      .then(res => {
        navigate("/admin/students")
        alert('Modification réussie');
      })
      .catch(err => {
        console.error("Erreur lors de la modification", err);
        alert("Échec de la modification");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <MyLoading />
      <Header />
      <Col lg="10" md="12" style={{ top: "10px" }} className="mx-auto">
        <Card className="bg-secondary shadow border-0">
          <CardHeader
            className="pb-5"
            style={{
              background: "linear-gradient(to top, #ee7724, #c92628, #dd5824, #b44593)",
              border: "none",
            }}
          >
            <div className="text-center">
              <Row className="justify-content-center">
                <Col xs="3" className="d-flex justify-content-center align-items-center">
                  <Link to="#">
                    <img
                      alt="..."
                      src={require("../../assets/img/logo.png")}
                      style={{ borderRadius: "50%" }}
                    />
                  </Link>
                </Col>
              </Row>
            </div>
          </CardHeader>

          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Or sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleUpdate}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="N_matricule">Register Number</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-id-card" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Register Number"
                        type="text"
                        name="N_matricule"
                        id="N_matricule"
                        value={studentData.N_matricule}
                        onChange={handleInputChange}
                        required
                        readOnly
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="nom">Last Name</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Last Name"
                        type="text"
                        name="nom"
                        id="nom"
                        value={studentData.nom}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="prenom">First Name</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name"
                        type="text"
                        name="prenom"
                        id="prenom"
                        value={studentData.prenom}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="adresse">Address</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-address-card" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Address"
                        type="text"
                        name="adresse"
                        id="adresse"
                        value={studentData.adresse}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="birthday">Birthday</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-birthday-cake" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Birthday"
                        type="date"
                        name="birthday"
                        id="birthday"
                        value={studentData.birthday}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="tel">Phone Number</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-mobile" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Phone number"
                        type="tel"
                        name="tel"
                        id="tel"
                        value={studentData.tel}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        id="email"
                        value={studentData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="password">Password</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-key" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        id="password"
                        value={studentData.password}
                        onChange={handleInputChange}
                        required
                        readOnly
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="niveau">Level</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-graduation-cap" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Level"
                        type="text"
                        name="niveau"
                        id="niveau"
                        value={studentData.niveau}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="sexe">Gender</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-venus-mars" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        name="sexe"
                        id="sexe"
                        value={studentData.sexe}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-4">
                  Save
                </button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Edit_Student;
