import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-contenido-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './contenido-form.html',
  styleUrl: './contenido-form.scss',
})
export class ContenidoForm {

  private fb = inject(FormBuilder);

  contenidoForm = this.fb.group({

    titulo: [
      '',
      [
        Validators.required,
        Validators.minLength(5)
      ]
    ],

    urlMaterial: [
      '',
      [
        Validators.required,
        Validators.pattern('https?://.+')
      ]
    ],

    tipo: [
      '',
      Validators.required
    ],

    cursoId: [
      '',
      Validators.required
    ]

  });

  guardarContenido() {

    if (this.contenidoForm.invalid) {
      this.contenidoForm.markAllAsTouched();
      return;
    }

    console.log(
      'Contenido registrado:',
      this.contenidoForm.value
    );

    alert('Contenido registrado correctamente');

    this.contenidoForm.reset();
  }

  get titulo() {
    return this.contenidoForm.get('titulo');
  }

  get urlMaterial() {
    return this.contenidoForm.get('urlMaterial');
  }

  get tipo() {
    return this.contenidoForm.get('tipo');
  }

  get cursoId() {
    return this.contenidoForm.get('cursoId');
  }

}