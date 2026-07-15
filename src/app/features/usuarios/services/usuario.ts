import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioPerfil } from '../../../shared/interfaces/models.interface';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/api/v1';

  obtenerMe(): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>(`${this.API}/usuarios/me`);
  }

  obtenerEstudiante(id: number): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>(`${this.API}/estudiantes/${id}`);
  }

  actualizarEstudiante(id: number, datos: { nombres: string; apellidos: string }): Observable<UsuarioPerfil> {
    return this.http.put<UsuarioPerfil>(`${this.API}/estudiantes/${id}`, datos);
  }

  obtenerPorId(id: number): Observable<UsuarioPerfil> {
    return this.http.get<UsuarioPerfil>(`${this.API}/usuarios/${id}`);
  }

  actualizar(id: number, datos: Partial<UsuarioPerfil>): Observable<UsuarioPerfil> {
    return this.http.put<UsuarioPerfil>(`${this.API}/usuarios/${id}`, datos);
  }

  uploadFoto(usuarioId: number, file: File): Observable<UsuarioPerfil> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UsuarioPerfil>(`${this.API}/usuarios/${usuarioId}/foto`, formData);
  }
}
