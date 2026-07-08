import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resultados',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTabsModule, RouterLink],
  templateUrl: './resultados.html',
  styleUrl: './resultados.scss',
})
export class Resultados {
  evaluaciones = [
    { id: 1, titulo: 'Evaluación Final Angular', curso: 'Angular desde Cero', fecha: '15 Ene 2025', inscritos: 32, completados: 28, promedio: 78, estado: 'activa' },
    { id: 2, titulo: 'Quiz Python Básico', curso: 'Python para Datos', fecha: '10 Ene 2025', inscritos: 45, completados: 45, promedio: 85, estado: 'cerrada' },
    { id: 3, titulo: 'Evaluación UI/UX', curso: 'Diseño UI/UX', fecha: '20 Ene 2025', inscritos: 20, completados: 5, promedio: 72, estado: 'activa' },
    { id: 4, titulo: 'Examen SQL Avanzado', curso: 'PostgreSQL Avanzado', fecha: '05 Ene 2025', inscritos: 18, completados: 18, promedio: 65, estado: 'cerrada' },
  ];

  get activas() { return this.evaluaciones.filter(e => e.estado === 'activa'); }
  get cerradas() { return this.evaluaciones.filter(e => e.estado === 'cerrada'); }

  getPromedioColor(promedio: number): string {
    if (promedio >= 80) return '#4CAF50';
    if (promedio >= 60) return '#F48C06';
    return '#F44336';
  }
}
