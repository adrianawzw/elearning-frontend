export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  rol: 'ESTUDIANTE' | 'DOCENTE';
  especialidad?: string;
  codigoAlumno?: string;
}

export interface RegisterResponse {
  email: string;
  codigoAlumno: string;
  mensaje: string;
}

export interface UserSession {
  token: string;
  email: string;
  rol?: string;
  id?: number;
  nombres?: string;
  apellidos?: string;
  foto_url?: string;
}