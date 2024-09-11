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

const Add_Teacher = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    N_matricule: '',
    nom: '',
    prenom: '',
    adresse: '',
    grade: '',
    tel: '',
    email: '',
    password: '',
    specialite: '',
    annee_inscription: new Date().getFullYear(),
  });

  const handleGenerateId = async () => {
    try {
      const response = await axios.post('http://localhost:8800/api/generate_teacher_id', {
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
      await axios.post('http://localhost:8800/add_teacher', values);
      alert('Teacher added successfully');
      navigate("/admin/professors");
    } catch (error) {
      alert("Failed to add teacher");
    }
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
                    <Label for="N_matricule">Register Number</Label>
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
                        required
                      />
                      <Button onClick={handleGenerateId} color="info">
                        Generate ID
                      </Button>
                    </InputGroup>
                  </FormGroup>

                </Col>

                <Col md="6">

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

                  <FormGroup>
                    <Label for="email">Email</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
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
                          <i className="fa fa-lock" />
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
                    <Label for="specialite">Speciality</Label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-briefcase-medical" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="specialite"
                        value={values.specialite}
                        onChange={(e) => setValues({ ...values, specialite: e.target.value })}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <div className="text-center">
                <Button type="submit" color="primary" className="mt-4">
                  Add Teacher
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Add_Teacher;
