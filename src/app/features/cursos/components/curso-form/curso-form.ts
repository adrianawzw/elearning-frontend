import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CursoService } from '../../services/curso.service';
import { AuthService } from '../../../../features/auth/services/auth.service';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatSnackBarModule],
  templateUrl: './curso-form.html',
  styleUrl: './curso-form.scss',
})
export class CursoForm implements OnInit {
  private fb = inject(FormBuilder);
  private cursoService = inject(CursoService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  cursoId: number | null = null;
  guardando = false;
  subiendoImagen = false;
  imagenPreview: string | null = null;

  cursoForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    nivel: [''],
    duracion: [''],
    categoria: [''],
    imagen_url: [''],
  });

  ngOnInit() {
    this.cursoId = Number(this.route.snapshot.queryParamMap.get('id')) || null;
    if (this.cursoId) {
      this.cursoService.obtenerTodos().subscribe(cursos => {
        const curso = cursos.find(c => c.id === this.cursoId);
        if (curso) {
          this.cursoForm.patchValue(curso as any);
          if (curso.imagen_url) this.imagenPreview = curso.imagen_url;
        }
      });
    }
  }

  onImagenChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.subiendoImagen = true;
    this.cursoService.uploadImagen(file).subscribe({
      next: (url) => {
        this.cursoForm.patchValue({ imagen_url: url });
        this.imagenPreview = url;
        this.subiendoImagen = false;
      },
      error: () => { this.subiendoImagen = false; }
    });
  }

  guardarCurso() {
    if (this.cursoForm.invalid) { this.cursoForm.markAllAsTouched(); return; }
    this.guardando = true;
    const docenteId = this.authService.getUserId();
    const body = { ...this.cursoForm.value, id_docente: docenteId };

    const request$ = this.cursoId
      ? this.cursoService.editar(this.cursoId, body)
      : this.cursoService.crear(body);

    request$.subscribe({
      next: () => {
        this.snackBar.open(this.cursoId ? 'Curso actualizado' : 'Curso creado', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
        this.router.navigate(['/dashboard/gestionar-cursos']);
      },
      error: (err) => {
        console.error('Error al guardar curso:', err);
        this.snackBar.open('Error al guardar el curso', 'Cerrar', { duration: 3000 });
        this.guardando = false;
      }
    });
  }

  get titulo() { return this.cursoForm.get('titulo'); }
  get descripcion() { return this.cursoForm.get('descripcion'); }
  get nivel() { return this.cursoForm.get('nivel'); }
  get duracion() { return this.cursoForm.get('duracion'); }
  get categoria() { return this.cursoForm.get('categoria'); }

  cancelar() { this.router.navigate(['/dashboard/gestionar-cursos']); }
}
