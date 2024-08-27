import React, { useEffect, useState } from "react";
import axios from "axios";
import MyLoading from "components/Loading/MyLoading";
import Header from "components/Headers/Header";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/Login_admin.css";
import { FaBook, FaFileAlt, FaClock, FaLayerGroup, FaChalkboardTeacher} from "react-icons/fa"; // Importing appropriate icons

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
    const [teacher, setTeacher] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8800/teacher')
            .then(res => {
                setTeacher(res.data);
            })
            .catch(err => {
                console.error("Erreur de la récupération des données");
            });
    }, []);

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
            .then(res => 
                {
                navigate("/admin/courses")
                alert('Insertion avec succès')
    })
            .catch(err => alert("Echec d'insertion"));
    };

    const handleChange = (event) => {
        setValues({ ...values, id_prof: event.target.value });
    };

    const handleChangeLevel = (event) => {
        setValues({ ...values, niveau: event.target.value });
    };

    return (
        <div>
            <MyLoading />
            <Header />
            <Col lg="12" md="8" style={{ top: "10px", width: "500px" }} className="mx-auto">
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
                        <div className="text-center text-muted mb-4">
                            <small>Or sign up with credentials</small>
                        </div>
                        <Form role="form" onSubmit={handleSubmit}>
                            <FormGroup>
                                <InputGroup className="input-group-alternative mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <FaBook /> {/* Course Title Icon */}
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
                                            <FaFileAlt /> {/* Description Icon */}
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
                                            <FaClock /> {/* Total Hours Icon */}
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Total Hours"
                                        type="number"
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
                                            <FaLayerGroup /> {/* Level Icon */}
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <select id="level" className="custom-select" onChange={handleChangeLevel}>
                                        <option value="">Select level</option>
                                        <option value="L1">L1</option>
                                        <option value="L2">L2</option>
                                        <option value="L3">L3</option>
                                        <option value="M1">M1</option>
                                        <option value="M2">M2</option>
                                    </select>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <FaClock /> {/* Weekly Hours Icon */}
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Weekly Hours"
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
                                            <FaClock /> {/* Completed Hours Icon */}
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Completed Hours"
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
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <FaChalkboardTeacher /> {/* Professor Icon */}
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <select id="id_prof" className="custom-select" onChange={handleChange}>
                                        <option value="">Select Professor</option>
                                        {teacher.map((teacher, index) => (
                                            <option key={index} value={teacher.N_matricule}>
                                                {teacher.nom}
                                            </option>
                                        ))}
                                    </select>
                                </InputGroup>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary mt-4">
                                    Add Course
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
