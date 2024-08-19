
// reactstrap components
import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
const UserHeader = () => {
  const [users, setUsers] = useState([]); // Renommé pour plus de clarté

  useEffect(() => {
    // Appel à l'API pour récupérer les données des utilisateurs
    axios.get('http://localhost:8800/users')
      .then(response => {
        // On met à jour l'état avec les données reçues
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois après le premier rendu

  return (
    <div>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "100px",
          backgroundImage:
            "url(" + require("../../assets/img/logo.png") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          width: "100%"
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              {users.map((users, index) => (
                <h1 className="display-2 text-white">{users.name}</h1>
              ))}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserHeader;
