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
    { nombre: 'Ana García', rol: 'Directora Académica', foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face' },
    { nombre: 'Carlos López', rol: 'Lead Developer', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { nombre: 'María Rodríguez', rol: 'Diseñadora UX', foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face' },
    { nombre: 'Luis Pérez', rol: 'Instructor Senior', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  ];

  stats = [
    { number: '15K+', label: 'Estudiantes' },
    { number: '200+', label: 'Cursos' },
    { number: '50+', label: 'Docentes' },
    { number: '16', label: 'Años de experiencia' },
  ];
}
