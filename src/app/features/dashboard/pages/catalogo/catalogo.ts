import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-catalogo',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo {
  categoriaActiva = 'Todos';
  categorias = ['Todos', 'Programación', 'Diseño', 'Datos', 'Idiomas', 'Negocios'];

  cursos = [
    { id: 1, titulo: 'Angular desde Cero', categoria: 'Programación', nivel: 'Básico', docente: 'Carlos López', estudiantes: 320, duracion: '20h', rating: 4.8, precio: 'Gratis', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop', inscrito: true },
    { id: 2, titulo: 'Spring Boot & REST API', categoria: 'Programación', nivel: 'Intermedio', docente: 'Ana García', estudiantes: 215, duracion: '25h', rating: 4.6, precio: '$29', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop', inscrito: false },
    { id: 3, titulo: 'Diseño UI/UX', categoria: 'Diseño', nivel: 'Básico', docente: 'María Rodríguez', estudiantes: 180, duracion: '15h', rating: 4.9, precio: 'Gratis', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop', inscrito: true },
    { id: 4, titulo: 'PostgreSQL Avanzado', categoria: 'Datos', nivel: 'Intermedio', docente: 'Luis Pérez', estudiantes: 145, duracion: '18h', rating: 4.5, precio: '$19', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop', inscrito: false },
    { id: 5, titulo: 'Python para Datos', categoria: 'Datos', nivel: 'Avanzado', docente: 'Sofía Martínez', estudiantes: 290, duracion: '30h', rating: 4.7, precio: '$39', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop', inscrito: false },
    { id: 6, titulo: 'Inglés Técnico TI', categoria: 'Idiomas', nivel: 'Básico', docente: 'John Williams', estudiantes: 410, duracion: '12h', rating: 4.4, precio: 'Gratis', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=200&fit=crop', inscrito: false },
    { id: 7, titulo: 'Marketing Digital', categoria: 'Negocios', nivel: 'Básico', docente: 'Laura Torres', estudiantes: 380, duracion: '16h', rating: 4.6, precio: '$24', img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=200&fit=crop', inscrito: false },
    { id: 8, titulo: 'Figma para Diseñadores', categoria: 'Diseño', nivel: 'Intermedio', docente: 'Pedro Gómez', estudiantes: 220, duracion: '10h', rating: 4.8, precio: '$15', img: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=200&fit=crop', inscrito: true },
  ];

  get cursosFiltrados() {
    if (this.categoriaActiva === 'Todos') return this.cursos;
    return this.cursos.filter(c => c.categoria === this.categoriaActiva);
  }

  setCategoria(cat: string) { this.categoriaActiva = cat; }

  getNivelColor(nivel: string): string {
    const map: Record<string, string> = { 'Básico': '#4CAF50', 'Intermedio': '#F48C06', 'Avanzado': '#9C27B0' };
    return map[nivel] ?? '#49BBBD';
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
