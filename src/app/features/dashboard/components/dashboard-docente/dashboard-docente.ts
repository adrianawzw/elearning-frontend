import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard-docente',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './dashboard-docente.html',
  styleUrl: './dashboard-docente.scss',
})
export class DashboardDocente {
  stats = [
    { icon: '👨‍🏫', value: '4', label: 'Cursos dictados' },
    { icon: '👨‍🎓', value: '156', label: 'Estudiantes totales' },
    { icon: '⭐', value: '4.8', label: 'Calificación promedio' },
    { icon: '📝', value: '8', label: 'Evaluaciones pendientes' },
  ];

  myCourses = [
    {
      title: 'Curso de Programación Web',
      students: 42,
      progress: 75,
      rating: 4.9,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYz5pp_WctPH0ujKjx84ONUCQEip0BcfZpwUIbKFSV3wqeYUJJ_x8vFM&s=10',
    },
    {
      title: 'Power BI para Principiantes',
      students: 38,
      progress: 40,
      rating: 4.7,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYz5pp_WctPH0ujKjx84ONUCQEip0BcfZpwUIbKFSV3wqeYUJJ_x8vFM&s=10',
    },
    {
      title: 'Data Science Básico',
      students: 56,
      progress: 90,
      rating: 4.9,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYz5pp_WctPH0ujKjx84ONUCQEip0BcfZpwUIbKFSV3wqeYUJJ_x8vFM&s=10',
    },
    {
      title: 'UI/UX Design',
      students: 20,
      progress: 25,
      rating: 4.5,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoYz5pp_WctPH0ujKjx84ONUCQEip0BcfZpwUIbKFSV3wqeYUJJ_x8vFM&s=10',
    },
  ];

  recentActivities = [
    {
      action: 'Nuevo estudiante inscrito',
      course: 'Data Science Básico',
      time: 'Hace 2 horas',
      icon: 'person_add',
    },
    {
      action: 'Evaluación calificada',
      course: 'Power BI para Principiantes',
      time: 'Hace 4 horas',
      icon: 'grading',
    },
    {
      action: 'Curso actualizado',
      course: 'Curso de Programación Web',
      time: 'Hace 1 día',
      icon: 'update',
    },
  ];
}
