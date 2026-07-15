import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progreso } from '../../../shared/interfaces/models.interface';

@Injectable({ providedIn: 'root' })
export class ProgresoService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/api/v1';

  obtenerPorInscripcion(inscripcionId: number): Observable<Progreso[]> {
    return this.http.get<Progreso[]>(`${this.API}/progresos/inscripcion/${inscripcionId}`);
  }

  obtenerPorEstudiante(estudianteId: number): Observable<Progreso[]> {
    return this.http.get<Progreso[]>(`${this.API}/progresos/estudiante/${estudianteId}`);
  }

  marcarCompletado(inscripcionId: number, contenidoId: number): Observable<Progreso> {
    return this.http.post<Progreso>(`${this.API}/progresos`, {
      inscripcion: { id: inscripcionId },
      contenido: { id: contenidoId },
      completado: true
    });
  }
}
