import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText } from "mdb-react-ui-kit";
import Header from "../layout/Header-Home";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { useUser } from "../../context/UserContext";
import { Spinner, Button, Card, Container, Row, Col, Pagination, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Project";

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 9;
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [carrera, setCarrera] = useState<number | "">("");
  const [matricula, setMatricula] = useState<string>("");
  const [formLoading, setFormLoading] = useState<boolean>(false);
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

    const fetchCarreras = async () => {
      try {
        const response = await ClienteAxios.get("/carreras");
        setCarreras(response.data);
      } catch (error) {
        console.error("Error al obtener carreras:", error);
      }
    };

    fetchUserProjects();
    fetchCarreras();
  }, [user]);

  const handleVerMas = (id: number) => {
    navigate(`/proyecto/${id}`);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormLoading(true);

    try {
      const response = await ClienteAxios.get("/usuarios/por-google-id", {
        params: { googleId: user?.googleId },
      });
      const usuarioId = response.data.usuario_id;

      const formData = new FormData();
      formData.append("action", "update");
      formData.append("usuario_id", usuarioId.toString());
      formData.append("usuario_nombre", nombre);
      formData.append("usuario_email", email);
      formData.append("usuario_google_id", user?.googleId || "");
      formData.append("usuario_fecha_registro", new Date().toISOString());
      formData.append("carrera_id", carrera.toString());
      formData.append("usuario_matricula", matricula);

      console.log("Datos del FormData:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const uploadResponse = await ClienteAxios.post("/usuarios", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Usuario actualizado:", uploadResponse.data);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
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
                      <MDBCardText>Full Name</MDBCardText>
                    </Col>
                    <Col sm="9">
                      <MDBCardText className="text-muted">{user?.name}</MDBCardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </Col>
                    <Col sm="9">
                      <MDBCardText className="text-muted">{user?.email}</MDBCardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <MDBCardText>Google ID</MDBCardText>
                    </Col>
                    <Col sm="9">
                      <MDBCardText className="text-muted">{user?.googleId}</MDBCardText>
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
            <>
              <Row>
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

        <Container>
          <h1>Actualizar Usuario</h1>
          {formLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCarrera">
                <Form.Label>Carrera</Form.Label>
                <Form.Control
                  as="select"
                  value={carrera}
                  onChange={(e) => setCarrera(Number(e.target.value))}
                  required
                >
                  <option value="">Seleccione una carrera</option>
                  {carreras.map((carrera) => (
                    <option key={carrera.carrera_id} value={carrera.carrera_id}>
                      {carrera.carrera_nombre}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formMatricula">
                <Form.Label>Matricula</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su matricula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Form>
          )}
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default ProfilePage;
