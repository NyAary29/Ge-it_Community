import React, { useState, useEffect } from "react";
import axios from "axios";
import MyLoading from "../../components/Loading/MyLoading";
import Header from "../../components/Headers/Header.js";
import { Container, Row, Button, CardHeader, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { MdMode } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);
    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'N_matricule': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'nom': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'prenom': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'birthday': { value: null, matchMode: FilterMatchMode.DATE_IS },
        'sexe': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'niveau': { value: null, matchMode: FilterMatchMode.CONTAINS }
    });

    useEffect(() => {
        axios.get('http://localhost:8800/student')
            .then(res => {
                setStudents(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching student data", err);
                setLoading(false);
            });
    }, []);

    const actionsBodyTemplate = (rowData) => {
        const handleDelete = (matricule) => {
            if (window.confirm("Are you sure you want to delete this student?")) {
                axios.delete(`http://localhost:8800/delete_student/${matricule}`)
                    .then(() => {
                        alert("Student deleted successfully");
                        setStudents(students.filter(student => student.N_matricule !== matricule));
                    })
                    .catch((error) => {
                        console.error("There was an error deleting the student!", error);
                    });
            }
        };

        return (
            <div>
                <Button color="danger" size="sm" className="mr-2" onClick={() => handleDelete(rowData.N_matricule)}>
                    <TiUserDeleteOutline />
                </Button>
                <Button color="primary" size="sm">
                    <Link to={`/admin/modify_student/${rowData.N_matricule}`} className="text-white"><MdMode /></Link>
                </Button>
            </div>
        );
    };

    const rowExpansionTemplate = (data) => (
        <div className="p-3">
            <h5>Details</h5>
            <p><strong>Address:</strong> {data.adresse}</p>
            <p><strong>Phone number:</strong> {data.tel}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Password:</strong> {data.password}</p>
        </div>
    );

    return (
        <div>
            <MyLoading />
            <Header />
            <Container className="mt--5" fluid>
                <Row className="mt-7">
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                                <h1 className="mb-0">STUDENTS</h1>
                                <Link to={`/admin/add_student`} className="btn btn-info">
                                    <i className="fa fa-plus mr-2" /> Add Student
                                </Link>
                            </CardHeader>
                            <DataTable
                                value={students}
                                paginator
                                rows={12}
                                dataKey="N_matricule"
                                filters={filters}
                                onFilter={(e) => setFilters(e.filters)}
                                filterDisplay="row"
                                loading={loading}
                                globalFilterFields={['nom', 'prenom', 'niveau']}
                                emptyMessage="No students found."
                                rowExpansionTemplate={rowExpansionTemplate}
                                expandedRows={expandedRows}
                                onRowToggle={(e) => setExpandedRows(e.data)}
                                sortField="nom"
                                sortOrder={1}
                                style={{ borderRadius: '10px', overflow: 'hidden' }}
                                className="custom-table"
                            >
                                <Column expander style={{ width: '3rem' }} />
                                <Column field="N_matricule" header="Matricule" headerStyle={{ backgroundColor: '#F44336', color: '#fff' }} filter filterPlaceholder="Search by matricule" sortable style={{ minWidth: '10rem' }} />
                                <Column field="nom" header="Last Name" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search by last name" sortable style={{ minWidth: '12rem' }} />
                                <Column field="prenom" header="First Name" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search by first name" sortable style={{ minWidth: '12rem' }} />
                                <Column field="birthday" header="Birthday" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable style={{ minWidth: '8rem' }} />
                                <Column field="sexe" header="Gender" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search by gender" sortable style={{ minWidth: '8rem' }} />
                                <Column field="niveau" header="Level" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search by level" sortable style={{ minWidth: '8rem' }} />
                                <Column header="Actions" headerStyle={{ backgroundColor: '#F44336', color: '#fff' }} body={actionsBodyTemplate} style={{ minWidth: '10rem' }} />
                            </DataTable>
                        </Card>

                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Students;
