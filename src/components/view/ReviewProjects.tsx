import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import HeaderHome from "../layout/Header-Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { Project } from "../../types/Project"; // Importa la interfaz específica
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Spinner from "react-bootstrap/Spinner";
import { useUser } from "../../context/UserContext"; // Importa el UserContext

const ReviewProject: React.FC = () => {
  const [proyectos, setProyectos] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 9;
  const { user } = useUser(); // Obtiene el usuario actual

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await ClienteAxios.get("/proyectos/pendientes");
        setProyectos(response.data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProyectos();
  }, [user]);

  const handleVerMas = (id: number) => {
    navigate(`/proyecto/${id}`);
  };

  const handleUpdateEstado = async (id: number, estado: number) => {
    try {
      const formData = new FormData();
      formData.append("action", "update");
      formData.append("proyecto_id", id.toString());
      formData.append("estado_id", estado.toString());

      await ClienteAxios.post("/proyectos/update", formData);
      setProyectos(proyectos.filter((proyecto) => proyecto.proyecto_id !== id));
    } catch (error) {
      console.error("Error al actualizar el estado del proyecto:", error);
    }
  };

  // Paginación
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = proyectos.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <HeaderHome />

      <Container className="px-4 my-5">
        <Card className="px-4 my-5">
          <Card.Body>Proyectos en espera de ser aprobados</Card.Body>
        </Card>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>
        ) : (
          <>
            <Row>
              {currentProjects.map((proyecto) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  key={proyecto.proyecto_id}
                  className="mb-4"
                >
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{proyecto.proyecto_titulo}</Card.Title>
                      <Card.Text>{proyecto.proyecto_descripcion}</Card.Text>
                      <Card.Text>Autor: {proyecto.autor_nombre}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="primary"
                          onClick={() => handleVerMas(proyecto.proyecto_id)}
                        >
                          Ver más
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => handleUpdateEstado(proyecto.proyecto_id, 2)}
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleUpdateEstado(proyecto.proyecto_id, 3)}
                        >
                          Descartar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination className="justify-content-center">
              {Array.from(
                { length: Math.ceil(proyectos.length / projectsPerPage) },
                (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                )
              )}
            </Pagination>
          </>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default ReviewProject;
