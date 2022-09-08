
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './App.css';

const profession = {
  0: "Desenvolvedor Back-end",
  1: "Desenvolvedor Front-end",
  2: "Desenvolvedor Mobile",
  3: "Desenvolvedor Full-stack"
};

function cancelar() {
  console.log('veio aqui');
}
function App() {
  return (
    <div className="App">

      <Container>
        <Stack direction="horizontal" gap={2}>
          <h5>
            Cadastro de Funcionários
          </h5>
        </Stack>
        <Row className="g-0 mb-1" xs={} md={6} lg={6}>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Nome">
              <Form.Control type="text" placeholder="Nome" />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Profissão"
            >
              <Form.Select aria-label="Floating label select example">
                {Object.keys(profession).map(key => (
                  <option value={key} key={key}>{profession[key]}</option>))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingInputGrid" label="Salário">
              <Form.Control type="text" placeholder="Salário" />
            </FloatingLabel>
          </Col>
        </Row>


        <Stack className="col-12" direction="horizontal" gap={2}>
          <Button variant="primary" size="lg" onClick={() => cancelar()}>Cancelar</Button>
          <Button variant="success" size="lg" className="ms-auto" onClick={() => cancelar()}>Criar</Button>

        </Stack>
      </Container>


    </div>
  );
}

export default App;
