import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contacto } from './pages/contacto/contacto';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { ListaCursos } from './features/cursos/pages/lista-cursos/lista-cursos';
import { DetalleCurso } from './features/cursos/pages/detalle-curso/detalle-curso';
import { MisCursos } from './features/inscripciones/pages/mis-cursos/mis-cursos';
import { Perfil } from './features/usuarios/pages/perfil/perfil';
import { Resultados } from './features/evaluaciones/pages/resultados/resultados';
import { NotFound } from './pages/not-found/not-found';
import { Evaluacion } from './features/evaluaciones/pages/evaluacion/evaluacion';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'nosotros', component: Nosotros },

  { path: 'contacto', component: Contacto },

  { path: 'auth/login', component: Login },

  { path: 'auth/register', component: Register },

  { path: 'dashboard', component: Dashboard },

  { path: 'cursos', component: ListaCursos },

  { path: 'cursos/:id', component: DetalleCurso },

  { path: 'mis-cursos', component: MisCursos },

  { path: 'perfil', component: Perfil },

  { path: 'evaluacion', component: Evaluacion },

  { path: 'resultados', component: Resultados },

  { path: '**', component: NotFound },
];
