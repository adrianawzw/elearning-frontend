import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EvaluacionService {
  private http = inject(HttpClient);
  private readonly API = environment.apiUrl;

  obtenerPorCurso(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/evaluaciones/curso/${cursoId}`);
  }

  obtenerPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/evaluaciones/${id}`);
  }

  crear(datos: any): Observable<any> {
    console.log('EvaluacionService.crear payload:', JSON.stringify(datos));
    return this.http.post<any>(`${this.API}/evaluaciones`, datos);
  }

  editar(id: number, datos: any): Observable<any> {
    return this.http.put<any>(`${this.API}/evaluaciones/${id}`, datos);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/evaluaciones/${id}`);
  }

  obtenerPreguntas(evaluacionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/preguntas/evaluacion/${evaluacionId}`);
  }

  crearPregunta(datos: any): Observable<any> {
    return this.http.post<any>(`${this.API}/preguntas`, datos);
  }

  eliminarPregunta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/preguntas/${id}`);
  }
}
