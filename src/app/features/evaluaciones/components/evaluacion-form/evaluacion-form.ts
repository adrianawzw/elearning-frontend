import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { EvaluacionService } from '../../services/evaluacion.service';
import { CursoService } from '../../../cursos/services/curso.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Curso } from '../../../../shared/interfaces/models.interface';

@Component({
  selector: 'app-evaluacion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatSnackBarModule],
  templateUrl: './evaluacion-form.html',
  styleUrl: './evaluacion-form.scss',
})
export class EvaluacionForm implements OnInit {
  private fb = inject(FormBuilder);
  private evaluacionService = inject(EvaluacionService);
  private cursoService = inject(CursoService);
  private authService = inject(AuthService);
  readonly router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  evaluacionId: number | null = null;
  cursoId: number | null = null;
  cursos: Curso[] = [];
  guardando = false;

  evalForm = this.fb.group({
    curso_id: [null as number | null, Validators.required],
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    tipo: ['', Validators.required],
    descripcion: ['', Validators.required],
    puntaje_minimo: [60, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  ngOnInit() {
    this.evaluacionId = Number(this.route.snapshot.queryParamMap.get('id')) || null;
    this.cursoId = Number(this.route.snapshot.queryParamMap.get('cursoId')) || null;

    const docenteId = this.authService.getUserId();
    if (docenteId) {
      this.cursoService.obtenerPorDocente(docenteId).subscribe(cursos => {
        this.cursos = cursos;
        if (this.cursoId) this.evalForm.patchValue({ curso_id: this.cursoId });
      });
    }

    if (this.evaluacionId) {
      this.evaluacionService.obtenerPorId(this.evaluacionId).subscribe(ev => {
        this.evalForm.patchValue({
          curso_id: ev.cursoId ?? ev.curso_id,
          titulo: ev.titulo,
          tipo: ev.tipo,
          descripcion: ev.descripcion,
          puntaje_minimo: ev.puntajeMinimo ?? ev.puntaje_minimo,
        });
      });
    }
  }

  guardar() {
    if (this.evalForm.invalid) { this.evalForm.markAllAsTouched(); return; }
    this.guardando = true;
    const v = this.evalForm.value;
    const body = {
      titulo: v.titulo,
      tipo: v.tipo,
      descripcion: v.descripcion,
      puntaje_minimo: Number(v.puntaje_minimo),
      curso_id: v.curso_id,
    };
    console.log('body evaluacion:', body);

    const request$ = this.evaluacionId
      ? this.evaluacionService.editar(this.evaluacionId, body)
      : this.evaluacionService.crear(body);

    request$.subscribe({
      next: () => {
        this.snackBar.open(this.evaluacionId ? 'Evaluación actualizada' : 'Evaluación creada', 'Cerrar', { duration: 3000, horizontalPosition: 'end', verticalPosition: 'top' });
        this.router.navigate(['/dashboard/gestionar-evaluaciones'], { queryParams: { cursoId: v.curso_id } });
      },
      error: () => { this.snackBar.open('Error al guardar', 'Cerrar', { duration: 3000 }); this.guardando = false; }
    });
  }
}
