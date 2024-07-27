import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Img from "./img/Nata.webp";
import Header from "../layout/Header-Home";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { Project } from "../../types/Project";
import { useParams } from "react-router-dom";

interface Categoria {
  categoria_id: number;
  categoria_nombre: string;
}

interface Carrera {
  carrera_id: number;
  carrera_nombre: string;
}

const Proyecto: React.FC = () => {
    const [proyecto, setProyecto] = useState<Project | null>(null); // Usa la interfaz Project
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const { id } = useParams<{ id: string }>(); // Obtiene el id del parámetro de la ruta
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

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

    useEffect(() => {
        // Función para obtener el proyecto del servidor
        const fetchProyecto = async () => {
            try {
                const response = await ClienteAxios.get(`/proyecto/${id}`);
                setProyecto(response.data);
                // Cargar PDF después de obtener el proyecto
                if (response.data.proyecto_archivo_pdf) {
                    const pdfResponse = await ClienteAxios.get(`/proyecto/${id}/pdf`, { responseType: 'arraybuffer' });
                    const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
                    const url = URL.createObjectURL(blob);
                    setPdfUrl(url);
                }
            } catch (error) {
                console.error("Error al obtener el proyecto o el archivo PDF:", error);
            }
        };

        if (id) {
            fetchProyecto();
        }
    }, [id]);

    if (!proyecto) {
        return <p>Cargando...</p>; // Muestra un mensaje mientras se carga el proyecto
    }

    // Encuentra la categoría y la carrera por ID
    const categoriaNombre = categorias.find(c => c.categoria_id === proyecto.categoria_id)?.categoria_nombre || "Desconocida";
    const carreraNombre = carreras.find(c => c.carrera_id === proyecto.carrera_id)?.carrera_nombre || "Desconocida";

    return (
        <>
            <Header />
            <div className="row container" style={{ padding: '50px 50px' }}>
                <div className="col-8 col-md-3 sidebar">
                </div>
                <div className="col-8 col-md-9">
                    <h2>{proyecto.proyecto_titulo}</h2>

                    <p>
                        <strong>Fecha de publicación</strong>
                        <br />
                        {new Date(proyecto.proyecto_fecha_subida).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Autor(es):</strong>
                        <br /> {proyecto.autor_nombre}
                    </p>

                    <p>
                        <strong>Carrera: </strong>
                        <br /> {carreraNombre}
                    </p>

                    <p>
                        <strong>Categoría: </strong>
                        <br /> {categoriaNombre}
                    </p>

                    <p>
                        <strong>Resumen:</strong>
                        <br />
                        {proyecto.proyecto_descripcion}
                    </p>

                    {pdfUrl ? (
                        <div style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                            <iframe
                                src={pdfUrl}
                                width="100%"
                                height="500px"
                                style={{ border: 'none' }}
                                title="Embedded PDF Viewer"
                            ></iframe>
                        </div>
                    ) : (
                        <p>Loading PDF...</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Proyecto;
