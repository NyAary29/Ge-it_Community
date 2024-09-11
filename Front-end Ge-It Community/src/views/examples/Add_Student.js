import React, { useState } from "react";
import axios from "axios";
import MyLoading from "components/Loading/MyLoading";
import Header from "components/Headers/Header";
import { Link, useNavigate } from "react-router-dom";
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
  Button,
  Label
} from "reactstrap";

const Add_Student = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    N_matricule: '',
    nom: '',
    prenom: '',
    adresse: '',
    birthday: '',
    tel: '',
    email: '',
    password: '',
    niveau: '',
    sexe: '',
    annee_inscription: new Date().getFullYear()
  });

  const handleGenerateId = async () => {
    try {
      const response = await axios.post('http://localhost:8800/api/generate_id', {
        name: values.nom + ' ' + values.prenom,
        year: values.annee_inscription,
      });
      const generatedId = response.data.user_id;
      setValues({ ...values, N_matricule: generatedId });
    } catch (error) {
      alert("Failed to generate ID");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8800/add_student', values);
      alert('Insertion avec succès');
      navigate("/admin/students");
    } catch (error) {
      alert("Echec d'insertion");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, sexe: event.target.value });
  };

  const handleChangeLevel = (event) => {
    setValues({ ...values, niveau: event.target.value });
  };

  const handleYearChange = (event) => {
    setValues({ ...values, annee_inscription: event.target.value });
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
            <Form role="form" onSubmit={handleSubmit}>
              <Row>
                <Col md="6">

                  <FormGroup>
                    <Label for="nom">Name</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="nom"
                        value={values.nom}
                        onChange={(e) => setValues({ ...values, nom: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <Label for="annee_inscription">Year of enrollment</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-calendar" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        id="annee_inscription"
                        value={values.annee_inscription}
                        onChange={handleYearChange}
                        required
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </InputGroup>
                  </FormGroup>


                  <FormGroup>
                    <Label for="adresse">Address</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-address-card" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="adresse"
                        value={values.adresse}
                        onChange={(e) => setValues({ ...values, adresse: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="birthday">Birthday</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-birthday-cake" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="date"
                        id="birthday"
                        value={values.birthday}
                        onChange={(e) => setValues({ ...values, birthday: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="tel">Phone number</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-mobile" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="tel"
                        id="tel"
                        value={values.tel}
                        onChange={(e) => setValues({ ...values, tel: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>

                <Col md="6">

                  <FormGroup>
                    <Label for="prenom">First Name</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="prenom"
                        value={values.prenom}
                        onChange={(e) => setValues({ ...values, prenom: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        id="email"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        id="password"
                        value={values.password}
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="niveau">Level</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-level-up" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        id="niveau"
                        value={values.niveau}
                        onChange={handleChangeLevel}
                      >
                        <option value="L1">L1</option>
                        <option value="L2">L2</option>
                        <option value="L3">L3</option>
                        <option value="M1">M1</option>
                        <option value="M2">M2</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>

                  <FormGroup>
                    <Label for="sexe">Gender</Label>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-venus-mars" aria-hidden="true"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        id="sexe"
                        value={values.sexe}
                        onChange={handleChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Input>
                    </InputGroup>
                  </FormGroup>


                </Col>
              </Row>
              <div className="text-center">

                <FormGroup>
                  <Label for="N_matricule">Registration number</Label>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-id-card" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      id="N_matricule"
                      value={values.N_matricule}
                      readOnly
                    />
                    <InputGroupAddon addonType="append">
                      <Button color="primary" onClick={handleGenerateId}>
                        Generate
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>

                <Button type="submit" color="primary" className="mt-5">
                  Add Student
                </Button>
              </div>

            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Add_Student;
