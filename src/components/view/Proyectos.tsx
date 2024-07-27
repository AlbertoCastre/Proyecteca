import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import HeaderHome from "../layout/Header-Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { Project } from "../../types/Project";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useParams, useNavigate } from "react-router-dom";

const Proyectos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [carreras, setCarreras] = useState<{ carrera_id: number; carrera_nombre: string }[]>([]);
  const { carreraId } = useParams<{ carreraId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (carreraId) {
          const response = await ClienteAxios.get(`/proyectos/carrera/${carreraId}`);
          setProjects(response.data);
        } else {
          const response = await ClienteAxios.get("/home");
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    const fetchCarreras = async () => {
      try {
        const response = await ClienteAxios.get("/carreras");
        setCarreras(response.data);
      } catch (error) {
        console.error("Error al obtener carreras:", error);
      }
    };

    fetchProjects();
    fetchCarreras();
  }, [carreraId]);

  const handleCarreraChange = (eventKey: string | null) => {
    if (eventKey) {
      navigate(`/proyectos/carrera/${eventKey}`);
    } else {
      navigate("/home");
    }
  };

  return (
    <>
      <HeaderHome />
      <Container className="my-4">
        <Row className="justify-content-between align-items-center mb-3">
          <Col md="auto">
            <h2>Proyectos Aprobados</h2>
          </Col>
          <Col md="auto">
            <NavDropdown title="Seleccionar Carrera" onSelect={handleCarreraChange}>
              <NavDropdown.Item eventKey="">Todas las carreras</NavDropdown.Item>
              {carreras.map((carrera) => (
                <NavDropdown.Item key={carrera.carrera_id} eventKey={carrera.carrera_id.toString()}>
                  {carrera.carrera_nombre}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Col>
        </Row>
        <Row>
          {projects.map((project) => (
            <Col md={4} key={project.proyecto_id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{project.proyecto_titulo}</Card.Title>
                  <Card.Text>{project.proyecto_descripcion}</Card.Text>
                  <Button variant="primary" href={`/proyecto/${project.proyecto_id}`}>
                    Ver más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Proyectos;
