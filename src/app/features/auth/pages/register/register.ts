import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

function passwordMatch(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  showPassword = false;
  showConfirm = false;
  submitted = false;

  form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    confirmPassword: ['', Validators.required],
  }, { validators: passwordMatch });

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    this.authService.register({
      email: this.form.value.email,
      password: this.form.value.password,
      nombres: this.form.value.nombre,
      apellidos: this.form.value.apellido,
      rol: 'ESTUDIANTE'
    }).subscribe({
      next: () => {
        alert('¡Registro exitoso! Ahora puedes iniciar sesión');
      },
      error: (err) => {
        alert(err.message || 'Error al registrarse');
      }
    });
  }
}