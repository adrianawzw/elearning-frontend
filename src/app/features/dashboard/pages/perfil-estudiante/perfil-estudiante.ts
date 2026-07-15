import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../usuarios/services/usuario';
import { AuthService } from '../../../auth/services/auth.service';
import { InscripcionService } from '../../../inscripciones/services/inscripcion';
import { ProgresoService } from '../../../progreso/services/progreso.service';
import { UsuarioPerfil } from '../../../../shared/interfaces/models.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil-estudiante',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, MatDividerModule, MatProgressSpinnerModule, MatSnackBarModule, FormsModule, DatePipe],
  templateUrl: './perfil-estudiante.html',
  styleUrl: './perfil-estudiante.scss',
})
export class PerfilEstudiante implements OnInit {
  private usuarioService = inject(UsuarioService);
  private authService = inject(AuthService);
  private inscripcionService = inject(InscripcionService);
  private progresoService = inject(ProgresoService);
  private snackBar = inject(MatSnackBar);

  editando = false;
  cargando = true;
  usuarioId: number | null = null;

  perfil: UsuarioPerfil = {
    id: 0,
    email: '',
    rol: '',
    fecha_registro: '',
    nombres: '',
    apellidos: '',
    codigo_alumno: ''
  };

  perfilEditado = { ...this.perfil };

  stats = [
    { icon: 'menu_book', value: '0', label: 'Cursos Activos', color: '#49BBBD' },
    { icon: 'check_circle', value: '0', label: 'Completados', color: '#4CAF50' },
  ];

  logros = [
    { icon: 'check_circle', label: 'Cursos completados', value: '0', color: '#4CAF50' },
    { icon: 'menu_book', label: 'Cursos en progreso', value: '0', color: '#49BBBD' },
    { icon: 'play_circle', label: 'Contenidos vistos', value: '0', color: '#F48C06' },
    { icon: 'library_books', label: 'Total inscritos', value: '0', color: '#2196F3' },
    { icon: 'emoji_events', label: 'Último completado', value: 'Ninguno aún', color: '#9C27B0' },
    { icon: 'category', label: 'Categorías exploradas', value: '0', color: '#FF5722' },
  ];

  subiendoFoto = false;

  get avatar() {
    if (this.perfil.foto_url) return this.perfil.foto_url;
    const nombre = `${this.perfil.nombres ?? ''} ${this.perfil.apellidos ?? ''}`.trim() || 'Usuario';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&size=120&background=49BBBD&color=fff&bold=true`;
  }

  ngOnInit() {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.usuarioService.obtenerMe().subscribe({
      next: (usuario) => {
        this.perfil = usuario;
        this.perfilEditado = { ...usuario };
        this.cargando = false;
        this.inscripcionService.obtenerPorEstudiante(usuario.id).subscribe(inscripciones => {
          const completados = inscripciones.filter(i => i.estado === 'FINALIZADO').length;
          const activos = inscripciones.filter(i => i.estado === 'ACTIVO').length;
          const ultimoCompletado = [...inscripciones].reverse().find(i => i.estado === 'FINALIZADO');
          const categorias = new Set(inscripciones.map(i => i.curso_categoria).filter(Boolean)).size;
          this.stats[0].value = String(activos);
          this.stats[1].value = String(completados);
          this.logros[0].value = String(completados);
          this.logros[1].value = String(activos);
          this.logros[3].value = String(inscripciones.length);
          this.logros[4].value = ultimoCompletado?.curso_titulo ?? 'Ninguno aún';
          this.logros[5].value = String(categorias);
        });
        this.progresoService.obtenerPorEstudiante(usuario.id).subscribe({
          next: (progresos) => { this.logros[2].value = String(progresos.length); },
          error: () => {}
        });
      },
      error: () => { this.cargando = false; }
    });
  }

  onFotoChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file || !this.perfil.id) return;
    this.subiendoFoto = true;
    this.usuarioService.uploadFoto(this.perfil.id, file).subscribe({
      next: (usuario) => {
        this.perfil.foto_url = usuario.foto_url;
        this.authService.updateCurrentUser({
          nombres: usuario.nombres,
          apellidos: usuario.apellidos,
          foto_url: usuario.foto_url
        });
        this.subiendoFoto = false;
        this.snackBar.open('Foto actualizada', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => { this.subiendoFoto = false; this.snackBar.open('Error al subir foto', 'Cerrar', { duration: 3000 }); }
    });
  }

  toggleEditar() {
    this.perfilEditado = { ...this.perfil };
    this.editando = !this.editando;
  }

  guardar() {
    const id = this.perfil.id;
    console.log('guardar perfil id:', id, 'body:', { nombres: this.perfilEditado.nombres, apellidos: this.perfilEditado.apellidos });
    if (!id) { this.snackBar.open('Error: ID de usuario no disponible', 'Cerrar', { duration: 3000 }); return; }
    if (!this.perfilEditado.nombres?.trim() || !this.perfilEditado.apellidos?.trim()) {
      this.snackBar.open('Nombres y apellidos son obligatorios', 'Cerrar', { duration: 3000 }); return;
    }
    this.usuarioService.actualizar(id, {
      nombres: this.perfilEditado.nombres.trim(),
      apellidos: this.perfilEditado.apellidos.trim()
    }).subscribe({
      next: (actualizado) => {
        this.perfil = actualizado;
        this.editando = false;
        this.authService.updateCurrentUser({ nombres: actualizado.nombres, apellidos: actualizado.apellidos });
        this.snackBar.open('Perfil actualizado', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        this.snackBar.open('Error al actualizar perfil', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
