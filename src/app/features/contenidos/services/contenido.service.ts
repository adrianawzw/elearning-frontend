import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenido } from '../../../shared/interfaces/models.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContenidoService {
  private http = inject(HttpClient);
  private readonly API = environment.apiUrl;

  obtenerPorCurso(cursoId: number): Observable<Contenido[]> {
    return this.http.get<Contenido[]>(`${this.API}/contenidos/curso/${cursoId}`);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/contenidos/${id}`);
  }

  uploadArchivo(file: File): Observable<string> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${this.API}/contenidos/upload`, fd, { responseType: 'text' });
  }

  crear(datos: any): Observable<Contenido> {
    return this.http.post<Contenido>(`${this.API}/contenidos`, datos);
  }

  editar(id: number, datos: any): Observable<Contenido> {
    return this.http.put<Contenido>(`${this.API}/contenidos/${id}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/contenidos/${id}`);
  }
}
