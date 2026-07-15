export interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  docente_id: number;
  fecha_creacion: string;
  nivel?: string;
  duracion?: string;
  categoria?: string;
  imagen_url?: string;
  docente?: { id: number; nombres?: string; apellidos?: string; email: string; rol: string; };
  estudiantes?: number;
  rating?: number;
  precio?: string;
  contenido?: number[];
  inscripciones?: number[];
}

export interface Inscripcion {
  id: number;
  estudiante_id: number;
  curso_id: number;
  fecha_inscripcion: string;
  estado: string;
  nota_final: number | null;
  curso_categoria?: string;
  curso_titulo?: string;
}

export interface Contenido {
  id: number;
  titulo: string;
  url_material?: string;
  urlMaterial?: string;
  tipo: string;
  curso_id?: number;
  cursoId?: number;
  duracion?: string;
}

export interface Progreso {
  id: number;
  inscripcion_id: number;
  contenido_id: number;
  completado: boolean;
  fecha_completado: string;
}

export interface UsuarioPerfil {
  id: number;
  email: string;
  rol: string;
  fecha_registro: string;
  nombres?: string;
  apellidos?: string;
  codigo_alumno?: string;
  foto_url?: string;
}
