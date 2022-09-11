
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

function App() {
  const profissao = {
    0: 'Desenvolvedor Back-end',
    1: 'Desenvolvedor Front-end',
    2: 'Desenvolvedor Mobile',
    3: 'Desenvolvedor Full-stack'
  };
  

  const [dados, setDados] = useState([{ nome: 'Sam', profissao: 0, salario: 5000 }]);
  const [dadosFiltrados, setdadosFiltrados] = useState([]);

  function cancelar() {
  
    console.log('veio cancelar');
    console.log(dados);
  }
  function editar() {
    console.log('veio editar');
    console.log(dados);
  }
  function apagar() {
    console.log('veio apagar');
    console.log(dados);
  }
  function filtrar() {
    const filtro = document.getElementById('filtro').value;
    const filtroProfissao = Object.keys(profissao).filter(k => profissao[k].includes(filtro));
    const filtrados = dados.filter(arr => arr.nome.includes(filtro) || filtroProfissao.includes( arr.profissao.toString() ));
    console.log(dados.filter(arr => arr.nome.includes(filtro) || filtroProfissao.includes( arr.profissao.toString() )));
    console.log(filtrados);
    if(filtrados === undefined){
      setdadosFiltrados([]);  
    }else{
      setdadosFiltrados([filtrados]);
    }
  }

  function cadastrar(){
    console.log('cadastro');
      
    const cadastro={
      nome: document.getElementById('nome').value,
      profissao:Number(document.getElementById('profissao').value),
      salario:Number(document.getElementById('salario').value)
    }

    console.log(cadastro);
    setDados([...dados,{...cadastro}]);
    document.getElementById('nome').value = '';
    document.getElementById('salario').value = '';
    filtrar();
  }

  let total = dadosFiltrados.reduce(function(prev, current) {
    return prev + +current.salario
  }, 0);


  return (
    <div className="App">
      <Container>
        <Stack direction="horizontal" gap={2}>
          <h5>
            Cadastro de Funcionários
          </h5>
        </Stack>
        <Row className="g-0 mb-1" xs={6} md={6} lg={6}>
         
          <Col md>
            <FloatingLabel label="Nome">
              <Form.Control id="nome" type="text" placeholder="Nome" />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel label="Profissão">
              <Form.Select id="profissao">
                {Object.keys(profissao).map(key => (
                  <option value={key} key={key}>{profissao[key]}</option>))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel label="Salário">
              <Form.Control id="salario" type="number" placeholder="Salário" />
            </FloatingLabel>
          </Col>       
        </Row>
        
        <Stack className="col-12 m-1" direction="horizontal" gap={2}>
          <Button variant="primary" size="lg" onClick={() => cancelar()}>Cancelar</Button>
          <Button  variant="success" size="lg" className="ms-auto" onClick={() => cadastrar()}>Criar</Button>
        </Stack>

        <Card >
        <Row className="g-0 m-2" xs={5} md={5} lg={5}>
         <Col md>
           <FloatingLabel label="Filtrar por nome ou profissão... ">
             <Form.Control id="filtro" type="text" onChange={filtrar} placeholder="Filtrar por nome ou profissão... " />
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

            {dadosFiltrados.map((reg, index) => (
              <tr id={index}>
                <td >{reg.nome}</td>
                <td >{profissao[reg.profissao]}</td>
                <td >{reg.salario}</td>
                <td ><FaPen onClick={editar}/></td>
                <td ><FaTrash onClick={apagar}/></td>
              </tr>
            ))}          
          </tbody>
        </Table></Card>
        <Stack className='float-end' direction="horizontal" gap={2}>
          <h5 className='float-end'>
           Folha de pagamento total: {total}
          </h5>
        </Stack>
      </Container>


    </div>
  );
}

export default App;
