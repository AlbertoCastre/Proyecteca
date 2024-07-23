import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Img from "./img/Nata.webp";
import Header from "../layout/Header-Home";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { Project } from "../../types/Project"; // Importa la interfaz Project
import { useParams } from "react-router-dom";

const Proyecto: React.FC = () => {
  const [proyecto, setProyecto] = useState<Project | null>(null); // Usa la interfaz Project
  const { id } = useParams<{ id: string }>(); // Obtiene el id del parámetro de la ruta

  useEffect(() => {
    // Función para obtener el proyecto del servidor
    const fetchProyecto = async () => {
      try {
        const response = await ClienteAxios.get(`/proyecto/${id}`);
        setProyecto(response.data);
      } catch (error) {
        console.error("Error al obtener el proyecto:", error);
      }
    };

    if (id) {
      fetchProyecto();
    }
  }, [id]);

  if (!proyecto) {
    return <p>Cargando...</p>; // Muestra un mensaje mientras se carga el proyecto
  }

  return (
    <>
      <Header />
      <div className="row container">
        <div className="col-8 col-md-3 sidebar">
          <img src={Img} alt="Imagen de portada" className="img-fluid" />
          <p>
            <strong>Fecha de publicación</strong>
            <br />
            {new Date(proyecto.proyecto_fecha_subida).toLocaleDateString()} {/* Formatea la fecha */}
          </p>
        </div>
        <div className="col-8 col-md-9">
          <h2>{proyecto.proyecto_titulo}</h2>
          <p>
            <strong>Autor(es):</strong>
            <br /> {proyecto.autor_nombre} {/* Aquí se muestra el nombre del autor */}
          </p>
          <p>
            <strong>Resumen:</strong>
            <br />
            {proyecto.proyecto_descripcion}
          </p>
        </div>
      </div>
      <div className="row mt-5 container">
        <div className="col-12">
          <h4>Carreras</h4>
          <ul className="list-unstyled">
            {/* Aquí puedes mapear las carreras si están disponibles */}
            <li>Ingeniería en Software</li>
            <li>Ingeniería Financiera</li>
            <li>Ingeniería en Biomédica</li>
            <li>Ingeniería en Biotecnología</li>
            <li>Licenciatura en Terapia Física</li>
            <li>Licenciatura en Administración y Gestión Empresarial</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Proyecto;
