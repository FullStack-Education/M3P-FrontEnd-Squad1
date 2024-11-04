import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroDocenteComponent } from './pages/cadastro-docente/cadastro-docente.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { CadastroTurmaComponent } from './pages/cadastro-turma/cadastro-turma.component';
import { CadastroAvaliacaoComponent } from './pages/cadastro-avaliacao/cadastro-avaliacao.component';
import { ListagemDocentesComponent } from './pages/listagem-docentes/listagem-docentes.component';
import { ListagemNotasComponent } from './pages/listagem-notas/listagem-notas.component';
import { NgModule } from '@angular/core';
import { docentesGuardGuard } from './shared/guards/docentes-guard.guard';
import { cadastroAvaGuard } from './shared/guards/cadastro-ava.guard';
import { cadastroTurmaGuard } from './shared/guards/cadastro-turma.guard';
import { cadastroAlunoGuard } from './shared/guards/cadastro-aluno.guard';
import { cadastroDocenteGuard } from './shared/guards/cadastro-docente.guard';
import { notasGuard } from './shared/guards/notas.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: { title: 'Início'} },
  { path: 'cadastro-docente', component: CadastroDocenteComponent, canActivate: [cadastroDocenteGuard], data: { title: 'Cadastro de Docente'} },
  { path: 'cadastro-aluno', component: CadastroAlunoComponent, canActivate: [cadastroAlunoGuard], data: { title: 'Cadastro de Aluno'} },
  { path: 'cadastro-turma', component: CadastroTurmaComponent, canActivate: [cadastroTurmaGuard], data: { title: 'Cadastro de Turma'} },
  { path: 'cadastro-avaliacao', component: CadastroAvaliacaoComponent, canActivate: [cadastroAvaGuard], data: { title: 'Cadastro de Avaliação'} },
  { path: 'listagem-docentes', component: ListagemDocentesComponent, canActivate: [docentesGuardGuard], data: { title: 'Listagem de Docentes'} },
  { path: 'listagem-notas', component: ListagemNotasComponent, canActivate: [notasGuard], data: { title: 'Listagem de Notas'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }