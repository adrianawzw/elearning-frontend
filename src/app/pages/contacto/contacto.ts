import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Footer } from '../../shared/components/footer/footer';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contacto',
  imports: [
    ReactiveFormsModule, Navbar, Footer,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule,
  ],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(20)]],
  });

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.snackBar.open('✅ ¡Mensaje enviado! Te contactaremos pronto.', 'Cerrar', { duration: 4000 });
    this.form.reset();
  }
}
