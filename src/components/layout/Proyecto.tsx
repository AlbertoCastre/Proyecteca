import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../layout/Header-Home";
import Footer from "../layout/Footer";
import ClienteAxios from "../../config/axios";
import { Project } from "../../types/Project";
import { useParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";

interface Categoria {
  categoria_id: number;
  categoria_nombre: string;
}

interface Carrera {
  carrera_id: number;
  carrera_nombre: string;
}

interface Estado {
  estado_id: number;
  estado_nombre: string;
}

const Proyecto: React.FC = () => {
    const [proyecto, setProyecto] = useState<Project | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [estados, setEstados] = useState<Estado[]>([]);
    const { id } = useParams<{ id: string }>();
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoriaId, setCategoriaId] = useState<number | null>(null);
    const [carreraId, setCarreraId] = useState<number | null>(null);
    const [estadoId, setEstadoId] = useState<number | null>(null);
    const [archivo, setArchivo] = useState<File | null>(null);
    const [usuarioId, setUsuarioId] = useState<number | null>(null);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const { user } = useUser();

    useEffect(() => {
        const fetchUserId = async () => {
            if (user?.googleId) {
                try {
                    const userResponse = await ClienteAxios.get(`/usuarios/por-google-id`, {
                        params: { googleId: user.googleId }
                    });
                    setUsuarioId(userResponse.data.usuario_id);
                } catch (error) {
                    console.error("Error al obtener el ID del usuario:", error);
                }
            }
        };

        fetchUserId();
    }, [user?.googleId]);

    useEffect(() => {
        ClienteAxios.get("/categorias")
            .then((response) => setCategorias(response.data))
            .catch((error) => console.error("Error al obtener categorías:", error));

        ClienteAxios.get("/carreras")
            .then((response) => setCarreras(response.data))
            .catch((error) => console.error("Error al obtener carreras:", error));

        ClienteAxios.get("/estados")
            .then((response) => setEstados(response.data))
            .catch((error) => console.error("Error al obtener estados:", error));
    }, []);

    useEffect(() => {
        const fetchProyecto = async () => {
            try {
                const response = await ClienteAxios.get(`/proyecto/${id}`);
                setProyecto(response.data);
                setTitulo(response.data.proyecto_titulo);
                setDescripcion(response.data.proyecto_descripcion);
                setCategoriaId(response.data.categoria_id);
                setCarreraId(response.data.carrera_id);
                setEstadoId(response.data.estado_id);

                // Si hay un archivo PDF asociado, genera su URL
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

    const handleEdit = () => {
        if (usuarioId && (proyecto?.usuario_id === usuarioId || user?.rol === 1)) {
            setEditMode(true);
        }
    };

    const handleSave = async () => {
        const errors: string[] = [];
    
        if (!titulo) errors.push("El título es obligatorio.");
        if (!descripcion) errors.push("La descripción es obligatoria.");
        if (!categoriaId) errors.push("Selecciona una categoría.");
        if (!carreraId) errors.push("Selecciona una carrera.");
        if (archivo && archivo.type !== "application/pdf") errors.push("El archivo debe ser un PDF.");
    
        if (errors.length > 0) {
            setFormErrors(errors);
            return;
        }
    
        setFormErrors([]);
    
        try {
            const formData = new FormData();
            formData.append("action", "update");
            formData.append("proyecto_id", id!);
            formData.append("proyecto_titulo", titulo);
            formData.append("proyecto_descripcion", descripcion);
            formData.append("proyecto_fecha_subida", new Date().toISOString());
            formData.append("categoria_id", categoriaId.toString());
            formData.append("carrera_id", carreraId.toString());
    
            // Si el usuario es un alumno (rol 2) y el proyecto estaba aprobado (estado 2),
            // cambiamos el estado a "en revisión" (estado 1)
            const nuevoEstadoId = (user?.rol === 2 && proyecto?.estado_id === 2) ? 1 : (estadoId || "1");
            formData.append("estado_id", nuevoEstadoId.toString());
    
            formData.append("usuario_id", usuarioId.toString());
    
            if (archivo) {
                formData.append("proyecto_archivo_pdf", archivo);
            }
    
            const response = await ClienteAxios.post(`/sube`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            console.log("Proyecto actualizado:", response.data);
            setEditMode(false);
    
            // Actualiza la URL del PDF si se ha subido uno nuevo
            if (archivo) {
                const newPdfResponse = await ClienteAxios.get(`/proyecto/${id}/pdf`, { responseType: 'arraybuffer' });
                const blob = new Blob([newPdfResponse.data], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            }
        } catch (error) {
            console.error("Error al actualizar el proyecto:", error);
        }
    };
    

    if (!proyecto) {
        return <p>Cargando...</p>;
    }

    const categoriaNombre = categorias.find(c => c.categoria_id === proyecto?.categoria_id)?.categoria_nombre || "Desconocida";
    const carreraNombre = carreras.find(c => c.carrera_id === proyecto?.carrera_id)?.carrera_nombre || "Desconocida";
    const estadoNombre = estados.find(e => e.estado_id === proyecto?.estado_id)?.estado_nombre || "Desconocido";
    const puedeEditar = proyecto?.usuario_id === usuarioId || user?.rol === 1;
    
    return (
        <>
            <Header />
            <div className="row container" style={{ padding: '50px 50px' }}>
                <div className="col-8 col-md-3 sidebar">
                    {/* Sidebar content can be added here if needed */}
                </div>
                <div className="col-8 col-md-9">
                    {editMode ? (
                        <div>
                            <h2>Editar Proyecto</h2>
                            {formErrors.length > 0 && (
                                <div className="alert alert-danger">
                                    {formErrors.map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))}
                                </div>
                            )}
                            <form>
                                <div className="form-group">
                                    <label htmlFor="titulo">Título:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripción:</label>
                                    <textarea
                                        className="form-control"
                                        id="descripcion"
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="categoria">Categoría:</label>
                                    <select
                                        className="form-control"
                                        id="categoria"
                                        value={categoriaId || ""}
                                        onChange={(e) => setCategoriaId(parseInt(e.target.value))}
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categorias.map((c) => (
                                            <option key={c.categoria_id} value={c.categoria_id}>
                                                {c.categoria_nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="carrera">Carrera:</label>
                                    <select
                                        className="form-control"
                                        id="carrera"
                                        value={carreraId || ""}
                                        onChange={(e) => setCarreraId(parseInt(e.target.value))}
                                    >
                                        <option value="">Selecciona una carrera</option>
                                        {carreras.map((c) => (
                                            <option key={c.carrera_id} value={c.carrera_id}>
                                                {c.carrera_nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {user?.rol === 1 && (
                                    <div className="form-group">
                                        <label htmlFor="estado">Estado:</label>
                                        <select
                                            className="form-control"
                                            id="estado"
                                            value={estadoId || ""}
                                            onChange={(e) => setEstadoId(parseInt(e.target.value))}
                                        >
                                            <option value="">Selecciona un estado</option>
                                            {estados.map((e) => (
                                                <option key={e.estado_id} value={e.estado_id}>
                                                    {e.estado_nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="archivo">Archivo PDF:</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="archivo"
                                        accept=".pdf"
                                        onChange={(e) => {
                                            const file = e.target.files ? e.target.files[0] : null;
                                            if (file && file.type !== "application/pdf") {
                                                setFormErrors(["El archivo debe ser un PDF."]);
                                            } else {
                                                setArchivo(file);
                                                setFormErrors([]);
                                            }
                                        }}
                                    />
                                </div>
                                <button type="button" className="btn btn-primary mt-3" onClick={handleSave}>
                                    Guardar
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div>
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
                                <strong>Estado: </strong>
                                <br /> {estadoNombre}
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
                                <p>No hay PDF disponible.</p>
                            )}

                            {puedeEditar && (
                                <button className="btn btn-primary mt-3" onClick={handleEdit}>
                                    Editar Proyecto
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Proyecto;
