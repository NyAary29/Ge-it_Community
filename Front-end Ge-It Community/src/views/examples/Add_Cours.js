import React, { useEffect, useState } from "react";
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

const Add_Cours = () => {
    const [teacher, setTeacher] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8800/teacher')
            .then(res => {
                setTeacher(res.data)
            })
            .catch(err => {
                console.error("Erreur de la récupération des données")
            })
    }, [])
    const [values, setValues] = useState({
        titre_cours: '',
        description: '',
        heure_total: '',
        level: '',
        id_prof: '',
        heure_semaine: '',
        heure_effectue: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8800/add_cours', values)
            .then(res => alert('Insertion avec succès'))
            .catch(err => alert("Echec d'insertion"))
    }

    const handleChange = (event) => {
        // Mettre à jour l'état genre avec la valeur sélectionnée dans la liste déroulante
        setValues({ ...values, id_prof: event.target.value });
    };


    return (
        <div>
            <MyLoading />
            <Header />
            <Col lg="12" md="8" style={{ top: "10px", width: "500px" }} className="mx-auto" >
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
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Course Title"
                                        type="text"
                                        id="titre_cours"
                                        onChange={(e) =>
                                            setValues({ ...values, titre_cours: e.target.value })
                                        }
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Description"
                                        type="textarea"
                                        id="description"
                                        onChange={(e) =>
                                            setValues({ ...values, description: e.target.value })
                                        }
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Total Hours"
                                        type=" number"
                                        id="heure_total"
                                        onChange={(e) =>
                                            setValues({ ...values, heure_total: e.target.value })
                                        }
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Level"
                                        type="text"
                                        id="level"
                                        onChange={(e) =>
                                            setValues({ ...values, level: e.target.value })
                                        }
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Heure par Semaine"
                                        type="number"
                                        id="heure_semaine"
                                        onChange={(e) =>
                                            setValues({ ...values, heure_semaine: e.target.value })
                                        }
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Heure effectué"
                                        type="number"
                                        id="heure_effectue"
                                        onChange={(e) =>
                                            setValues({ ...values, heure_effectue: e.target.value })
                                        }
                                        required
                                    />
                                </InputGroup>
                            </FormGroup>
                            

                            <div className="form-outline mb-4">
                                <select id="id_prof" onChange={handleChange}>
                                    <option value="">Select Professor</option>
                                    {teacher.map((teacher, index) => (
                                        <option value={teacher.N_matricule}>{teacher.nom}</option>
                                    ))}
                                </select>
                            </div>

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

export default Add_Cours;
