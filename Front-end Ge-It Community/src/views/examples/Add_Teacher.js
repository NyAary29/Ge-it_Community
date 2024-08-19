import React, { useState } from "react";
import axios from "axios";
import MyLoading from "components/Loading/MyLoading";
import Header from "components/Headers/Header";
import { Link } from "react-router-dom";
import "../../assets/css/Login_admin.css";

import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Add_Teacher = () => {
  const [values, setValues] = useState({
    N_matricule: '',
    nom: '',
    prenom: '',
    adresse: '',
    grade: '',
    tel: '',
    email: '',
    password: '',
    specialite: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8800/add_teacher', values)
      .then(res => alert('Insertion avec succès'))
      .catch(err => alert("Echec d'insertion"))
  }

  return (
    <div>
      <MyLoading />
      <Header />
      <Col lg="10" md="12" style={{ top: "10px" }} className="mx-auto" >
        <Card className="bg-secondary shadow border-0">
          <CardHeader
            className="pb-5"
            style={{
              background:
                "linear-gradient(to top, #ee7724, #c92628, #dd5824, #b44593)",
              border: "none",
            }}
          >
            <div className="text-center">
              <Row className="justify-content-center">
                <Col
                  xs="3"
                  className="d-flex justify-content-center align-items-center"
                >
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
            <Form role="form" onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-id-card" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Register Number"
                        type="text"
                        id="N_matricule"
                        onChange={(e) =>
                          setValues({ ...values, N_matricule: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Name"
                        type="text"
                        id="nom"
                        onChange={(e) =>
                          setValues({ ...values, nom: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="First Name"
                        type="text"
                        id="prenom"
                        onChange={(e) =>
                          setValues({ ...values, prenom: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-address-card" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Address"
                        type="text"
                        id="adresse"
                        onChange={(e) =>
                          setValues({ ...values, adresse: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Grade"
                        type="text"

                        id="grade"
                        onChange={(e) =>
                          setValues({ ...values, grade: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                </Col>
                <Col md="6">
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-mobile" aria-hidden="true" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Phone number"
                        type="tel"
                        id="tel"
                        onChange={(e) =>
                          setValues({ ...values, tel: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        id="email"
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-key" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        id="password"
                        onChange={(e) =>
                          setValues({ ...values, password: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-briefcase-medical" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Speciality"
                        type="text"
                        id="specialite"
                        onChange={(e) =>
                          setValues({ ...values, specialite: e.target.value })
                        }
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                </Col>
              </Row>



              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-4"  >
                  Sign in
                </button>
              </div>

            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Add_Teacher;
