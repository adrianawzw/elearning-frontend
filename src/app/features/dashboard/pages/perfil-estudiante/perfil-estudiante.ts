import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-estudiante',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatDividerModule, FormsModule],
  templateUrl: './perfil-estudiante.html',
  styleUrl: './perfil-estudiante.scss',
})
export class PerfilEstudiante {
  editando = false;

  perfil = {
    nombre: 'María García',
    email: 'maria.garcia@email.com',
    telefono: '+51 987 654 321',
    ubicacion: 'Lima, Perú',
    bio: 'Estudiante apasionada por la tecnología y el diseño. Siempre buscando aprender algo nuevo.',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&size=120&background=49BBBD&color=fff&bold=true',
    miembro: 'Enero 2024',
  };

  stats = [
    { icon: 'menu_book', value: '8', label: 'Cursos Activos', color: '#49BBBD' },
    { icon: 'check_circle', value: '5', label: 'Completados', color: '#4CAF50' },
    { icon: 'workspace_premium', value: '4', label: 'Certificados', color: '#9C27B0' },
    { icon: 'local_fire_department', value: '12', label: 'Días seguidos', color: '#F48C06' },
  ];

  logros = [
    { icon: 'emoji_events', label: 'Primer Curso', desc: 'Completaste tu primer curso', color: '#F48C06', obtenido: true },
    { icon: 'workspace_premium', label: 'Certificado Pro', desc: 'Obtuviste 3 certificados', color: '#9C27B0', obtenido: true },
    { icon: 'local_fire_department', label: 'En Racha', desc: '7 días seguidos estudiando', color: '#F44336', obtenido: true },
    { icon: 'star', label: 'Estudiante Destacado', desc: 'Top 10% de la plataforma', color: '#F48C06', obtenido: false },
    { icon: 'school', label: 'Maestro del Saber', desc: 'Completa 10 cursos', color: '#49BBBD', obtenido: false },
  ];

  habilidades = [
    { nombre: 'Angular', nivel: 75 },
    { nombre: 'Python', nivel: 60 },
    { nombre: 'UI/UX Design', nivel: 85 },
    { nombre: 'SQL', nivel: 50 },
  ];

  toggleEditar() { this.editando = !this.editando; }
  guardar() { this.editando = false; }
}
