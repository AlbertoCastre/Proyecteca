import React, { useEffect, useState, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Img from "./img/Nata.webp";
import Header from "../layout/Header-Home";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { Project } from "../../types/Project";
import { useParams } from "react-router-dom";
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

// Configura la ubicación del worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

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

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [zoom, setZoom] = useState(1);

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
                    // En lugar de cargar desde datos del proyecto, carga el PDF desde el nuevo endpoint
                    const pdfResponse = await ClienteAxios.get(`/proyecto/${id}/pdf`, { responseType: 'arraybuffer' });
                    const loadingTask = pdfjsLib.getDocument({ data: pdfResponse.data });
                    loadingTask.promise.then((loadedPdf) => {
                        setPdf(loadedPdf);
                    });
                }
            } catch (error) {
                console.error("Error al obtener el proyecto o el archivo PDF:", error);
            }
        };

        if (id) {
            fetchProyecto();
        }
    }, [id]);

    useEffect(() => {
        if (pdf) {
            renderPage(currentPage);
        }
    }, [pdf, currentPage, zoom]);

    const renderPage = (pageNumber: number) => {
        pdf!.getPage(pageNumber).then((page) => {
            const viewport = page.getViewport({ scale: zoom });
            const canvas = canvasRef.current;
            const ctx = canvas!.getContext('2d')!;
            canvas!.width = viewport.width;
            canvas!.height = viewport.height;
            page.render({ canvasContext: ctx, viewport: viewport });
        });
    };

    const goPrevious = () => {
        if (pdf && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goNext = () => {
        if (pdf && currentPage < pdf.numPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && pdf) {
            const desiredPage = (e.target as HTMLInputElement).valueAsNumber;
            if (desiredPage >= 1 && desiredPage <= pdf.numPages) {
                setCurrentPage(desiredPage);
            }
        }
    };

    const zoomIn = () => {
        setZoom(zoom + 0.5);
    };

    const zoomOut = () => {
        if (zoom > 0.5) {
            setZoom(zoom - 0.5);
        }
    };

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
                    <img src={Img} alt="Imagen de portada" className="img-fluid" />
                    <p>
                        <strong>Fecha de publicación</strong>
                        <br />
                        {new Date(proyecto.proyecto_fecha_subida).toLocaleDateString()}
                    </p>
                </div>
                <div className="col-8 col-md-9">
                    <h2>{proyecto.proyecto_titulo}</h2>
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

                    <div id="my_pdf_viewer">
                        <div id="canvas_container" style={{ background: '#333', textAlign: 'center', border: 'solid 3px' }}>
                            <canvas id="pdf_renderer" ref={canvasRef}></canvas>
                        </div>
                        <div id="navigation_controls">
                            <button id="go_previous" onClick={goPrevious}>Previous</button>
                            <input
                                id="current_page"
                                value={currentPage}
                                type="number"
                                onChange={(e) => setCurrentPage(parseInt(e.target.value))}
                                onKeyPress={handleKeyPress}
                            />
                            <button id="go_next" onClick={goNext}>Next</button>
                        </div>
                        <div id="zoom_controls">
                            <button id="zoom_in" onClick={zoomIn}>+</button>
                            <button id="zoom_out" onClick={zoomOut}>-</button>
                        </div>
                        <style>{`
                            .canvas_container {
                                width: 800px;
                                height: 450px;
                                overflow: auto;
                            }
                        `}
                        </style>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Proyecto;
