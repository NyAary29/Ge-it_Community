import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom"; // import useNavigate
import { Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Col, Row } from "reactstrap";
import MyLoading from "../../components/Loading/MyLoading";
import Header from "../../components/Headers/Header";
import "../../assets/css/Login_admin.css";

const Edit_Cours = () => {
  const { id_cours } = useParams();
  const navigate = useNavigate(); // create navigate instance
  const [coursData, setCoursData] = useState({
    id_cours: '',
    titre_cours: '',
    description: '',
    heure_total: '',
    level: '',
    status:'',
    id_prof: '',
    heure_semaine: '',
    heure_effectue: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:8800/cours/${id_cours}`)
      .then(res => {
        setCoursData(res.data[0]);
      })
      .catch(err => {
        console.error("Erreur de récupération des données du cours", err);
      });
  }, [id_cours]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8800/modify_cours/${id_cours}`, coursData)
      .then(res => {
        navigate("/admin/courses");
        alert('Modification réussie');
      })
      .catch(err => {
        console.error("Erreur lors de la modification", err);
        alert("Échec de la modification");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoursData(prevData => ({
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
              <small>Edit Course Information</small>
            </div>
            <Form role="form" onSubmit={handleUpdate}>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="titre_cours">Course Title</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-book" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Course Title"
                        type="text"
                        name="titre_cours"
                        id="titre_cours"
                        value={coursData.titre_cours}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="description">Description</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-info" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Course Description"
                        type="text"
                        name="description"
                        id="description"
                        value={coursData.description}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="heure_total">Total Hours</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-clock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Total Hours"
                        type="number"
                        name="heure_total"
                        id="heure_total"
                        value={coursData.heure_total}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="heure_semaine">Weekly Hours</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-clock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Weekly Hours"
                        type="number"
                        name="heure_semaine"
                        id="heure_semaine"
                        value={coursData.heure_semaine}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label htmlFor="level">Level</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-graduation-cap" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Level"
                        type="text"
                        name="level"
                        id="level"
                        value={coursData.level}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="id_prof">Professor ID</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user-tie" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Professor ID"
                        type="text"
                        name="id_prof"
                        id="id_prof"
                        value={coursData.id_prof}
                        onChange={handleInputChange}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="heure_effectue">Hours Completed</label>
                    <InputGroup className="input-group-alternative mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-clock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Hours Completed"
                        type="number"
                        name="heure_effectue"
                        id="heure_effectue"
                        value={coursData.heure_effectue}
                        onChange={handleInputChange}
                        required
                      />
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

export default Edit_Cours;
