import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ContenidoService } from '../../services/contenido.service';
import { CursoService } from '../../../cursos/services/curso.service';
import { AuthService } from '../../../../features/auth/services/auth.service';
import { Curso } from '../../../../shared/interfaces/models.interface';

@Component({
  selector: 'app-contenido-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatSnackBarModule],
  templateUrl: './contenido-form.html',
  styleUrl: './contenido-form.scss',
})
export class ContenidoForm implements OnInit {
  private fb = inject(FormBuilder);
  private contenidoService = inject(ContenidoService);
  private cursoService = inject(CursoService);
  private authService = inject(AuthService);
  readonly router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  contenidoId: number | null = null;
  cursoIdParam: number | null = null;
  cursos: Curso[] = [];
  guardando = false;
  archivoSeleccionado: File | null = null;
  urlSubida: string | null = null;
  subiendoArchivo = false;

  contenidoForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    url_material: [''],
    tipo: ['', Validators.required],
    duracion: [''],
    curso_id: ['', Validators.required],
  });

  get tipoActual() { return this.contenidoForm.get('tipo')?.value; }
  get esArchivo() { return this.tipoActual === 'PDF' || this.tipoActual === 'WORD'; }
  get esUrl() { return this.tipoActual === 'VIDEO' || this.tipoActual === 'LINK'; }

  ngOnInit() {
    this.contenidoId = Number(this.route.snapshot.queryParamMap.get('id')) || null;
    this.cursoIdParam = Number(this.route.snapshot.queryParamMap.get('cursoId')) || null;

    const docenteId = this.authService.getUserId();
    if (docenteId) {
      this.cursoService.obtenerPorDocente(docenteId).subscribe(c => {
        this.cursos = c;
        if (this.contenidoId) {
          this.contenidoService.obtenerPorId(this.contenidoId).subscribe(contenido => {
            this.urlSubida = contenido.urlMaterial ?? null;
            this.contenidoForm.patchValue({
              titulo: contenido.titulo,
              tipo: contenido.tipo,
              url_material: contenido.urlMaterial,
              duracion: contenido.duracion,
              curso_id: String(contenido.cursoId),
            });
          });
        } else if (this.cursoIdParam) {
          this.contenidoForm.patchValue({ curso_id: String(this.cursoIdParam) });
        }
      });
    }
  }

  onArchivoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.archivoSeleccionado = file;
    this.urlSubida = null;

    if (file) {
      this.subiendoArchivo = true;
      this.contenidoService.uploadArchivo(file).subscribe({
        next: (url) => {
          this.urlSubida = url;
          this.contenidoForm.patchValue({ url_material: url });
          this.subiendoArchivo = false;
        },
        error: () => {
          this.snackBar.open('Error al subir el archivo', 'Cerrar', { duration: 3000 });
          this.subiendoArchivo = false;
        }
      });
    }
  }

  guardarContenido() {
    if (this.contenidoForm.invalid) { this.contenidoForm.markAllAsTouched(); return; }

    if (this.esArchivo && !this.urlSubida) {
      this.snackBar.open('Espera a que el archivo termine de subirse', 'Cerrar', { duration: 3000 });
      return;
    }

    const urlFinal = this.esArchivo ? this.urlSubida : this.contenidoForm.get('url_material')?.value;
    if (!urlFinal) {
      this.snackBar.open('Ingresa una URL o sube un archivo', 'Cerrar', { duration: 3000 });
      return;
    }

    this.guardando = true;
    const body = { ...this.contenidoForm.value, url_material: urlFinal };

    const request$ = this.contenidoId
      ? this.contenidoService.editar(this.contenidoId, body)
      : this.contenidoService.crear(body);

    request$.subscribe({
      next: () => {
        this.snackBar.open(this.contenidoId ? 'Contenido actualizado' : 'Contenido creado', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
        this.router.navigate(['/dashboard/gestionar-contenidos'], {
          queryParams: this.cursoIdParam ? { cursoId: this.cursoIdParam } : {}
        });
      },
      error: (err) => {
        console.error('Error al guardar contenido:', err);
        this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000 });
        this.guardando = false;
      }
    });
  }

  get titulo() { return this.contenidoForm.get('titulo'); }
  get tipo() { return this.contenidoForm.get('tipo'); }
  get curso_id() { return this.contenidoForm.get('curso_id'); }
  get url_material() { return this.contenidoForm.get('url_material'); }
}
