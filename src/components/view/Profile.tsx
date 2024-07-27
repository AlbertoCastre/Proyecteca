import React, { useEffect, useState } from "react";
import {  
  Container,
  Row,
  Col,
  Pagination,
  Spinner,
  Button,
  Card,
} from "react-bootstrap";
import Header from "../layout/Header-Home";
import ClienteAxios from "../../config/axios";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Project";
import {
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        if (user?.googleId) {
          const userResponse = await ClienteAxios.get(`/usuarios/por-google-id`, {
            params: { googleId: user.googleId },
          });
          const usuarioId = userResponse.data.usuario_id;
          const projectsResponse = await ClienteAxios.get(`/proyectos/por-usuario`, {
            params: { usuarioId },
          });
          setProjects(projectsResponse.data);
        }
      } catch (err) {
        console.error("Error al obtener proyectos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [user]);

  const handleVerMas = (id: number) => {
    navigate(`/proyecto/${id}`);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Header />
      <section className="py-5">
        <Container className="py-5">
          <Row>
            <Col lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                </MDBCardBody>
              </MDBCard>
            </Col>
            <Col lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <Row>
                    <Col sm="3">
                      <MDBCardText>Nombre</MDBCardText>
                    </Col>
                    <Col sm="9">
                      <MDBCardText className="text-muted">{user?.name}</MDBCardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <MDBCardText>Correo</MDBCardText>
                    </Col>
                    <Col sm="9">
                      <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                    </Col>
                  </Row>
                </MDBCardBody>
              </MDBCard>
            </Col>
          </Row>
        </Container>

        <Container>
          <Card className="px-4 my-5">
            <Card.Body>Mis Proyectos</Card.Body>
          </Card>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" />
            </div>
          ) : (
            <><Row>
            {currentProjects.length > 0 ? (
              currentProjects.map((project) => (
                <Col xs={12} sm={6} md={4} key={project.proyecto_id} className="mb-4">
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{project.proyecto_titulo}</Card.Title>
                      <Card.Text>{project.proyecto_descripcion}</Card.Text>
                      <Card.Text>Autor: {project.autor_nombre}</Card.Text>
                      <div className="d-flex justify-content-end">
                        <Button variant="primary" onClick={() => handleVerMas(project.proyecto_id)}>
                          Ver más
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => navigate(`/sube/${project.proyecto_id}`)}
                          className="ms-2"
                        >
                          Editar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Text>No tienes proyectos para mostrar.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
              <Pagination className="justify-content-center">
                {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }, (_, i) => (
                  <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default ProfilePage;
