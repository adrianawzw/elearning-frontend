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
    { id: 1, titulo: 'Angular desde Cero', categoria: 'Programación', nivel: 'Básico', docente: 'Carlos López', estudiantes: 320, duracion: '20h', icon: '💻', descripcion: 'Aprende Angular moderno con proyectos reales y Angular Material.', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=220&fit=crop' },
    { id: 2, titulo: 'Spring Boot & REST API', categoria: 'Programación', nivel: 'Intermedio', docente: 'Ana García', estudiantes: 215, duracion: '25h', icon: '⚙️', descripcion: 'Construye APIs robustas con Spring Boot, JPA y Spring Security.', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=220&fit=crop' },
    { id: 3, titulo: 'Diseño UI/UX', categoria: 'Diseño', nivel: 'Básico', docente: 'María Rodríguez', estudiantes: 180, duracion: '15h', icon: '🎨', descripcion: 'Principios de diseño centrado en el usuario y prototipado.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=220&fit=crop' },
    { id: 4, titulo: 'PostgreSQL Avanzado', categoria: 'Datos', nivel: 'Intermedio', docente: 'Luis Pérez', estudiantes: 145, duracion: '18h', icon: '🗄️', descripcion: 'Modelado, consultas avanzadas y optimización de bases de datos.', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=220&fit=crop' },
    { id: 5, titulo: 'Python para Datos', categoria: 'Datos', nivel: 'Avanzado', docente: 'Sofía Martínez', estudiantes: 290, duracion: '30h', icon: '📊', descripcion: 'Análisis de datos con Pandas, NumPy y visualización.', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=220&fit=crop' },
    { id: 6, titulo: 'Inglés Técnico TI', categoria: 'Idiomas', nivel: 'Básico', docente: 'John Williams', estudiantes: 410, duracion: '12h', icon: '🌐', descripcion: 'Vocabulario y comunicación técnica en inglés para desarrolladores.', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=220&fit=crop' },
    { id: 7, titulo: 'Marketing Digital', categoria: 'Negocios', nivel: 'Básico', docente: 'Laura Torres', estudiantes: 380, duracion: '16h', icon: '📈', descripcion: 'Estrategias de marketing digital, SEO y redes sociales.', img: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=220&fit=crop' },
    { id: 8, titulo: 'Figma para Diseñadores', categoria: 'Diseño', nivel: 'Intermedio', docente: 'Pedro Gómez', estudiantes: 220, duracion: '10h', icon: '✏️', descripcion: 'Diseño de interfaces profesionales con Figma desde cero.', img: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=220&fit=crop' },
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
