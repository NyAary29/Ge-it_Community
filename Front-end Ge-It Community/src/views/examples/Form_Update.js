import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import MyLoading from "components/Loading/MyLoading";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Update = () => {
    const [admin, setAdmin] = useState([]); // Renommé pour plus de clarté
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [oldpassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [ErrorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Appel à l'API pour récupérer les données des utilisateurs
        axios.get("http://localhost:8800/admin")
            .then(response => {
                // On met à jour l'état avec les données reçues
                setAdmin(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des données :", error);
            });
    }, []);

    const handleImageClick = () => {
        document.getElementById("image-input").click();
    };

    const handleImageChange = event => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async event => {
        event.preventDefault();
      
        const formData = new FormData();
      
        formData.append("user_name", user_name || admin.user_name);
        formData.append("email", email || admin.email);
        formData.append("image", image || admin.image);
        formData.append("oldpassword", oldpassword || admin.password);
        formData.append("password", password || admin.password);
      
        try {
          const response = await fetch("http://localhost:8800/admin/update", {
            method: "PUT",
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error("Erreur lors de la requête");
          }
      
          const data = await response.json();
          console.log("Réponse du serveur:", data);
          setErrorMessage("");
        } catch (error) {
          console.error("Erreur lors de la mise à jour de l'administrateur:", error);
          setErrorMessage(error.message);
        }
      };

    return (
        <div>
            <MyLoading />
            <UserHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <Row className="justify-content-center">
                                <Col className="order-lg-2" lg="3">
                                    <div className="card-profile-image">
                                        {admin.map(admin => (
                                            <img
                                                alt="..."
                                                className="rounded-circle"
                                                src={`http://localhost:8800/uploads/${admin.image}`}
                                                onClick={handleImageClick}
                                            />
                                        ))}
                                        <input
                                            type="file"
                                            id="image-input"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">My account</h3>
                                    </Col>
                                    <Col className="text-right" xs="4">
                                        <Link
                                            color="primary"
                                            to="/admin/course"
                                            size="sm"
                                            type="btn btn-primary"
                                        >
                                            Edit Update
                                        </Link>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {ErrorMessage && (
                                    <div style={{ color: "red" }}>
                                        {ErrorMessage}
                                    </div>
                                )}
                                <Form id="Update" onSubmit={handleSubmit} encType="multipart/form-data">
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
                                                        value={user_name}
                                                        id="user_name"
                                                        onChange={e => setUser_name(e.target.value)}
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
                                                        value={email}
                                                        placeholder="jesse@example.com"
                                                        type="email"
                                                        onChange={e => setEmail(e.target.value)}
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
                                                        Old Password
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        value={oldpassword}
                                                        type="password"
                                                        id="oldpassword"
                                                        onChange={e => setOldPassword(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

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
                                                        value={password}
                                                        type="password"
                                                        id="password"
                                                        onChange={e => setPassword(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <button type="submit">Update</button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Update;