import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './curso-form.html',
  styleUrl: './curso-form.scss',
})
export class CursoForm {
  private fb = inject(FormBuilder);

  cursoForm = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    nivel: ['', Validators.required],
    duracion: ['', [Validators.required, Validators.min(1)]],
    docente: ['', Validators.required],
  });

  guardarCurso() {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      return;
    }

    console.log('Curso registrado:', this.cursoForm.value);

    alert('Curso registrado correctamente');

    this.cursoForm.reset();
  }

  get titulo() {
    return this.cursoForm.get('titulo');
  }

  get descripcion() {
    return this.cursoForm.get('descripcion');
  }

  get nivel() {
    return this.cursoForm.get('nivel');
  }

  get duracion() {
    return this.cursoForm.get('duracion');
  }

  get docente() {
    return this.cursoForm.get('docente');
  }
}
