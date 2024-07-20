import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
function Header() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: 'brown' }} variant="dark">
      <Container>
        <Navbar.Brand href="/home">PROYECTECA</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#link">Perfil</Nav.Link>
            <NavDropdown title="Carreras" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Ingeniería en Software</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Ingeniería Financiera</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Ingeniería en Biomédica</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Ingeniería en Biotecnología</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Licenciatura en Terapia Física</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5">Licenciatura en Administración y Gestión Empresarial</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
        <Dropdown as={ButtonGroup} style={{ marginLeft: '5px' }} >
      
      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" style={{ backgroundColor: 'brown' }} />

      <Dropdown.Menu >
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

      </Container>
    </Navbar>
  );
}

export default Header;
