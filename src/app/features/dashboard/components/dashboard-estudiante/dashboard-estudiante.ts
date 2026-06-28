import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard-estudiante',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './dashboard-estudiante.html',
  styleUrl: './dashboard-estudiante.scss',
})
export class DashboardEstudiante {
  stats = [
    { icon: '📚', value: '8', label: 'Cursos Activos' },
    { icon: '✅', value: '12', label: 'Cursos Completados' },
    { icon: '📊', value: '65%', label: 'Progreso General' },
    { icon: '🏆', value: '4', label: 'Certificados' },
  ];

  videoViews = [
    { day: '1 Jan', views: 65 },
    { day: '2 Jan', views: 45 },
    { day: '3 Jan', views: 80 },
    { day: '4 Jan', views: 55 },
    { day: '5 Jan', views: 70 },
    { day: '6 Jan', views: 40 },
    { day: '7 Jan', views: 85 },
    { day: '8 Jan', views: 60 },
    { day: '9 Jan', views: 75 },
    { day: '10 Jan', views: 50 },
    { day: '11 Jan', views: 90 },
    { day: '12 Jan', views: 65 },
  ];

  // cursos activos plantilla
  activeCourses = [
    {
      title: 'Desarrollo Web Avanzado',
      description: 'Material de práctica y teoría sobre desarrollo web avanzado...',
      progress: 75,
      category: 'Programación',
      image:
        'https://web-assets.esetstatic.com/wls/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg',
    },
    {
      title: 'Power BI para Principiantes',
      description: 'Material de práctica y teoría sobre marketing digital...',
      progress: 40,
      category: 'Certificación',
      image: 'https://web-assets.esetstatic.com/wls/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg',
    },
    {
      title: 'Data Science Básico',
      description: 'Material de práctica y teoría sobre los fundamentos de data science...',
      progress: 90,
      category: 'Teoría',
      image: 'https://web-assets.esetstatic.com/wls/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg',
    },
    {
      title: 'UI/UX Design',
      description:
        'Material de práctica y teoría sobre diseño de interfaces y experiencia de usuario...',
      progress: 25,
      category: 'Diseño',
      image: 'https://web-assets.esetstatic.com/wls/2018/04/cursos-online-gratuitos-seguridad-inform%C3%A1tica.jpg',
    },
  ];
}
