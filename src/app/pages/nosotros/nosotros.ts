import { Component } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-nosotros',
  imports: [Navbar, Footer, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.scss',
})
export class Nosotros {
  valores = [
    { icon: 'lightbulb', titulo: 'Innovación', desc: 'Tecnología al servicio del aprendizaje continuo.' },
    { icon: 'handshake', titulo: 'Compromiso', desc: 'Dedicados al éxito académico de cada estudiante.' },
    { icon: 'public', titulo: 'Accesibilidad', desc: 'Educación de calidad disponible para todos.' },
    { icon: 'emoji_events', titulo: 'Excelencia', desc: 'Contenido creado por expertos reconocidos.' },
  ];

  equipo = [
    { nombre: 'Ana García', rol: 'Directora Académica', icon: 'manage_accounts' },
    { nombre: 'Carlos López', rol: 'Lead Developer', icon: 'code' },
    { nombre: 'María Rodríguez', rol: 'Diseñadora UX', icon: 'palette' },
    { nombre: 'Luis Pérez', rol: 'Instructor Senior', icon: 'school' },
  ];

  stats = [
    { number: '15K+', label: 'Estudiantes' },
    { number: '200+', label: 'Cursos' },
    { number: '50+', label: 'Docentes' },
    { number: '16', label: 'Años de experiencia' },
  ];
}
