import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../../shared/components/navbar/navbar';
import { Footer } from '../../../../shared/components/footer/footer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-detalle-curso',
  imports: [RouterLink, Navbar, Footer, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatListModule, MatDividerModule],
  templateUrl: './detalle-curso.html',
  styleUrl: './detalle-curso.scss',
})
export class DetalleCurso {
  curso = {
    id: 1,
    titulo: 'Angular desde Cero',
    categoria: 'Programación',
    nivel: 'Básico',
    docente: 'Carlos López',
    estudiantes: 320,
    duracion: '20h',
    icon: '💻',
    descripcion: 'Aprende Angular moderno con proyectos reales. Este curso te llevará desde los conceptos básicos hasta la construcción de aplicaciones completas con Angular Material, RxJS y comunicación con APIs REST.',
    objetivos: [
      'Comprender la arquitectura de Angular',
      'Crear componentes y servicios reutilizables',
      'Implementar routing y lazy loading',
      'Consumir APIs REST con HttpClient',
      'Usar Angular Material para interfaces profesionales',
    ],
    temario: [
      { modulo: 'Módulo 1', titulo: 'Introducción a Angular', lecciones: 5 },
      { modulo: 'Módulo 2', titulo: 'Componentes y Templates', lecciones: 8 },
      { modulo: 'Módulo 3', titulo: 'Servicios e Inyección de Dependencias', lecciones: 6 },
      { modulo: 'Módulo 4', titulo: 'Routing y Lazy Loading', lecciones: 4 },
      { modulo: 'Módulo 5', titulo: 'Proyecto Final', lecciones: 3 },
    ],
  };
}
