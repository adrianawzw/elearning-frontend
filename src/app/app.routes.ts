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
import { CursoForm } from './features/cursos/components/curso-form/curso-form';
import { ContenidoForm } from './features/contenidos/components/contenido-form/contenido-form';
import { DashboardDocente } from './features/dashboard/components/dashboard-docente/dashboard-docente';
import { DashboardEstudiante } from './features/dashboard/components/dashboard-estudiante/dashboard-estudiante';
import { Catalogo } from './features/dashboard/pages/catalogo/catalogo';
import { MisCursosEstudiante } from './features/dashboard/pages/mis-cursos-estudiante/mis-cursos-estudiante';
import { PerfilEstudiante } from './features/dashboard/pages/perfil-estudiante/perfil-estudiante';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'nosotros', component: Nosotros },

  { path: 'contacto', component: Contacto },

  { path: 'auth/login', component: Login },

  { path: 'auth/register', component: Register },

  { path: 'dashboard', component: Dashboard, 
    children: [
      { path: '', component: DashboardDocente },
      { path: 'catalogo', component: Catalogo },
      { path: 'mis-cursos', component: MisCursosEstudiante },
      { path: 'perfil', component: PerfilEstudiante },
      { path: 'crear-curso', component: CursoForm },
    ]
  },

  { path: 'cursos', component: ListaCursos },

  { path: 'cursos/:id', component: DetalleCurso },

  { path: 'mis-cursos', component: MisCursos },

  { path: 'perfil', component: Perfil },

  { path: 'evaluacion', component: Evaluacion },

  { path: 'resultados', component: Resultados },

  { path: '**', component: NotFound },
];
