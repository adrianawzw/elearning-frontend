export interface Usuario {
  id: number;
  email: string;
  nombres: string;
  apellidos: string;
  rol: string;
  fecha_registro: string;
  especialidad: string | null;
  codigo_alumno: string | null;
}