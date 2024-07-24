import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { DropdownButton, Dropdown } from 'react-bootstrap';

import './Style.css'; //importa Style.css
import HeaderHome from "../layout/Header-Home";

const Sube: React.FC = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': []
    },
    onDrop: (acceptedFiles: File[]) => {
      // Aquí puedes manejar los archivos subidos
      console.log(acceptedFiles);
    }
  });

  const [selectedOption, setSelectedOption] = useState<string>('Programa educativo');

  // Función para manejar la selección de una opción
  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedOption(eventKey);
    }
  };

  return (
    <>

    <HeaderHome/>

    <Form className="p-4">
      <div className="d-flex">
        <Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Título del proyecto</Form.Label>
            <Form.Control type="text" placeholder="" className="texto" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de expedición</Form.Label>
            <div className="d-flex">
              <Form.Group className="me-2">
                <Form.Label>Día</Form.Label>
                <Form.Control type="text" placeholder="" readOnly />
              </Form.Group>
              <Form.Group className="me-2">
                <Form.Label>Mes</Form.Label>
                <Form.Control type="text" placeholder="" readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Año</Form.Label>
                <Form.Control type="text" placeholder="" readOnly />
              </Form.Group>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Nombre del autor</Form.Label>
            <Form.Control type="text" placeholder="" className="texto" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicText">
          

          <DropdownButton
      id="dropdown-basic-button"
      title={selectedOption}
      onSelect={handleSelect} // Añade esta propiedad
    >
      <Dropdown.Item eventKey="Ingeniería en Software">Ingeniería en Software</Dropdown.Item>
      <Dropdown.Item eventKey="Ingeniería Financiera">Ingeniería Financiera</Dropdown.Item>
      <Dropdown.Item eventKey="Ingeniería en Biomédica">Ingeniería en Biomédica</Dropdown.Item>
      <Dropdown.Item eventKey="Ingeniería en Biotecnología">Ingeniería en Biotecnología</Dropdown.Item>
      <Dropdown.Item eventKey="Licenciatura en Terapia Física">Licenciatura en Terapia Física</Dropdown.Item>
      <Dropdown.Item eventKey="Licenciatura en Administración y Gestión Empresarial">Licenciatura en Administración y Gestión Empresarial</Dropdown.Item>
    </DropdownButton>

          </Form.Group>
        </Form.Group>


        

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{ padding:'30px 100px'}}>
          <Form.Label>Descripción del proyecto</Form.Label>
          <Form.Control as="textarea" rows={6} style={{ height: '300px', width: '600px'  }} />
        </Form.Group>
      </div>

      <Form.Group className="position-relative mb-3" {...getRootProps()}>
        <Form.Label>Subir archivo (PDF)</Form.Label>
        <div className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          
          <i className="bi bi-cloud-arrow-up" style={{ fontSize: '60px', marginBottom: '15px' }}></i>
          <p>Arrastre y suelte los archivos aquí para subirlos</p>
        </div>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Remember me" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
        <Col sm={{ span: 10, offset: 2 }}>
          <Form.Check label="Remember me" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Sign in</Button>
        </Col>
      </Form.Group>

    </Form>

</>

  );
};

export default Sube;
