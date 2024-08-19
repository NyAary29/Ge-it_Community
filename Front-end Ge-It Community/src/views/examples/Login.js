import React, { useState } from "react";
import axios from "axios";
import MyLoading from "components/Loading/MyLoading";
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

const Login = () => {
  const [values, setValues] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState("");

  // Définissez la fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoyez une requête POST au serveur avec les valeurs du formulaire
      const res = await axios.post("http://localhost:8800/login", values);
      // Vérifiez la réponse du serveur
      if (res.data === "connexion reussie") {
        // Si l'authentification réussit, mettez à jour l'état authenticated
        setAuthenticated(true);
      } else {
        // Sinon, affichez un message d'erreur approprié
        setError("Identifiants incorrects");
      }
    } catch (err) {
      // En cas d'erreur, affichez un message d'erreur générique
      setError("Une erreur s'est produite lors de la connexion");
      console.error(err); // Affichez l'erreur dans la console pour le débogage
    }
  };



  return (
    <div>
      <MyLoading />
      <Col lg="12" md="8" style={{ top: "10px", width: "500px" }}>
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
                    placeholder="Username"
                    type="text"
                    id="user_name"
                    onChange={(e) =>
                      setValues({ ...values, user_name: e.target.value })
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
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
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
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    id="password"
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    required
                  />
                </InputGroup>
              </FormGroup>
              
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-4"  >
                  Sign in
                </button>
                {/* Affichage du message d'erreur */}

                {error && <div className="text-danger">{error}</div>}
                {/* Redirection si l'authentification est réussie */}
                {authenticated && (
                  <div>
                    <Link to="/admin/index">Go to Admin</Link>
                  </div>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Login;
