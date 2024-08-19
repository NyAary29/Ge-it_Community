// reactstrap components
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, Progress } from "reactstrap";
import axios from "axios";

const Header = () => {

  const [countTeacher, setCountTeacher] = useState([])
  const [countStudent, setCountStudent] = useState([])
  const [countCours, setCountCours] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8800/teacher/count')
      .then(res => {
        setCountTeacher(res.data.count); // Mettre à jour le state avec le nombre d'enseignants récupéré depuis l'API
      })
      .catch(err => {
        console.error("erreur")
      })
  }, []);

  //recuperer le nombre d'étudiants
  useEffect(() => {
    axios.get('http://localhost:8800/student/count')
      .then(res => {
        setCountStudent(res.data.count); 
      })
      .catch(err => {
        console.error("erreur")
      })
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8800/cours/count')
      .then(res => {
        setCountCours(res.data.count); 
      })
      .catch(err => {
        console.error("erreur")
      })
  }, []);

  //recuperer le nombre total des membres de ge_it
  const allMembers =countStudent+countTeacher  

  return (
    <div>
      <div className="header pb-8 pt-5 pt-md-8"  style={{
        background:
          "linear-gradient(to top, #ee7724, #c92628, #dd5824, #b44593)",
        border: "none",
      }}>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Students
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {countStudent}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <Progress
                        max="100"
                        value="30"
                        barClassName="bg-danger"
                      />
                      <span className="text-success mr-2">
                        Total Students
                      </span>{" "}
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Professors
                        </CardTitle>
                        
                        <span className="h2 font-weight-bold mb-0"> {countTeacher}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <Progress
                        max="100"
                        value="60"
                        barClassName="bg-warning"
                      />
                      <span className="text-danger mr-2">
                        Total Professors
                      </span>{" "}

                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          All Members
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{allMembers}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <Progress
                        max="100"
                        value="80"
                        barClassName="bg-yellow"
                      />
                      <span className="text-warning mr-2">
                        Total Members
                      </span>{" "}

                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Courses
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{countCours}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-percent" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <Progress
                        max="100"
                        value="60"
                        barClassName="bg-primary"
                      />
                      <span className="text-success mr-2">
                       Total Courses
                      </span>{" "}
                      
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Header;
