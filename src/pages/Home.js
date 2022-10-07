import { Outlet, Link, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';

const Home = () => {
    const location = useLocation();
    const isEmployeeRegistrationPage = location.pathname.includes('employees');
    const isEmployeeListPage = location.pathname.includes('list');

    return (<>
        <div className="App">
            <Container>
                <Stack className="col-12 m-1" direction="horizontal" gap={2}>
                    <Link to="/">
                        <Button variant={!isEmployeeRegistrationPage && !isEmployeeListPage ? "secondary" : "primary"} size="lg" >Home</Button>
                    </Link>
                    <Link to="/employees">
                        <Button variant={!isEmployeeRegistrationPage ? "primary" : "secondary"} size="lg" >Cadastrar</Button>
                    </Link>
                    <Link to="/listEmployees">
                        <Button variant={!isEmployeeListPage ? "primary" : "secondary"} size="lg" >Listagem</Button>
                    </Link>
                </Stack>
                {
                    !isEmployeeRegistrationPage && !isEmployeeListPage ? <h1>Selecione uma opção no menu acima</h1> : <Outlet />
                }
            </Container>
        </div>
    </>
    )
}

export default Home;


