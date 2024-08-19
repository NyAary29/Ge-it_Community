import { TiUserDeleteOutline } from "react-icons/ti";
import MyPagination from 'components/Pagination/MyPagination'
import { MdOutlineMode } from "react-icons/md";
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    Table,
    Container,
    Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import MyLoading from "../../components/Loading/MyLoading";
import { useEffect, useState } from "react";
import axios from "axios";

const Professor = () => {
    const [teachers, setTeachers] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8800/teacher')
            .then(res => {
                setTeachers(res.data);
            })
            .catch(err => {
                console.error("Erreur de la récupération des données", err);
            });
    }, []);

    const handleDelete = (matricule) => {
        if (window.confirm('Êtes-vous sûr de vouloir le supprimer ?')) {
            axios.delete(`http://localhost:8800/delete_teacher/${matricule}`)
                .then(res => {
                    setTeachers(teachers.filter(teacher => teacher.N_matricule !== matricule));
                    window.alert('Professor deleted successfully');
                    console.log(res);
                })
                .catch(err => {
                    console.error(err);
                    alert('Delete unsuccessfully');
                });
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <MyLoading />
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Card Professors</h3>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Matricule</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Speciality</th>
                                        <th scope="col">Grade</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Password</th>
                                        <th scope="col">Mobile</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Actions</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {teachers.map((teacher, index) => (
                                        <tr key={index}>
                                            <td className="text-center">{teacher.N_matricule}</td>
                                            <td className="text-center">{teacher.nom}</td>
                                            <td className="text-center">{teacher.prenom}</td>
                                            <td className="text-center">{teacher.specialite}</td>
                                            <td className="text-center">{teacher.grade}</td>
                                            <td className="text-center">{teacher.email}</td>
                                            <td className="text-center">{teacher.password}</td>
                                            <td className="text-center">{teacher.tel}</td>
                                            <td className="text-center">{teacher.adresse}</td>
                                            <td>
                                                <div className="icon icon-shape text-white">
                                                    <Link
                                                        to="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleDelete(teacher.N_matricule);
                                                        }}
                                                        className="btn btn-sm btn-danger"
                                                    >
                                                        <TiUserDeleteOutline />
                                                    </Link>
                                                </div>
                                                <div className="icon icon-shape text-white">
                                                    <Link to={`/admin/modify_teacher/${teacher.N_matricule}`} className="btn btn-sm btn-primary">
                                                        <MdOutlineMode />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <MyPagination />
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Professor;
