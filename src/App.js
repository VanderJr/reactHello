
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import './App.css';


const professions = {
  0: 'Desenvolvedor Back-end',
  1: 'Desenvolvedor Front-end',
  2: 'Desenvolvedor Mobile',
  3: 'Desenvolvedor Full-stack'
};


function App() {

  const [profession, setProfession] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState();
  const [salary, setSalary] = useState("");
  const [filter, setFilter] = useState("");
  const [employees, setEmployees] = useState([]);

  const edit = (objectEmployee) => {
    setId(objectEmployee.id);
    setName(objectEmployee.name);
    setSalary(objectEmployee.salary);
    setProfession(objectEmployee.profession);
  }

  const del = (objectEmployee) => {
    if (window.confirm("Deseja apagar o registro?")) {
      setEmployees(
        employees.filter((a) => a.id !== objectEmployee.id)
      );
    }
  }

  const handleChangeName = event => {
    setName(event.target.value);
  }
  const handleChangeSalary = event => {
    setSalary(event.target.value);
  }
  const handleChangeprofession = event => {
    setProfession(event.target.value);
  }
  const handleChangeFilter = event => {
    setFilter(event.target.value);
  }

  const registration = () => {
    if (id == null) {
      const register = {
        id: Date.now(),
        name: name,
        profession: profession,
        salary: salary
      }
      setEmployees([...employees, register]);
    } else {
      setEmployees(employees.map(employee =>
        employee.id === id ? {
          id: id, name: name, profession: profession, salary: salary
        } : employee
      ));
    }
    cleanInput();
  }

  const cleanInput = () => {
    setName('');
    setSalary('');
    setId();
  }

  const filtered = employees.filter(employee => 
    {
      return employee.name.toLowerCase().includes(filter.toLowerCase()) || professions[employee.profession].toLowerCase().includes(filter.toLowerCase());
    });


  return (
    <div className="App">
      <Container>
        <Stack direction="horizontal" gap={2}>
          <h5>
            Cadastro de Funcionários
          </h5>
        </Stack>
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
        </Row>
        <Stack className="col-12 m-1" direction="horizontal" gap={2}>
          <Button variant="primary" size="lg" onClick={cleanInput}>Cancelar</Button>
          <Button id='btnCriar' variant="success" size="lg" className="ms-auto" onClick={registration}>{id ? "Atualizar" : "Criar"}</Button>
        </Stack>
        <Card >
          <Row className="g-0 m-2" xs={5} md={5} lg={5}>
            <Col md>
              <FloatingLabel label="Filtrar por name ou profissão... ">
                <Form.Control id="filter" type="text" value={filter} onChange={handleChangeFilter} placeholder="Filtrar por name ou profissão... " />
              </FloatingLabel>
            </Col>
          </Row>
          <Table responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Profissão</th>
                <th>Salário</th>
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
                  <td ><FaPen onClick={() => edit(employee)} /></td>
                  <td ><FaTrash onClick={() => del(employee)} /></td>
                </tr>
              ))}
            </tbody>
          </Table></Card>
        <Stack className='float-end' direction="horizontal" gap={2}>
          <h5 className='float-end'>
            Folha de pagamento total: {filtered.reduce((prev, current) => {
              return prev + +current.salary
            }, 0)}
          </h5>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
