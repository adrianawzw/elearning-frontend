import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResultadoEvaluacionService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/api/v1';

  obtenerPorEstudiante(estudianteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/resultados-evaluacion/estudiante/${estudianteId}`);
  }

  obtenerPromedio(inscripcionId: number): Observable<any> {
    return this.http.get<any>(`${this.API}/resultados-evaluacion/promedio/${inscripcionId}`);
  }

  responder(body: { inscripcionId: number; evaluacionId: number; respuesta: string }): Observable<any> {
    return this.http.post<any>(`${this.API}/resultados-evaluacion/respuesta`, body);
  }

  calificar(resultadoId: number, nota: number): Observable<any> {
    return this.http.put<any>(`${this.API}/resultados-evaluacion/${resultadoId}/calificar`, { nota });
  }
}
