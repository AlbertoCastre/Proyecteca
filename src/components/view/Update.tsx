import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import ClienteAxios from "../../config/axios";
import { useUser } from "../../context/UserContext"; // Importa el UserContext
import { Project } from '../../types/Project'; // Importa la interfaz Project

const UpdateProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState<Project | null>(null); // Usa el tipo Project o null
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser(); // Obtiene el usuario actual
  console.log(user)

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await ClienteAxios.get(`/proyectos/${id}`);
        setProyecto(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
        setError("No se pudo obtener el proyecto");
        setLoading(false);
      }
    };

    fetchProyecto();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await ClienteAxios.post(`/proyectos`, {
        action: "update",
        proyecto_id: proyecto?.proyecto_id,
        proyecto_titulo: proyecto?.proyecto_titulo,
        proyecto_descripcion: proyecto?.proyecto_descripcion,
        estado_id: proyecto?.estado_id, // Solo para profesores
      });
      navigate("/"); // Redirige a la vista principal después de la actualización
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
      setError("No se pudo actualizar el proyecto");
    }
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!proyecto) {
    return <div>No se encontró el proyecto.</div>;
  }

  return (
    <div>
      <h1>Actualizar Proyecto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProjectTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            value={proyecto.proyecto_titulo}
            onChange={(e) => setProyecto({ ...proyecto, proyecto_titulo: e.target.value })}
            readOnly={!isEditing}
          />
        </Form.Group>

        <Form.Group controlId="formProjectDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            value={proyecto.proyecto_descripcion}
            onChange={(e) => setProyecto({ ...proyecto, proyecto_descripcion: e.target.value })}
            readOnly={!isEditing}
          />
        </Form.Group>

        {user?.rol === 1 && ( // Solo los profesores pueden cambiar el estado, verifica el ID del rol
          <Form.Group controlId="formProjectStatus">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              value={proyecto.estado_id}
              onChange={(e) => setProyecto({ ...proyecto, estado_id: Number(e.target.value) })}
              disabled={!isEditing}
            >
              <option value="1">Aprobado</option>
              <option value="2">Pendiente</option>
              <option value="3">Rechazado</option>
            </Form.Control>
          </Form.Group>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <Button variant="primary" type="submit" disabled={!isEditing}>
          Guardar Cambios
        </Button>
        <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancelar" : "Editar"}
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProject;
