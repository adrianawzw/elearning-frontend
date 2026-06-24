import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { Footer } from '../../../../shared/components/footer/footer';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lista-cursos',
  imports: [RouterLink, Navbar, Footer, MatIconModule],
  templateUrl: './lista-cursos.html',
  styleUrl: './lista-cursos.scss',
})
export class ListaCursos {
  categoriaActiva = 'Todos';

  categorias = ['Todos', 'Programación', 'Diseño', 'Datos', 'Idiomas', 'Negocios'];

  cursos = [
    { id: 1, titulo: 'Angular desde Cero', categoria: 'Programación', nivel: 'Básico', docente: 'Carlos López', estudiantes: 320, duracion: '20h', icon: '💻', descripcion: 'Aprende Angular moderno con proyectos reales y Angular Material.' },
    { id: 2, titulo: 'Spring Boot & REST API', categoria: 'Programación', nivel: 'Intermedio', docente: 'Ana García', estudiantes: 215, duracion: '25h', icon: '⚙️', descripcion: 'Construye APIs robustas con Spring Boot, JPA y Spring Security.' },
    { id: 3, titulo: 'Diseño UI/UX', categoria: 'Diseño', nivel: 'Básico', docente: 'María Rodríguez', estudiantes: 180, duracion: '15h', icon: '🎨', descripcion: 'Principios de diseño centrado en el usuario y prototipado.' },
    { id: 4, titulo: 'PostgreSQL Avanzado', categoria: 'Datos', nivel: 'Intermedio', docente: 'Luis Pérez', estudiantes: 145, duracion: '18h', icon: '🗄️', descripcion: 'Modelado, consultas avanzadas y optimización de bases de datos.' },
    { id: 5, titulo: 'Python para Datos', categoria: 'Datos', nivel: 'Avanzado', docente: 'Sofía Martínez', estudiantes: 290, duracion: '30h', icon: '📊', descripcion: 'Análisis de datos con Pandas, NumPy y visualización.' },
    { id: 6, titulo: 'Inglés Técnico TI', categoria: 'Idiomas', nivel: 'Básico', docente: 'John Williams', estudiantes: 410, duracion: '12h', icon: '🌐', descripcion: 'Vocabulario y comunicación técnica en inglés para desarrolladores.' },
    { id: 7, titulo: 'Marketing Digital', categoria: 'Negocios', nivel: 'Básico', docente: 'Laura Torres', estudiantes: 380, duracion: '16h', icon: '📈', descripcion: 'Estrategias de marketing digital, SEO y redes sociales.' },
    { id: 8, titulo: 'Figma para Diseñadores', categoria: 'Diseño', nivel: 'Intermedio', docente: 'Pedro Gómez', estudiantes: 220, duracion: '10h', icon: '✏️', descripcion: 'Diseño de interfaces profesionales con Figma desde cero.' },
  ];

  get cursosFiltrados() {
    if (this.categoriaActiva === 'Todos') return this.cursos;
    return this.cursos.filter(c => c.categoria === this.categoriaActiva);
  }

  setCategoria(cat: string) {
    this.categoriaActiva = cat;
  }

  getNivelClass(nivel: string): string {
    const map: Record<string, string> = { 'Básico': 'nivel-basico', 'Intermedio': 'nivel-intermedio', 'Avanzado': 'nivel-avanzado' };
    return map[nivel] ?? '';
  }
}
