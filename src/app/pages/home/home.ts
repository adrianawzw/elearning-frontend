import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class Home implements OnInit, OnDestroy {

  slides = [
    { img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=600&fit=crop', alt: 'Estudiantes colaborando' },
    { img: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=700&h=600&fit=crop', alt: 'Estudiante con laptop' },
    { img: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=700&h=600&fit=crop', alt: 'Clase en línea' },
    { img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&h=600&fit=crop', alt: 'Aprendizaje digital' },
  ];

  currentSlide = 0;
  private interval: any;

  ngOnInit() {
    this.interval = setInterval(() => this.next(), 4000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  next() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goTo(index: number) {
    this.currentSlide = index;
  }
  stats = [
    { number: '15K+', label: 'Estudiantes' },
    { number: '75%', label: 'Éxito total' },
    { number: '35', label: 'Preguntas frecuentes' },
    { number: '26', label: 'Expertos destacados' },
    { number: '16', label: 'Años de experiencia' },
  ];

  features = [
    {
      icon: 'assignment',
      title: 'Inscripción y Gestión de Estudiantes en Línea',
      description: 'Permite a los estudiantes inscribirse en cursos de manera sencilla y segura.',
    },
    {
      icon: 'calendar_month',
      title: 'Programación y Seguimiento de Progresos',
      description: 'Facilita la organización y el seguimiento del progreso de cursos.',
    },
    {
      icon: 'groups',
      title: 'Seguimiento de Clientes',
      description: 'Automatiza y rastrea correos electrónicos a individuos o grupos. El sistema integrado ayuda a organizar.',
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
      img: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=400&fit=crop',
    },
    {
      title: 'El futuro del aprendizaje en línea',
      description: 'Las plataformas de e-learning están transformando la educación global con nuevas tecnologías.',
      img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=300&h=160&fit=crop',
    },
    {
      title: 'Nuevas herramientas para docentes digitales',
      description: 'Descubre cómo los educadores están adoptando nuevas metodologías interactivas.',
      img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&h=160&fit=crop',
    },
    {
      title: 'Certificaciones que impulsan tu carrera',
      description: 'Los empleadores valoran cada vez más las certificaciones de plataformas reconocidas.',
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=160&fit=crop',
    },
  ];
}
