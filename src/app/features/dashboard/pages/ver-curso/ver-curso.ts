import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-curso',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatTabsModule, RouterLink],
  templateUrl: './ver-curso.html',
  styleUrl: './ver-curso.scss',
})
export class VerCurso {
  leccionActiva = 0;

  curso = {
    titulo: 'Angular desde Cero',
    docente: 'Carlos López',
    progreso: 75,
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    descripcion: 'Aprende Angular moderno con proyectos reales y Angular Material.',
  };

  lecciones = [
    { id: 1, titulo: 'Introducción a Angular', duracion: '12 min', tipo: 'VIDEO', completada: true },
    { id: 2, titulo: 'Componentes y Templates', duracion: '18 min', tipo: 'VIDEO', completada: true },
    { id: 3, titulo: 'Data Binding', duracion: '15 min', tipo: 'VIDEO', completada: true },
    { id: 4, titulo: 'Servicios e Inyección', duracion: '20 min', tipo: 'VIDEO', completada: false },
    { id: 5, titulo: 'Material de apoyo - Módulo 1', duracion: '—', tipo: 'PDF', completada: false },
    { id: 6, titulo: 'Routing y Navegación', duracion: '22 min', tipo: 'VIDEO', completada: false },
    { id: 7, titulo: 'HttpClient y APIs', duracion: '25 min', tipo: 'VIDEO', completada: false },
    { id: 8, titulo: 'Proyecto Final', duracion: '45 min', tipo: 'VIDEO', completada: false },
  ];

  get leccionActual() { return this.lecciones[this.leccionActiva]; }
  get completadas() { return this.lecciones.filter(l => l.completada).length; }

  getTipoIcon(tipo: string): string {
    return tipo === 'VIDEO' ? 'smart_display' : tipo === 'PDF' ? 'picture_as_pdf' : 'link';
  }

  marcarCompletada() {
    this.lecciones[this.leccionActiva].completada = true;
    if (this.leccionActiva < this.lecciones.length - 1) this.leccionActiva++;
  }
}
