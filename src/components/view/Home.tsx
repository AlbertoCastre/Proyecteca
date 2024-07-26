import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import HeaderHome from "../layout/Header-Home";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Footer from "../layout/Footer";
import img1 from "./img/Img_Home.jpg";
import ClienteAxios from "../../config/axios";
import { Project } from '../../types/Project'; // Importa la interfaz específica
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { useUser } from "../../context/UserContext"; // Importa el UserContext

const CombinedView: React.FC = () => {
  const [proyectos, setProyectos] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 9;
  const { user } = useUser(); // Obtiene el usuario actual

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const response = await ClienteAxios.get('/home');
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

  // Paginación
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = proyectos.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <HeaderHome />

      <Container className="px-4 my-5">
        <Row>
          <Col sm={7}>
            <Image
              src={img1}
              style={{ width: "750px", height: "180px" }}
              fluid
              rounded
            />
          </Col>
          <Col sm={5}>
            <h1 className="font-weight-light">Bienvenido</h1>
            <p>
              Te invitamos a descubrir un espacio confiable y siempre accesible, donde podrás almacenar y compartir tus trabajos. Aquí, tus proyectos estarán protegidos y disponibles en cualquier momento y lugar, permitiéndote acceder a ellos con facilidad y tranquilidad.
            </p>
          </Col>
        </Row>

        <Card className="px-4 my-5">
          <Card.Body>PROYECTOS DESTACADOS</Card.Body>
        </Card>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" />
          </div>
        ) : (
          <>
            <Row>
              {currentProjects.map((proyecto) => (
                <Col xs={12} sm={6} md={4} key={proyecto.proyecto_id} className="mb-4">
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{proyecto.proyecto_titulo}</Card.Title>
                      <Card.Text>{proyecto.proyecto_descripcion}</Card.Text>
                      <Card.Text>Autor: {proyecto.autor_nombre}</Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button variant="primary" onClick={() => handleVerMas(proyecto.proyecto_id)}>Ver más</Button>
                        {/* Eliminado el botón de edición */}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Pagination className="justify-content-center">
              {Array.from({ length: Math.ceil(proyectos.length / projectsPerPage) }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default CombinedView;
