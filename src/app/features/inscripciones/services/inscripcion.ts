import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../../shared/interfaces/models.interface';

@Injectable({ providedIn: 'root' })
export class InscripcionService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/api/v1';

  obtenerPorEstudiante(estudianteId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.API}/inscripciones/estudiante/${estudianteId}`);
  }

  inscribirse(estudianteId: number, cursoId: number): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${this.API}/inscripciones`, { estudiante_id: estudianteId, curso_id: cursoId });
  }

  obtenerFinalizadosPorCurso(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/inscripciones/curso/${cursoId}/finalizados`);
  }

  obtenerRecientesPorDocente(docenteId: number): Observable<{ estudiante_nombre: string; curso_titulo: string; fecha_inscripcion: string }[]> {
    return this.http.get<any[]>(`${this.API}/inscripciones/docente/${docenteId}/recientes`);
  }
}
