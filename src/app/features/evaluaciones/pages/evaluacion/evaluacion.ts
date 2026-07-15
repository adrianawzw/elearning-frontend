import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { EvaluacionService } from '../../services/evaluacion.service';
import { ResultadoEvaluacionService } from '../../services/resultado-evaluacion.service';
import { AuthService } from '../../../auth/services/auth.service';
import { InscripcionService } from '../../../inscripciones/services/inscripcion';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-evaluacion',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatRadioModule, MatProgressSpinnerModule, FormsModule],
  templateUrl: './evaluacion.html',
  styleUrl: './evaluacion.scss',
})
export class Evaluacion implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private evaluacionService = inject(EvaluacionService);
  private resultadoService = inject(ResultadoEvaluacionService);
  private authService = inject(AuthService);
  private inscripcionService = inject(InscripcionService);

  evaluacionId!: number;
  evaluacion: any = null;
  preguntas: any[] = [];
  cargando = true;
  inscripcionId: number | null = null;

  preguntaActual = 0;
  respuestas: (string | null)[] = [];
  aciertos = 0;
  enviado = false;
  puntaje = 0;

  ngOnInit() {
    this.evaluacionId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('evaluacionId:', this.evaluacionId);
    if (!this.evaluacionId) { this.cargando = false; return; }

    this.evaluacionService.obtenerPorId(this.evaluacionId).pipe(catchError(() => of(null))).subscribe(ev => {
      this.evaluacion = ev;
      const cursoId = ev?.cursoId ?? ev?.curso_id ?? ev?.curso?.id;
      const estudianteId = this.authService.getUserId();
      if (cursoId && estudianteId) {
        this.inscripcionService.obtenerPorEstudiante(estudianteId).pipe(catchError(() => of([]))).subscribe(ins => {
          this.inscripcionId = ins.find(i => i.curso_id === cursoId)?.id ?? null;
        });
      }
    });

    this.evaluacionService.obtenerPreguntas(this.evaluacionId).pipe(catchError(() => of([]))).subscribe(data => {
      const lista = Array.isArray(data) ? data : [data];
      this.preguntas = lista.map(p => ({ ...p, opcionesArray: p.opciones?.split('|') ?? [] }));
      this.respuestas = new Array(this.preguntas.length).fill(null);
      this.cargando = false;
    });
  }

  seleccionar(opcion: string) {
    if (!this.enviado) this.respuestas[this.preguntaActual] = opcion;
  }

  siguiente() { if (this.preguntaActual < this.preguntas.length - 1) this.preguntaActual++; }
  anterior() { if (this.preguntaActual > 0) this.preguntaActual--; }

  enviar() {
    if (!this.inscripcionId) {
      console.warn('inscripcionId no disponible, no se puede enviar');
      return;
    }
    this.resultadoService.responder({
      inscripcionId: this.inscripcionId,
      evaluacionId: this.evaluacionId,
      respuesta: JSON.stringify(this.respuestas)
    }).pipe(catchError(() => of(null))).subscribe(res => {
      this.aciertos = this.preguntas.filter((p, i) =>
        this.respuestas[i] === (p.respuestaCorrecta ?? p.respuesta_correcta)
      ).length;
      this.puntaje = res?.puntajeObtenido ?? res?.puntaje_obtenido ?? 0;
      this.enviado = true;
    });
  }

  get porcentaje() {
    return this.preguntas.length ? Math.round((this.aciertos / this.preguntas.length) * 100) : 0;
  }
  get aprobado() { return this.porcentaje >= 60; }

  volverDashboard() { this.router.navigate(['/dashboard/inicio']); }
}
