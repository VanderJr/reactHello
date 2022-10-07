import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { getAllEmployees, deleteEmployee } from '../employee';
import { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { professions } from '../professions';




const ListEmployees = () => {

    const [filter, setFilter] = useState("");
    const [activeFilter, setActiveFilter] = useState(false);
    const [employees, setEmployees] = useState([]);

    const del = (objectEmployee) => {
        if (window.confirm("Deseja apagar o registro?")) {
            deleteEmployee(objectEmployee.id);
            setEmployees(
                employees.filter((a) => a.id !== objectEmployee.id)
            );
        }
    }
    const handleChangeFilter = event => {
        setFilter(event.target.value);
    }
    const handleChangeActiveFilter = event => {
        setActiveFilter(event.target.checked);
    }

    async function refreshEmployees() {
        const employ = await getAllEmployees();
        setEmployees(employ);
    }

    useEffect(
        () => {
            refreshEmployees();
        }, []
    );
    console.log(employees);

    const filtered = employees.filter(employee => {
        if (activeFilter === true) {
            return (employee.active === activeFilter && (employee.name.toLowerCase().includes(filter.toLowerCase()) || professions[employee.profession].toLowerCase().includes(filter.toLowerCase()) ));
        } else {
            return (employee.name.toLowerCase().includes(filter.toLowerCase())) || (professions[employee.profession].toLowerCase().includes(filter.toLowerCase()));
        }
    });

    return (<>
        <Card >
            <Row className="g-0 m-2" xs={5} md={5} lg={5}>
                <Col md>
                    <FloatingLabel label="Filtrar por name ou profissão... ">
                        <Form.Control id="filter" type="text" value={filter} onChange={handleChangeFilter} placeholder="Filtrar por name ou profissão... " />
                    </FloatingLabel>
                </Col>
                <Col md  >
                    <div className="mb-3">
                        <Form.Check inline label="Mostrar somente ativos" type="checkbox" checked={activeFilter} onChange={handleChangeActiveFilter} id="activeFilter" />
                    </div>
                </Col>
            </Row>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Profissão</th>
                        <th>Salário</th>
                        <th>Situação</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((employee) => (
                        <tr key={employee.id}>
                            <td >{employee.name}</td>
                            <td >{professions[employee.profession]}</td>
                            <td >{employee.salary}</td>
                            <td >{employee.active ? "Ativo" : "Inativo"}</td>
                            <td ><Link to={`/employees/${employee.id}`}><FaPen /></Link></td>
                            <td ><FaTrash onClick={() => del(employee)} /></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
        <Stack className='float-end' direction="horizontal" gap={2}>
            <h5 className='float-end'>
                Folha de pagamento total: {filtered.reduce((prev, current) => {
                    return prev + +current.salary
                }, 0)}
            </h5>
        </Stack>
    </>
    )
}

export default ListEmployees;
