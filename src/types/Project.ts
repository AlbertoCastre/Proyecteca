export interface Project {
  proyecto_id: number;
  proyecto_titulo: string;
  proyecto_descripcion: string;
  proyecto_fecha_subida: Date; // datetime en SQL se mapea como Date en TypeScript
  proyecto_archivo_pdf: Blob; // longblob en SQL se mapea como Blob en TypeScript
  usuario_id: number;
  carrera_id: number;
  estado_id: number;
  categoria_id: number;
  autor_nombre?: string; // Agregado para incluir el nombre del autor
}
