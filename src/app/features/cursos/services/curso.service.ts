import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Curso } from '../../../shared/interfaces/models.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private http = inject(HttpClient);
  private readonly API = 'http://localhost:8080/api/v1';

  private cursosSubject = new BehaviorSubject<Curso[]>([]);
  cursos$ = this.cursosSubject.asObservable();

  obtenerTodos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API}/cursos`).pipe(
      tap(cursos => this.cursosSubject.next(cursos))
    );
  }

  obtenerPublicos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API}/cursos/publicos`).pipe(
      tap(cursos => this.cursosSubject.next(cursos))
    );
  }

  obtenerPorDocente(docenteId: number): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.API}/cursos/docente/${docenteId}`);
  }

  crear(datos: any): Observable<Curso> {
    return this.http.post<Curso>(`${this.API}/cursos`, datos).pipe(
      tap(() => this.refrescar())
    );
  }

  editar(id: number, datos: any): Observable<Curso> {
    return this.http.put<Curso>(`${this.API}/cursos/${id}`, datos).pipe(
      tap(() => this.refrescar())
    );
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/cursos/${id}`).pipe(
      tap(() => this.refrescar())
    );
  }

  private refrescar() {
    this.http.get<Curso[]>(`${this.API}/cursos/publicos`).subscribe({
      next: cursos => this.cursosSubject.next(cursos),
      error: () => {}
    });
  }

  uploadImagen(file: File): Observable<string> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${this.API}/cursos/upload-imagen`, fd, { responseType: 'text' });
  }

  obtenerDocentes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/usuarios/docentes`);
  }
}
