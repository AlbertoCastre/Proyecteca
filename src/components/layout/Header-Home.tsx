import React from 'react';
import { useUser } from '../../context/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Logo from './img/logo_v2.png';

function Header() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (

    <>

    <Navbar expand="lg" style={{ backgroundColor: 'brown' }} variant="dark">
      <Container>
        <Navbar.Brand href="/home">
          <img src={Logo} style={{ width: '120px', height: '50px' }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Inicio</Nav.Link>
            <Nav.Link href="/profile">Perfil</Nav.Link>
            <NavDropdown title="Carreras" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Proyectos">Ingeniería en Software</NavDropdown.Item>
              <NavDropdown.Item href="/Proyectos">Ingeniería Financiera</NavDropdown.Item>
              <NavDropdown.Item href="/Proyectos">Ingeniería en Biomédica</NavDropdown.Item>
              <NavDropdown.Item href="/Proyectos">Ingeniería en Biotecnología</NavDropdown.Item>
              <NavDropdown.Item href="/Proyectos">Licenciatura en Terapia Física</NavDropdown.Item>
              <NavDropdown.Item href="/Proyectos">Licenciatura en Administración y Gestión Empresarial</NavDropdown.Item>
          
             
            </NavDropdown>
            {user && (
              <Nav.Link href="/sube">Publicar un Proyecto</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: {user ? <a href="#profile">{user.name}</a> : 'Guest'}
          </Navbar.Text>
        </Navbar.Collapse>

        <Dropdown as={ButtonGroup} style={{ marginLeft: '5px' }}>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" style={{ backgroundColor: 'transparent', border:'transparent' }} />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            {user && <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>

    </>
  );
}

export default Header;
