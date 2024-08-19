import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, Table, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { MdOutlineMode } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";
import Header from "components/Headers/Header.js";
import MyLoading from "../../components/Loading/MyLoading";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/student')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.error("Erreur de la récupération des données", err);
      });
  }, []);

  const handleDelete = (matricule) => {
    if (window.confirm('Êtes-vous sûr de vouloir le supprimer ?')) {
      axios.delete(`http://localhost:8800/delete_student/${matricule}`)
        .then(res => {
          setStudents(students.filter(student => student.N_matricule !== matricule));
          window.alert('Student deleted successfully');
        })
        .catch(err => {
          console.error(err);
          alert('Delete unsuccessfully');
        });
    }
  };

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
                <h3 className="text-white mb-0">Students</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" className="text-center">Matricule</th>
                    <th scope="col" className="text-center">Last Name</th>
                    <th scope="col" className="text-center">First Name</th>
                    <th scope="col" className="text-center">Birthday</th>
                    <th scope="col" className="text-center">Gender</th>
                    <th scope="col" className="text-center">Address</th>
                    <th scope="col" className="text-center">Phone number</th>
                    <th scope="col" className="text-center">Email</th>
                    <th scope="col" className="text-center">Password</th>
                    <th scope="col" className="text-center">Level</th>
                    <th scope="col" className="text-center">Actions</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.N_matricule}>
                      <td className="text-center">{student.N_matricule}</td>
                      <td className="text-center">{student.nom}</td>
                      <td className="text-center">{student.prenom}</td>
                      <td className="text-center">{student.birthday}</td>
                      <td className="text-center">{student.sexe}</td>
                      <td className="text-center">{student.adresse}</td>
                      <td className="text-center">{student.tel}</td>
                      <td className="text-center">{student.email}</td>
                      <td className="text-center">{student.password}</td>
                      <td className="text-center">{student.niveau}</td>
                      <td className="text-center">
                        <div className="icon icon-shape text-white">
                          <Link
                            to="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(student.N_matricule);
                            }}
                            className="btn btn-sm btn-danger"
                          >
                            <TiUserDeleteOutline />
                          </Link>
                        </div>
                        <div className="icon icon-shape text-white">
                          <Link to={`/admin/modify_student/${student.N_matricule}`} className="btn btn-sm btn-primary">
                            <MdOutlineMode />
                          </Link>
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

export default Students;
