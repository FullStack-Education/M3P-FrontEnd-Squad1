import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroDocenteComponent } from './cadastro-docente/cadastro-docente.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import { CadastroAvaliacaoComponent } from './cadastro-avaliacao/cadastro-avaliacao.component';
import { ListagemDocentesComponent } from './listagem-docentes/listagem-docentes.component';
import { ListagemNotasComponent } from './listagem-notas/listagem-notas.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cadastro-docente', component: CadastroDocenteComponent},
  { path: 'cadastro-aluno', component: CadastroAlunoComponent },
  { path: 'cadastro-turma', component: CadastroTurmaComponent },
  { path: 'cadastro-avaliacao', component: CadastroAvaliacaoComponent},
  { path: 'listagem-docentes', component: ListagemDocentesComponent},
  { path: 'listagem-notas', component: ListagemNotasComponent}
];
