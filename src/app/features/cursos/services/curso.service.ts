import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private http = inject(HttpClient);

  obtenerDocentes() {
  return this.http.get<Usuario[]>(
    'http://localhost:8080/api/v1/usuarios/docentes'
  );
}
}
