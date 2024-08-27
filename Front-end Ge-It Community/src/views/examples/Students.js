import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, Container, Row, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { MdOutlineMode } from "react-icons/md";
import { TiUserDeleteOutline } from "react-icons/ti";
import Header from "components/Headers/Header.js";
import MyLoading from "../../components/Loading/MyLoading";
import { DataTable } from 'primereact/datatable'; // Adjust according to your DataTable library
import { Column } from 'primereact/column'; // Adjust according to your DataTable library

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [levels, setLevels] = useState([]); // State to hold the list of levels
  const [selectedLevel, setSelectedLevel] = useState(''); // State to hold the selected level

  useEffect(() => {
    // Fetch students
    axios.get('http://localhost:8800/student')
      .then(res => {
        setStudents(res.data);
        setFilteredStudents(res.data); // Set initial filtered list
      })
      .catch(err => {
        console.error("Erreur de la récupération des données", err);
      });

    // Fetch levels for dropdown
    axios.get('http://localhost:8800/students/level')
      .then(res => {
        // Extraire les valeurs de "niveau" des objets
        const levelsData = res.data.map(levelObj => levelObj.niveau);
        setLevels(levelsData);
      })
      .catch(err => {
        console.error("Erreur de la récupération des niveaux", err);
      });
  }, [0]);

  const handleDelete = (matricule) => {
    if (window.confirm('Êtes-vous sûr de vouloir le supprimer ?')) {
      axios.delete(`http://localhost:8800/delete_student/${matricule}`)
        .then(res => {
          setStudents(students.filter(student => student.N_matricule !== matricule));
          setFilteredStudents(filteredStudents.filter(student => student.N_matricule !== matricule));
          window.alert('Student deleted successfully');
        })
        .catch(err => {
          console.error(err);
          alert('Delete unsuccessfully');
        });
    }
  };

  const handleLevelChange = (e) => {
    const level = e.target.value;
    setSelectedLevel(level);

    if (level === '') {
      setFilteredStudents(students); // Show all students if no level is selected
    } else {
      setFilteredStudents(students.filter(student => student.niveau === level));
    }
  };

  const rowExpansionTemplate = (data) => (
    <div className="p-3" style={{backgroundColor:'whitesmoke'}}>
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
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-black mb-0">Students</h3>
                <FormGroup>
                  <Label for="levelSelect">Select Level</Label>
                  <Input
                    type="select"
                    id="levelSelect"
                    value={selectedLevel}
                    onChange={handleLevelChange}
                  >
                    <option value="">All Levels</option>
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </Input>
                </FormGroup>
              </CardHeader>
              <DataTable value={filteredStudents} expandedRows={expandedRows}
                onRowToggle={(e) => setExpandedRows(e.data)}
                rowExpansionTemplate={rowExpansionTemplate}
                dataKey="N_matricule" tableStyle={{ minWidth: '60rem' }}>
                <Column expander style={{ width: '3rem' }} />
                <Column field="N_matricule" header="Matricule" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                <Column field="nom" header="Last Name" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                <Column field="prenom" header="First Name" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                <Column field="birthday" header="Birthday" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                <Column field="sexe" header="Gender" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                <Column field="niveau" header="Level" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} sortable />
                <Column header="Actions" headerStyle={{ backgroundColor: '#4CAF50', color: '#fff' }} body={(rowData) => (
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
                    <Link to={`/admin/modify_student/${rowData.N_matricule}`} className="btn btn-sm btn-primary mx-1">
                      <MdOutlineMode />
                    </Link>
                  </div>
                )} />
              </DataTable>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Students;
