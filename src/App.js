
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import './App.css';


const profissoes = {
  0: 'Desenvolvedor Back-end',
  1: 'Desenvolvedor Front-end',
  2: 'Desenvolvedor Mobile',
  3: 'Desenvolvedor Full-stack'
};


function App() {

  const [profissao, setProfissao] = useState(0);
  const [nome, setNome] = useState("");
  const [id, setId] = useState();
  const [salario, setSalario] = useState("");
  const [filtro, setFiltro] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [dados, setDados] = useState([]);
  const [btn, setBtn] = useState("Criar");


  const cancelar = () => {
    cleanInput();
  }

  const editar = (i) => {
    setId(i);
    dados.map((a) => {
      if (a.id == i) {
        setNome(a.nome);
        setSalario(a.salario);
        setProfissao(a.profissao);
      }
      return true;
    });
  }

  useEffect(() => {
    const filtroProfissoes = Object.keys(profissoes).filter(k => profissoes[k].toLowerCase().includes(filtro.toLowerCase()));
    const filtrados = dados.filter(arr => arr.nome.toLowerCase().includes(filtro.toLowerCase()) || filtroProfissoes.includes(arr.profissao.toString()));
    if (filtrados == null) {
      setDadosFiltrados([]);
    } else {
      setDadosFiltrados([...filtrados]);
    }
  }, [filtro, dados]);

  useEffect(() => {
    if(id == null){
      setBtn('Criar');
    }else{
      setBtn('Atualizar');
    }
  }, [id]);


  const apagar = (id) => {
    if (window.confirm("Deseja apagar o registro?")) {
      setDados(
        dados.filter((a) => {
          if (a.id !== id) {
            return a;
          }
          return false;
        })
      );
    }
  }

  const nomeChange = event => {
    setNome(event.target.value);
  }
  const salarioChange = event => {
    setSalario(event.target.value);
  }
  const profissaoChange = event => {
    setProfissao(event.target.value);
  }
  const filtroChange = event => {
    setFiltro(event.target.value);
  }

  const cadastrar = () => {
    if(id == null){
      const cadastro = {
        id: Date.now(),
        nome: nome,
        profissao: profissao,
        salario: salario
      }
      setDados([...dados, cadastro]);
    }else{
      const cadastro = {
        id: id,
        nome: nome,
        profissao: profissao,
        salario: salario
      }
      const novo = dados.filter((a) => {
        if (a.id !== id) {
          return a;
        }
        return false;
      });
      setDados([...novo, cadastro]);
    }
    cleanInput();
  }

  const cleanInput = () => {
    setNome('');
    setSalario('');
    setId();
  }

  const total = dadosFiltrados.reduce((prev, current) => {
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
        <Row className="g-0 mb-1" md={5} >
          <Col md>
            <FloatingLabel label="Nome">
              <Form.Control id="nome" value={nome} onChange={nomeChange} type="text" placeholder="Nome" />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel label="Profissão">
              <Form.Select id="profissao" value={profissao} onChange={profissaoChange}>
                {Object.keys(profissoes).map(key => (
                  <option value={key} key={key}>{profissoes[key]}</option>))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel label="Salário">
              <Form.Control id="salario" value={salario} onChange={salarioChange} type="number" placeholder="Salário" />
            </FloatingLabel>
          </Col>
        </Row>
        <Stack className="col-12 m-1" direction="horizontal" gap={2}>
          <Button variant="primary" size="lg" onClick={cancelar}>Cancelar</Button>
          <Button id='btnCriar' variant="success" size="lg" className="ms-auto" onClick={cadastrar}>{btn}</Button>
        </Stack>
        <Card >
          <Row className="g-0 m-2" xs={5} md={5} lg={5}>
            <Col md>
              <FloatingLabel label="Filtrar por nome ou profissão... ">
                <Form.Control id="filtro" type="text" value={filtro} onChange={filtroChange} placeholder="Filtrar por nome ou profissão... " />
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
              {dadosFiltrados.map((reg) => (
                <tr key={reg.id}>
                  <td >{reg.nome}</td>
                  <td >{profissoes[reg.profissao]}</td>
                  <td >{reg.salario}</td>
                  <td ><FaPen onClick={() => editar(reg.id)} /></td>
                  <td ><FaTrash onClick={() => apagar(reg.id)} /></td>
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
