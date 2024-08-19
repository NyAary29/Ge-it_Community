import React, { useState, useEffect } from "react";
import axios from "axios";
import MyLoading from "../../components/Loading/MyLoading";
import Header from "../../components/Headers/Header.js";
import { Link } from "react-router-dom";
import { Card, CardHeader, Table, Container, Row, Progress } from "reactstrap";
import { MdMode } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";

const Cours = () => {
  const [cours, setCours] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8800/cours/affichage')
      .then(res => {
        setCours(res.data.cours);
      })
      .catch(err => {
        console.error("erreur")
      })
  }, []);

  return (
    <div>
      <MyLoading />
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Courses</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" className="text-center">Title</th>
                    <th scope="col" className="text-center">Description</th>
                    <th scope="col" className="text-center">Hours</th>
                    <th scope="col" className="text-center">Level</th>
                    <th scope="col" className="text-center">Heure par Semaine</th>
                    <th scope="col" className="text-center">Heure Effectué</th>
                    <th scope="col" className="text-center">Status</th>
                    <th scope="col" className="text-center">Completion</th>
                    <th scope="col" className="text-center">Professor</th>
                    <th scope="col" className="text-center">Actions</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {cours.map((cours) => (
                    <tr key={cours.id}>
                      <td className="text-center">{cours.titre_cours}</td>
                      <td className="text-center">{cours.description}</td>
                      <td className="text-center">{cours.heure_total}</td>
                      <td className="text-center">{cours.level}</td>
                      <td className="text-center">{cours.heure_semaine}</td>
                      <td className="text-center">{cours.heure_effectue}</td>
                      <td className="text-center">
                        {cours.heure_effectue < cours.heure_total ? <p> Loading ... </p> : <p> Completed </p>}
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center">
                          <span className="mr-2">{(cours.heure_effectue / cours.heure_total) * 100}%</span>
                          <div>
                            <Progress
                              max={cours.heure_total}
                              value={cours.heure_effectue}
                              barClassName="bg-danger"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{cours.nom}</td>
                      <td>
                        <div className="icon icon-shape text-white">
                          <Link to="/"><TiUserDeleteOutline /></Link>
                        </div>
                        <div className="icon icon-shape text-white">
                          <Link to="/"><MdMode /></Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Cours;
