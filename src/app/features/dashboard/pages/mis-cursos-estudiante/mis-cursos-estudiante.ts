import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-cursos-estudiante',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatTabsModule, RouterLink],
  templateUrl: './mis-cursos-estudiante.html',
  styleUrl: './mis-cursos-estudiante.scss',
})
export class MisCursosEstudiante {
  cursos = [
    { id: 1, titulo: 'Angular desde Cero', categoria: 'Programación', docente: 'Carlos López', progreso: 75, duracion: '20h', completadas: '15h', estado: 'activo', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop', ultimaActividad: 'Hace 2 días' },
    { id: 2, titulo: 'Diseño UI/UX', categoria: 'Diseño', docente: 'María Rodríguez', progreso: 40, duracion: '15h', completadas: '6h', estado: 'activo', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop', ultimaActividad: 'Hace 1 semana' },
    { id: 3, titulo: 'Python para Datos', categoria: 'Datos', docente: 'Sofía Martínez', progreso: 90, duracion: '30h', completadas: '27h', estado: 'activo', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop', ultimaActividad: 'Hoy' },
    { id: 4, titulo: 'Figma para Diseñadores', categoria: 'Diseño', docente: 'Pedro Gómez', progreso: 100, duracion: '10h', completadas: '10h', estado: 'completado', img: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=200&fit=crop', ultimaActividad: 'Hace 1 mes' },
    { id: 5, titulo: 'Inglés Técnico TI', categoria: 'Idiomas', docente: 'John Williams', progreso: 100, duracion: '12h', completadas: '12h', estado: 'completado', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=200&fit=crop', ultimaActividad: 'Hace 2 meses' },
  ];

  get activos() { return this.cursos.filter(c => c.estado === 'activo'); }
  get completados() { return this.cursos.filter(c => c.estado === 'completado'); }

  getProgresoColor(progreso: number): string {
    if (progreso >= 80) return '#4CAF50';
    if (progreso >= 50) return '#F48C06';
    return '#49BBBD';
  }
}
