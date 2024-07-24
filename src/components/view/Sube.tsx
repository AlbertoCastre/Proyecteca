import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ClienteAxios from "../../config/axios";
import { useUser } from "../../context/UserContext";
import HeaderHome from "../layout/Header-Home";

interface Categoria {
  categoria_id: number;
  categoria_nombre: string;
}

interface Carrera {
  carrera_id: number;
  carrera_nombre: string;
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

    try {
      // Obtener el usuario_id usando el googleId
      const response = await ClienteAxios.get("/usuarios/por-google-id", {
        params: { googleId: user.googleId },
      });
      const usuarioId = response.data.usuario_id;

      if (
        !titulo ||
        !descripcion ||
        !selectedCategoria ||
        !selectedCarrera ||
        !archivo
      ) {
        alert("Todos los campos son obligatorios");
        return;
      }

      const formData = new FormData();
      formData.append("proyecto_titulo", titulo);
      formData.append("proyecto_descripcion", descripcion);
      formData.append("proyecto_fecha_subida", new Date().toISOString());
      formData.append("categoria_id", selectedCategoria);
      formData.append("carrera_id", selectedCarrera);
      formData.append("estado_id", "1"); // Añade el estado seleccionado si lo tienes
      formData.append("archivo_pdf", archivo);
      formData.append("usuario_id", usuarioId.toString()); // Agregar el user_id al FormData

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
    } catch (error) {
      console.error(
        "Error al obtener el usuario_id o al subir el proyecto:",
        error
      );
    }
  };

  return (
    <>
      <HeaderHome />

      <Form className="p-4" onSubmit={handleSubmit}>
        <div className="d-flex">
          <Form.Group>
            <Form.Group className="mb-3" controlId="titulo">
              <Form.Label>Título del proyecto</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="texto"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="autor">
              <Form.Label>Nombre del autor</Form.Label>
              <Form.Control
                type="text"
                placeholder={user?.name}
                readOnly
                className="texto"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="carrera">
              <Form.Label>Programa educativo</Form.Label>
              <Form.Control
                as="select"
                value={selectedCarrera}
                onChange={(e) => setSelectedCarrera(e.target.value)}
                className="texto"
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
                className="texto"
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.categoria_id}
                    value={categoria.categoria_id}
                  >
                    {categoria.categoria_nombre}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción del proyecto</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              style={{ height: "300px", width: "600px", resize: "none" }}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>
        </div>

        <Form.Group
          className={`position-relative mb-3 dropzone-container ${
            archivo ? "file-selected" : ""
          }`}
          {...getRootProps()}
        >
          <Form.Label>Subir archivo (PDF)</Form.Label>
          <div className={`dropzone ${isDragActive ? "active" : ""}`}>
            <input
              {...getInputProps({
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setArchivo(e.target.files[0]);
                  }
                },
              })}
              name="archivo_pdf"
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
                ? "Archivo seleccionado: " + archivo.name
                : "Arrastre y suelte los archivos aquí para subirlos"}
            </p>
          </div>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Publicar proyecto</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default Sube;
