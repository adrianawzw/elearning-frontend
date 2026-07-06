import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard-estudiante',
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressBarModule, MatButtonModule, MatChipsModule],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.scss',
})
export class DashboardEstudiante {
  today = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });

  stats = [
    { icon: 'menu_book', value: '8', label: 'Cursos Activos', color: '#49BBBD', bg: '#49BBBD18' },
    { icon: 'check_circle', value: '12', label: 'Cursos Completados', color: '#4CAF50', bg: '#4CAF5018' },
    { icon: 'trending_up', value: '65%', label: 'Progreso General', color: '#F48C06', bg: '#F48C0618' },
    { icon: 'workspace_premium', value: '4', label: 'Certificados', color: '#9C27B0', bg: '#9C27B018' },
  ];

  videoViews = [
    { day: '1 Ene', views: 65 },
    { day: '2 Ene', views: 45 },
    { day: '3 Ene', views: 80 },
    { day: '4 Ene', views: 55 },
    { day: '5 Ene', views: 70 },
    { day: '6 Ene', views: 40 },
    { day: '7 Ene', views: 85 },
    { day: '8 Ene', views: 60 },
    { day: '9 Ene', views: 75 },
    { day: '10 Ene', views: 50 },
    { day: '11 Ene', views: 90 },
    { day: '12 Ene', views: 65 },
  ];

  activeCourses = [
    { title: 'Desarrollo Web Avanzado', description: 'Práctica y teoría sobre desarrollo web avanzado.', progress: 75, category: 'Programación', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&h=80&fit=crop' },
    { title: 'Power BI para Principiantes', description: 'Análisis de datos y visualización con Power BI.', progress: 40, category: 'Certificación', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=80&fit=crop' },
    { title: 'Data Science Básico', description: 'Fundamentos de data science con Python.', progress: 90, category: 'Datos', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=120&h=80&fit=crop' },
    { title: 'UI/UX Design', description: 'Diseño de interfaces y experiencia de usuario.', progress: 25, category: 'Diseño', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=120&h=80&fit=crop' },
  ];

  categorias = [
    { label: 'Avanzado', count: 12, color: '#49BBBD' },
    { label: 'Certificado', count: 8, color: '#9C27B0' },
    { label: 'Principiante', count: 15, color: '#F48C06' },
    { label: 'Profesional', count: 6, color: '#4CAF50' },
  ];
}
