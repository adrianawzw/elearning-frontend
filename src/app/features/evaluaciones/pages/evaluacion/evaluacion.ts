import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, FormsModule, ReactiveFormsModule],
  templateUrl: './evaluacion.html',
  styleUrl: './evaluacion.scss',
})
export class Evaluacion {
  private route = inject(ActivatedRoute);

  get modo(): 'resolver' | 'crear' {
    return this.route.snapshot.url[0]?.path === 'evaluacion' ? 'resolver' : 'crear';
  }

  // --- CREAR EVALUACIÓN (docente) ---
  fb = new FormBuilder();
  evalForm: FormGroup = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', Validators.required],
    cursoId: ['', Validators.required],
    duracion: ['', [Validators.required, Validators.min(1)]],
  });

  guardarEvaluacion() {
    if (this.evalForm.invalid) { this.evalForm.markAllAsTouched(); return; }
    alert('Evaluación creada correctamente');
    this.evalForm.reset();
  }

  // --- RESOLVER EVALUACIÓN (estudiante) ---
  preguntaActual = 0;
  respuestas: (number | null)[] = [null, null, null, null, null];
  enviado = false;
  puntaje = 0;

  preguntas = [
    { texto: '¿Qué es Angular?', opciones: ['Un framework de JavaScript', 'Un lenguaje de programación', 'Una base de datos', 'Un servidor web'], correcta: 0 },
    { texto: '¿Qué comando inicia un proyecto Angular?', opciones: ['ng start', 'ng serve', 'ng run', 'ng init'], correcta: 1 },
    { texto: '¿Qué es un componente en Angular?', opciones: ['Una función', 'Una clase con decorador @Component', 'Un módulo CSS', 'Un archivo JSON'], correcta: 1 },
    { texto: '¿Qué es el data binding?', opciones: ['Conexión entre vista y modelo', 'Un tipo de base de datos', 'Un método HTTP', 'Un archivo de configuración'], correcta: 0 },
    { texto: '¿Qué es un servicio en Angular?', opciones: ['Un componente visual', 'Una clase para lógica compartida', 'Un archivo de estilos', 'Una directiva'], correcta: 1 },
  ];

  seleccionar(idx: number) {
    if (!this.enviado) this.respuestas[this.preguntaActual] = idx;
  }

  siguiente() { if (this.preguntaActual < this.preguntas.length - 1) this.preguntaActual++; }
  anterior() { if (this.preguntaActual > 0) this.preguntaActual--; }

  enviar() {
    this.puntaje = this.preguntas.filter((p, i) => this.respuestas[i] === p.correcta).length;
    this.enviado = true;
  }

  get porcentaje() { return Math.round((this.puntaje / this.preguntas.length) * 100); }
  get aprobado() { return this.porcentaje >= 60; }
}
