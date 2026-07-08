import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestionar-cursos',
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './gestionar-cursos.html',
  styleUrl: './gestionar-cursos.scss',
})
export class GestionarCursos {
  cursos = [
    { id: 1, titulo: 'Angular desde Cero', categoria: 'Programación', nivel: 'Básico', estudiantes: 42, progreso: 75, rating: 4.9, estado: 'publicado', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop' },
    { id: 2, titulo: 'Power BI para Principiantes', categoria: 'Datos', nivel: 'Básico', estudiantes: 38, progreso: 40, rating: 4.7, estado: 'publicado', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop' },
    { id: 3, titulo: 'Data Science Básico', categoria: 'Datos', nivel: 'Intermedio', estudiantes: 56, progreso: 90, rating: 4.9, estado: 'publicado', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop' },
    { id: 4, titulo: 'UI/UX Design', categoria: 'Diseño', nivel: 'Básico', estudiantes: 20, progreso: 25, rating: 4.5, estado: 'borrador', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop' },
  ];

  getNivelColor(nivel: string): string {
    const map: Record<string, string> = { 'Básico': '#4CAF50', 'Intermedio': '#F48C06', 'Avanzado': '#9C27B0' };
    return map[nivel] ?? '#49BBBD';
  }

  get cursosPublicados(): number {
    return this.cursos.filter(c => c.estado === 'publicado').length;
  }

  get totalEstudiantes(): number {
    return this.cursos.reduce((acc, c) => acc + c.estudiantes, 0);
  }
}
