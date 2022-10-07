
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState, useEffect } from 'react';
import { professions } from '../professions';
import { createEmployee, updateEmployee, getEmployee } from '../employee';
import { useLoaderData, } from "react-router-dom";


export async function loader({ params }) {
    const employee = await getEmployee(params.employeeId);
    if (!employee) {
        throw new Response("", {
            status: 404,
            statusText: "Cadastro não encontrado",
        });
    }
    return employee;
}


export default function Employees() {

    const employee = useLoaderData();    

    const [profession, setProfession] = useState(0);
    const [name, setName] = useState("");
    const [id, setId] = useState();
    const [salary, setSalary] = useState("");
    const [active, setActive] = useState(true);
    const [employees, setEmployees] = useState([]);

    const handleChangeName = event => {
        setName(event.target.value);
    }
    const handleChangeSalary = event => {
        setSalary(event.target.value);
    }
    const handleChangeprofession = event => {
        setProfession(event.target.value);
    }
    const handleChangeActive = event => {
        setActive(event.target.checked);
    }
    const cleanInput = () => {
        setName('');
        setSalary('');
        setId();
    }
    const registration = () => {
        if (id == null) {
            const register = {
                id: Date.now(),
                name: name,
                profession: profession,
                salary: salary,
                active: active
            }
            createEmployee(register);
            setEmployees([...employees, register]);
        } else {
            updateEmployee(id, { id: id, name: name, profession: profession, salary: salary, active: active });
            // refreshEmployees();
            setEmployees(employees.map(employee =>
                employee.id === id ? {
                    id: id, name: name, profession: profession, salary: salary, active: active
                } : employee
            ));
        }
        cleanInput();
    }
    const edit = (objectEmployee) => {
        setId(objectEmployee.id);
        setName(objectEmployee.name);
        setSalary(objectEmployee.salary);
        setProfession(objectEmployee.profession);
        setActive(objectEmployee.active);
    }
    useEffect(() => {
        if(employee) edit(employee);
      }, [employee]); 

    return (<>
        <Stack direction="horizontal" gap={2}>
            <h5>
                Cadastro de Funcionários
            </h5>
        </Stack>
        <Form>
            <Row className="g-0 mb-1" md={5} >
                <Col md>
                    <FloatingLabel label="Name">
                        <Form.Control id="name" value={name} onChange={handleChangeName} type="text" placeholder="Name" />
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="Profissão">
                        <Form.Select id="profession" value={profession} onChange={handleChangeprofession}>
                            {Object.keys(professions).map(key => (
                                <option value={key} key={key}>{professions[key]}</option>))}
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col md>
                    <FloatingLabel label="Salário">
                        <Form.Control id="salary" value={salary} onChange={handleChangeSalary} type="number" placeholder="Salário" />
                    </FloatingLabel>
                </Col>
                <Col md  >
                    <div className="mb-3">
                        <Form.Check inline label="Ativo" type="checkbox" checked={active} onChange={handleChangeActive} id="active" />
                    </div>
                </Col>
            </Row>
        </Form>
        <Stack className="col-12 m-1" direction="horizontal" gap={2}>
            <Link to="/"><Button variant="primary" size="lg" onClick={cleanInput}>Cancelar</Button></Link>
            <Link to="/listEmployees"><Button id='btnCriar' variant="success" size="lg" className="ms-auto" onClick={registration}>{id ? "Atualizar" : "Criar"}</Button></Link>
        </Stack>
    </>
    )
}

