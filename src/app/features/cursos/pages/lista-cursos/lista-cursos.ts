import { Component, inject, OnInit } from '@angular/core';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { Footer } from '../../../../shared/components/footer/footer';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../../../shared/interfaces/models.interface';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-lista-cursos',
  imports: [Navbar, Footer, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './lista-cursos.html',
  styleUrl: './lista-cursos.scss',
})
export class ListaCursos implements OnInit {
  private cursoService = inject(CursoService);

  categoriaActiva = 'Todos';
  categorias = ['Todos', 'Programación', 'Diseño', 'Datos', 'Idiomas', 'Negocios'];
  cursos: Curso[] = [];
  cargando = true;

  ngOnInit() {
    console.log('lista-cursos ngOnInit');
    this.cursoService.obtenerPublicos().pipe(catchError((err) => {
      console.error('obtenerPublicos error:', err.status, err.message);
      return of([]);
    })).subscribe(data => {
      console.log('cursos cargados:', data.length);
      this.cursos = data;
      this.cargando = false;
    });
  }

  get cursosFiltrados() {
    if (this.categoriaActiva === 'Todos') return this.cursos;
    return this.cursos.filter(c => (c as any).categoria === this.categoriaActiva);
  }

  setCategoria(cat: string) { this.categoriaActiva = cat; }

  getNivelClass(nivel: string): string {
    const map: Record<string, string> = { 'basico': 'nivel-basico', 'intermedio': 'nivel-intermedio', 'avanzado': 'nivel-avanzado' };
    return map[nivel?.toLowerCase()] ?? '';
  }

  getAvatar(curso: Curso): string {
    return curso.imagen_url ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(curso.titulo)}&size=400&background=49BBBD&color=fff`;
  }
}