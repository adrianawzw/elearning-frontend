import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, MatButtonModule, MatIcon, MatCardModule, MatFormFieldModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  stats = [
    { number: '15K+', label: 'Estudiantes' },
    { number: '75%', label: 'Éxito total' },
    { number: '35', label: 'Preguntas frecuentes' },
    { number: '26', label: 'Expertos destacados' },
    { number: '16', label: 'Años de experiencia' },
  ];

  features = [
    {
      icon: '📄',
      title: 'Inscripción y Gestión de Estudiantes en Línea',
      description:
        "Permite a los estudiantes inscribirse en cursos de manera sencilla y segura.",
    },
    {
      icon: '📅',
      title: 'Programación y Seguimiento de Progresos',
      description: 'Facilita la organización y el seguimiento del progreso de cursos.',
    },
    {
      icon: '👥',
      title: 'Seguimiento de Clientes',
      description:
        'Automatiza y rastrea correos electrónicos a individuos o grupos. El sistema integrado ayuda a organizar.',
    },
  ];

  testimonials = [
    {
      name: 'Gloria Sánchez',
      text: "iLearningHub ha sido una herramienta increíble para mi aprendizaje. La plataforma es fácil de usar y los cursos son muy completos. He mejorado mis habilidades y conocimientos gracias a iLearningHub.",
    },
  ];

  news = [
    {
      title: 'Clases de Zoom recauda $30 millones para satisfacer la alta demanda',
      subtitle: 'Series A liderada por Zoom, con la participación de inversores existentes',
      description: 'Class Technology, la empresa de software de educación en línea fundada por el ex CEO de Blackboard, Michael Chasen, ha recaudado $30 millones en una ronda de financiación de Serie A liderada por Zoom Video Communications.',
    },
    {
      title: "Zoom Inve",
      description: 'Zoom was never created to be a consumer product. Nonetheless, the...',
    },
    {
      title: 'Class adds $30 million to its balance sheet',
      description:
        'Class, launched less than a year ago by Blackboard co-founder Michael Chasen...',
    },
    {
      title: 'Former Blackboard CEO Raises $16M',
      description: 'This year, investors have reaped big financial returns from betting on Zoom...',
    },
  ];
}
