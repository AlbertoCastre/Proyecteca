import React, { useState, useEffect } from "react";
import Footer from "../layout/Footer";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ClienteAxios from "../../config/axios";
import { useUser } from "../../context/UserContext";
import HeaderHome from "../layout/Header-Home";
import Modal from "react-bootstrap/Modal";

interface Categoria {
  categoria_id: number;
  categoria_nombre: string;
}

interface Carrera {
  carrera_id: number;
  carrera_nombre: string;
}

function SwitchExample({ isChecked, onChange }: { isChecked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Acepto que este trabajo es de mi propiedad y no es plagio"
        checked={isChecked}
        onChange={onChange}
      />
    </Form>
  );
}

const Sube: React.FC = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setArchivo(acceptedFiles[0]);
    },
  });

  const { user } = useUser();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("");
  const [selectedCarrera, setSelectedCarrera] = useState<string>("");
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [archivo, setArchivo] = useState<File | null>(null);

  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    // Obtener categorías
    ClienteAxios.get("/categorias")
      .then((response) => setCategorias(response.data))
      .catch((error) => console.error("Error al obtener categorías:", error));

    // Obtener carreras
    ClienteAxios.get("/carreras")
      .then((response) => setCarreras(response.data))
      .catch((error) => console.error("Error al obtener carreras:", error));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user?.googleId) {
      alert("Usuario no autenticado");
      return;
    }

    if (!titulo || !descripcion || !selectedCategoria || !selectedCarrera || !archivo) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      // Obtener el usuario_id usando el googleId
      const response = await ClienteAxios.get("/usuarios/por-google-id", {
        params: { googleId: user.googleId },
      });
      const usuarioId = response.data.usuario_id;

      const formData = new FormData();
      formData.append("action", "insert");
      formData.append("proyecto_titulo", titulo);
      formData.append("proyecto_descripcion", descripcion);
      formData.append("proyecto_fecha_subida", new Date().toISOString());
      formData.append("categoria_id", selectedCategoria);
      formData.append("carrera_id", selectedCarrera);
      formData.append("estado_id", "1"); // Añade el estado seleccionado si lo tienes
      formData.append("proyecto_archivo_pdf", archivo);
      formData.append("usuario_id", usuarioId.toString());

      // Verifica los datos del FormData
      console.log("Datos del FormData:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const uploadResponse = await ClienteAxios.post("/sube", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Proyecto subido:", uploadResponse.data);

      // Mostrar el modal solo si el envío fue exitoso
      setShow(true);

      // Limpiar los campos del formulario
      setTitulo("");
      setDescripcion("");
      setSelectedCategoria("");
      setSelectedCarrera("");
      setArchivo(null);
      setIsAccepted(false);
    } catch (error) {
      console.error("Error al obtener el usuario_id o al subir el proyecto:", error);
    }
  };

  return (
    <>
      <HeaderHome />

<div style={{padding:'50px 300px'}}>
      <Form className="p-4"  onSubmit={handleSubmit}>
        <Form.Group className="mb-3"  controlId="titulo">
          <Form.Label>Título del proyecto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Título del proyecto"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="autor">
          <Form.Label>Nombre del autor</Form.Label>
          <Form.Control
            type="text"
            placeholder={user?.name || "Nombre del autor"}
            readOnly
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="carrera">
          <Form.Label>Programa educativo</Form.Label>
          <Form.Control
            as="select"
            value={selectedCarrera}
            onChange={(e) => setSelectedCarrera(e.target.value)}
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

        <Form.Group className="mb-3" controlId="categoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.categoria_id} value={categoria.categoria_id}>
                {categoria.categoria_nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción del proyecto</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            style={{ resize: "none" }}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="position-relative mb-3" {...getRootProps()}>
          <Form.Label>Subir archivo (PDF)</Form.Label>
          <div className={`dropzone ${isDragActive ? "active" : ""}`}>
            <input
              {...getInputProps()}
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                opacity: 0,
                cursor: "pointer",
              }}
              required
            />
            <i
              className="bi bi-cloud-arrow-up"
              style={{ fontSize: "60px", marginBottom: "15px" }}
            ></i>
            <p>
              {archivo
                ? `Archivo seleccionado: ${archivo.name}`
                : "Arrastre y suelte los archivos aquí para subirlos"}
            </p>
          </div>
        </Form.Group>

        <SwitchExample
          isChecked={isAccepted}
          onChange={(e) => setIsAccepted(e.target.checked)}
        />

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" disabled={!isAccepted}>
              Publicar proyecto
            </Button>
          </Col>
        </Form.Group>
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Proyecto Publicado</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡El proyecto ha sido publicado exitosamente!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Sube;
