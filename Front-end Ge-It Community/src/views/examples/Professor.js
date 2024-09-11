import { useState, useEffect } from "react";
import { TiUserDeleteOutline } from "react-icons/ti";
import { MdOutlineMode } from "react-icons/md";
import { Link } from "react-router-dom";
import {
    Card,
    CardHeader,
    Container,
    Row,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import MyLoading from "../../components/Loading/MyLoading";
import axios from "axios";
import { DataTable } from 'primereact/datatable'; 
import { Column } from 'primereact/column'; 

const Professor = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8800/teacher')
            .then(res => {
                setTeachers(res.data);
                setFilteredTeachers(res.data); 
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
                    setFilteredTeachers(filteredTeachers.filter(teacher => teacher.N_matricule !== matricule));
                    window.alert('Professor deleted successfully');
                })
                .catch(err => {
                    console.error(err);
                    alert('Delete unsuccessfully');
                });
        }
    };

    const actionBodyTemplate = (rowData) => (
        <div className="d-flex justify-content-center">
            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault();
                    handleDelete(rowData.N_matricule);
                }}
                className="btn btn-sm btn-danger mx-1"
            >
                <TiUserDeleteOutline />
            </Link>
            <Link to={`/admin/modify_teacher/${rowData.N_matricule}`} className="btn btn-sm btn-primary mx-1">
                <MdOutlineMode />
            </Link>
        </div>
    );

    return (
        <div style={{ position: 'relative' }}>
            <MyLoading />
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Professors</h3>
                            </CardHeader>
                            <DataTable value={filteredTeachers} paginator rows={10} tableStyle={{ minWidth: '60rem' }}>
                                <Column field="N_matricule" header="Matricule" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="nom" header="Last Name" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="prenom" header="First Name" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="specialite" header="Speciality" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="grade" header="Grade" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="email" header="Email" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="password" header="Password" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="tel" header="Mobile" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column field="adresse" header="Address" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                                <Column header="Actions" body={actionBodyTemplate} />
                            </DataTable>
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Professor;
