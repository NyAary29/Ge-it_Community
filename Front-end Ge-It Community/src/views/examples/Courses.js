import React, { useState, useEffect } from "react";
import axios from "axios";
import MyLoading from "../../components/Loading/MyLoading";
import Header from "../../components/Headers/Header.js";
import { Container, Row, Button, Progress } from "reactstrap";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterService } from 'primereact/api';

import { MdMode } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";

// Register custom filter for activity
FilterService.register('custom_activity', (value, filters) => {
    const [from, to] = filters ?? [null, null];
    if (from === null && to === null) return true;
    if (from !== null && to === null) return from <= value;
    if (from === null && to !== null) return value <= to;
    return from <= value && value <= to;
});

const Cours = () => {
    const [cours, setCours] = useState([]);
    const [filters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8800/cours/affichage')
            .then(res => {
                setCours(res.data.cours);
                setLoading(false);
            })
            .catch(err => {
                console.error("erreur");
                setLoading(false);
            });
    }, []);

    const statusBodyTemplate = (rowData) => {
        const isCompleted = rowData.heure_effectue >= rowData.heure_total;
        const statusText = isCompleted ? "Completed" : "Loading...";
        const statusColor = isCompleted ? "red" : "orange"; 

        return (
            <span style={{ color: statusColor, fontWeight: "bold" }}>
                {statusText}
            </span>
        );
    };

    const completionBodyTemplate = (rowData) => {
        const completion = ((rowData.heure_effectue / rowData.heure_total) * 100).toFixed(2);

        let progressColor = 'info'; 
        if (completion >= 75) {
            progressColor = 'success'; 
        } else if (completion >= 50) {
            progressColor = 'warning';
        } else if (completion >= 25) {
            progressColor = 'info'; 
        }

        return (
            <div className="d-flex align-items-center justify-content-center">
                <span className="mr-2">
                    <Progress value={completion} className={`w-100 bg-${progressColor}`} style={{ height: '10px' }} />
                    {completion}%
                </span>
            </div>
        );
    };

    const actionsBodyTemplate = (rowData) => {
        const handleDelete = (id) => {
            if (window.confirm("Are you sure you want to delete this course?")) {
                axios.delete(`http://localhost:8800/cours/affichage/${id}`)
                    .then((response) => {
                        alert("Course deleted successfully");
                        setCours(cours.filter(course => course.id_cours !== id)); // Update state after deletion
                    })
                    .catch((error) => {
                        console.error("There was an error deleting the course!", error);
                    });
            }
        };

        return (
            <div>
                <Button color="danger" size="sm" className="mr-2" onClick={() => handleDelete(rowData.id_cours)}>
                    <TiUserDeleteOutline />
                </Button>
                <Button color="primary" size="sm">
                    <Link to={`/admin/modify_cours/${rowData.id_cours}`} className="text-white"><MdMode /></Link>
                </Button>
            </div>
        );
    };

    const rowExpansionTemplate = (data) => (
        <div className="p-3">
            <h5>Description</h5>
            <p>{data.description}</p>
        </div>
    );

    return (
        <div>
            <MyLoading />
            <Header />
            <Container className="mt--5" fluid>
                <Row className="mt-7">
                    <div className="col">
                        <DataTable 
                            value={cours} 
                            paginator 
                            rows={12} 
                            dataKey="id_cours" 
                            filters={filters} 
                            filterDisplay="row" 
                            loading={loading}
                            globalFilterFields={['titre_cours', 'level', 'nom']} 
                            emptyMessage="No courses found."
                            rowExpansionTemplate={rowExpansionTemplate}
                            expandedRows={expandedRows}
                            onRowToggle={(e) => setExpandedRows(e.data)}
                            sortField="titre_cours" // Set the default sort field if needed
                            sortOrder={1} // Set default sort order: 1 for ascending, -1 for descending
                            style={{ borderRadius: '10px', overflow: 'hidden' }}
                            className="custom-table"
                        >
                            <Column expander style={{ width: '3rem' }} />
                            <Column field="titre_cours" header="Title" headerStyle={{ backgroundColor: '#F44336', color: '#fff' }} filter filterPlaceholder="Search" sortable style={{ minWidth: '12rem' }} />
                            <Column field="level" header="Level" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search by level" sortable style={{ minWidth: '8rem' }} />
                            <Column field="heure_total" header="Hours" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search " sortable style={{ minWidth: '8rem' }} />
                            <Column field="heure_semaine" header="Heure par Semaine" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search " sortable style={{ minWidth: '10rem' }} />
                            <Column field="heure_effectue" header="Heure Effectué" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search" sortable style={{ minWidth: '10rem' }} />
                            <Column field="nom" header="Professor" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} filter filterPlaceholder="Search" sortable style={{ minWidth: '10rem' }} />
                            <Column field="status" header="Status" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} body={statusBodyTemplate} />
                            <Column field="completion" header="Completion" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} body={completionBodyTemplate} />
                            <Column header="Actions" headerStyle={{ backgroundColor: '#F44336', color: '#fff' }} body={actionsBodyTemplate} style={{ minWidth: '8rem' }} />
                        </DataTable>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Cours;
