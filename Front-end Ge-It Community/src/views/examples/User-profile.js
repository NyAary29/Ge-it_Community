
import {

    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import MyLoading from "components/Loading/MyLoading";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {

    const [admin, setAdmin] = useState([]); // Renommé pour plus de clarté

    useEffect(() => {
        //   // Appel à l'API pour récupérer les données des utilisateurs
        axios.get('http://localhost:8800/admin')
            .then(response => {
                // On met à jour l'état avec les données reçues
                setAdmin(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois après le premier rendu

    return (
        <div>
            <MyLoading />
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid >
                <Row>
                    <Col className="order-xl-1" xl="12" >
                        <Card className="bg-secondary shadow">
                            {admin.map((admin, index) => (
                                <Row className="justify-content-center">
                                    <Col className="order-lg-2" lg="3">
                                        <div className="card-profile-image">
                                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                <img
                                                    alt="..."
                                                    className="rounded-circle"
                                                    src={`http://localhost:8800/uploads/${admin.image}`}
                                                />
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            ))}

                            <CardHeader className="bg-white border-0">

                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My account</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Link
                                            color="primary"
                                            to="/admin/update"
                                            size="sm"
                                            type="btn btn-primary"
                                        >
                                            Edit Profile
                                        </Link>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {admin.map((admin, index) => (
                                    <Form>
                                        <h6 className="heading-small text-muted mb-4">
                                            User information
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-username"
                                                        >
                                                            User Name
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={admin.user_name}
                                                            id="user_name"
                                                            placeholder="Username"
                                                            type="text"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg="6">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="input-email"
                                                            value={admin.email}
                                                            placeholder="jesse@example.com"
                                                            type="email"
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                        </div>

                                        <div className="pl-lg-4">

                                            <Row>
                                                <Col lg="4">
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="input-city"
                                                        >
                                                            Password
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            value={admin.password}
                                                            type="password"
                                                        />
                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                        </div>
                                    </Form>
                                ))}

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;
