import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Header from "../layout/Header-Home";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { useUser } from "../../context/UserContext";
import { Spinner, Button, Card, Container, Row, Col, Pagination, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/Project";

const ProfilePage: React.FC = () => {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 9;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    matricula: "",
    carrera: "",
  });
  const [carreras, setCarreras] = useState<{ carrera_id: number; carrera_nombre: string }[]>([]);
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
      } catch (err) {
        console.error("Error al obtener carreras:", err);
      }
    };

    fetchUserProjects();
    fetchCarreras();

    // Check if the user needs to fill out the form
    const checkUserData = async () => {
      if (user?.googleId) {
        try {
          const response = await ClienteAxios.get("/usuarios/por-google-id", {
            params: { googleId: user.googleId },
          });
          const userData = response.data;
          if (!userData.usuario_nombre || !userData.usuario_email || !userData.usuario_matricula) {
            setShowModal(true);
          }
          setFormData({
            nombre: userData.usuario_nombre || user.name,
            email: userData.usuario_email || user.email,
            matricula: userData.usuario_matricula || user.email.split('@')[0],
            carrera: userData.carrera_id || "",
          });
        } catch (err) {
          console.error("Error al obtener datos del usuario:", err);
        }
      }
    };

    checkUserData();
  }, [user]);

  const handleVerMas = (id: number) => {
    navigate(`/proyecto/${id}`);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const usuarioId = (await ClienteAxios.get("/usuarios/por-google-id", {
        params: { googleId: user.googleId },
      })).data.usuario_id;

      const response = await ClienteAxios.post("/usuarios", {
        action: "update",
        usuario_id: usuarioId,
        usuario_nombre: formData.nombre,
        usuario_email: formData.email,
        usuario_google_id: user.googleId,
        usuario_fecha_registro: new Date().toISOString(),
        carrera_id: formData.carrera,
        usuario_matricula: formData.matricula,
      });

      console.log("Respuesta del servidor:", response.data);
      handleCloseModal();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
    }
  };

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
                      <MDBCardText>Full Name</MDBCardText>
                    </Col>
                    <Col sm="9">
                      <MDBCardText className="text-muted">{formData.nombre}</MDBCardText>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </Col>
                    <Col sm="9">
                      <MDBCardText className="text-muted">{formData.email}</MDBCardText>
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
      </section>

      {/* Modal de actualización de usuario */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email
</Form.Label>
<Form.Control
type="email"
name="email"
value={formData.email}
onChange={handleInputChange}
readOnly
/>
</Form.Group>
<Form.Group controlId="formMatricula">
<Form.Label>Matricula</Form.Label>
<Form.Control
type="text"
name="matricula"
value={formData.matricula}
onChange={handleInputChange}
required
/>
</Form.Group>
<Form.Group controlId="formCarrera">
<Form.Label>Carrera</Form.Label>
<Form.Control
as="select"
name="carrera"
value={formData.carrera}
onChange={handleInputChange}
required
>
<option value="">Selecciona una carrera</option>
{carreras.map((carrera) => (
<option key={carrera.carrera_id} value={carrera.carrera_id}>
{carrera.carrera_nombre}
</option>
))}
</Form.Control>
</Form.Group>
<Button variant="primary" type="submit" className="mt-3">
Guardar
</Button>
</Form>
</Modal.Body>
</Modal>
</>
);
};

export default ProfilePage;