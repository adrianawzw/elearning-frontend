import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluacionService } from '../../services/evaluacion.service';

@Component({
  selector: 'app-gestionar-preguntas',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatIconModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './gestionar-preguntas.html',
  styleUrl: './gestionar-preguntas.scss',
})
export class GestionarPreguntas implements OnInit {
  private evaluacionService = inject(EvaluacionService);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);

  preguntas: any[] = [];
  cargando = true;
  guardando = false;
  mostrarForm = false;
  evaluacionId: number | null = null;

  preguntaForm = this.fb.group({
    enunciado: ['', Validators.required],
    opcion_a: ['', Validators.required],
    opcion_b: ['', Validators.required],
    opcion_c: ['', Validators.required],
    opcion_d: ['', Validators.required],
    respuesta_correcta: ['', Validators.required],
    valor_punto: [1, [Validators.required, Validators.min(1)]],
  });

  ngOnInit() {
    this.evaluacionId = Number(this.route.snapshot.queryParamMap.get('evaluacionId')) || null;
    console.log('evaluacionId desde params:', this.evaluacionId, 'raw:', this.route.snapshot.queryParams);
    if (this.evaluacionId) this.cargarPreguntas();
    else { console.warn('evaluacionId es null — no se cargan preguntas'); this.cargando = false; }
  }

  cargarPreguntas() {
    this.evaluacionService.obtenerPreguntas(this.evaluacionId!).subscribe({
      next: (data) => {
        console.log('preguntas response:', data);
        console.log('es array:', Array.isArray(data));
        console.log('tipo:', typeof data);
        this.preguntas = Array.isArray(data) ? data : [data];
        this.cargando = false;
      },
      error: (err) => { console.error('error preguntas:', err); this.cargando = false; }
    });
  }

  guardarPregunta() {
    if (this.preguntaForm.invalid) { this.preguntaForm.markAllAsTouched(); return; }
    this.guardando = true;
    const v = this.preguntaForm.value;
    const opciones = `A) ${v.opcion_a}|B) ${v.opcion_b}|C) ${v.opcion_c}|D) ${v.opcion_d}`;
    const body = {
      enunciado: v.enunciado,
      opciones,
      respuestaCorrecta: v.respuesta_correcta,
      valorPunto: Number(v.valor_punto),
      evaluacion: { id: this.evaluacionId }
    };
    console.log('body pregunta:', body);

    this.evaluacionService.crearPregunta(body).subscribe({
      next: (nueva) => {
        this.preguntaForm.reset({ valor_punto: 1 });
        this.mostrarForm = false;
        this.guardando = false;
        this.cargarPreguntas();
        this.snackBar.open('Pregunta agregada', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => { this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000 }); this.guardando = false; }
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta pregunta?')) return;
    this.evaluacionService.eliminarPregunta(id).subscribe({
      next: () => {
        this.preguntas = this.preguntas.filter(p => p.id !== id);
        this.snackBar.open('Pregunta eliminada', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 })
    });
  }

  getOpciones(): string[] {
    const v = this.preguntaForm.value;
    return [`A) ${v.opcion_a}`, `B) ${v.opcion_b}`, `C) ${v.opcion_c}`, `D) ${v.opcion_d}`]
      .filter(o => !o.endsWith('undefined') && !o.endsWith('null') && !o.endsWith(') ') && o.trim().length > 3);
  }

  parseOpciones(opciones: string): string[] {
    return opciones?.split('|') ?? [];
  }
}
