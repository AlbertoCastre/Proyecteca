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

const CombinedView: React.FC = () => {
  const [proyectos, setProyectos] = useState<Project[]>([]); // Define el estado con la interfaz Project
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los proyectos del servidor
    const fetchProyectos = async () => {
      try {
        const response = await ClienteAxios.get('/home');
        console.log(response.data);
        setProyectos(response.data);
      } catch (error) {
        console.error("Error al obtener proyectos:", error);
      }
    };

    fetchProyectos();
  }, []);

  const handleVerMas = (id: number) => {
    navigate(`/proyecto/${id}`);
  };

  return (
    <div>
      <HeaderHome />

      <Container className="px-4 my-5">
        <Row className="px-4 my-5">
          <Col sm={7}>
            <Image
              src={img1}
              style={{ width: "750px", height: "180px" }}
              fluid
              rounded
            />
          </Col>
          <Col sm={5}>
            <h1 className="font-weight-light"> Bienvenido </h1>
            <p className="mt-4">
              Un lugar donde tus trabajos estarán seguros y disponibles en
              cualquier momento y lugar
            </p>
          </Col>
        </Row>

        <Card className="px-4 my-5">
          <Card.Body>PROYECTOS DESTACADOS</Card.Body>
        </Card>

        <Row>
          {proyectos.map((proyecto) => (
            <Col xs={12} sm={6} md={4} key={proyecto.proyecto_id} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{proyecto.proyecto_titulo}</Card.Title>
                  <Card.Text>{proyecto.proyecto_descripcion}</Card.Text>
                  <Card.Text>Autor: {proyecto.autor_nombre}</Card.Text>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" onClick={() => handleVerMas(proyecto.proyecto_id)}>Ver más</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default CombinedView;
