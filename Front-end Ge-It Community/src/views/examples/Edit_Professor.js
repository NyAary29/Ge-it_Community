import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Row } from "reactstrap";
import MyLoading from "../../components/Loading/MyLoading";
import Header from "../../components/Headers/Header";
import "../../assets/css/Login_admin.css";

const Edit_Professor = () => {
    const { matricule } = useParams();
    const navigate = useNavigate();
    const [teacherData, setTeacherData] = useState({
      N_matricule: '',
      nom: '',
      prenom: '',
      adresse: '',
      grade: '',
      tel: '',
      specialite: ''
    });
  
    useEffect(() => {
      axios.get(`http://localhost:8800/teacher/${matricule}`)
        .then(res => {
          setTeacherData(res.data[0]); // Récupérez le premier élément du tableau des données
        })
        .catch(err => {
          console.error("Erreur de récupération des données du professeur", err);
        });
    }, [matricule]);
  
    const handleUpdate = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:8800/modify_teacher/${matricule}`, teacherData)
        .then(res => {
          navigate("/admin/professors");
          alert('Modification avec succès');
          
          // Redirection ou autre action après la mise à jour réussie
        })
        .catch(err => {
          console.error("Erreur lors de la modification", err);
          alert("Échec de la modification");
        });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTeacherData(prevData => ({
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
              <FormGroup>
                <label htmlFor="Register Number">Register Number</label>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="N° Matricule"
                    type="text"
                    name="N_matricule"
                    value={teacherData.N_matricule}
                    onChange={handleInputChange}
                    required
                    readOnly
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
              <label htmlFor="Register Number">Last name</label>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="fa fa-user" aria-hidden="true" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Last Name"
                    type="text"
                    name="nom"
                    value={teacherData.nom}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label htmlFor="Name">First Name</label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="fa fa-user" aria-hidden="true"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name"
                    type="text"
                    name="prenom"
                    value={teacherData.prenom}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label htmlFor="Address">Address</label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="fa fa-address-card" aria-hidden="true"/>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Address"
                    type="text"
                    name="adresse"
                    value={teacherData.adresse}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label htmlFor="Phone">Phone Number</label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="fa fa-mobile" aria-hidden="true" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Grade"
                    type="text"
                    name="grade"
                    value={teacherData.grade}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <label htmlFor="Phone Number">Phone Number</label>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    <i className="fa fa-envelope" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Phone number"
                    type="tel"
                    name="tel"
                    value={teacherData.tel}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
              <label htmlFor="Speciality">Speciality</label>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                  <i className="fa fa-briefcase-medical" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Speciality"
                  type="text"
                  name="specialite"
                  value={teacherData.specialite}
                    onChange={handleInputChange}
                  required
                />
              </InputGroup>
            </FormGroup>
            
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

export default Edit_Professor;
