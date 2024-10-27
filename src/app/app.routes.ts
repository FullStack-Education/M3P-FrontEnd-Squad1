import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroDocenteComponent } from './cadastro-docente/cadastro-docente.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { CadastroTurmaComponent } from './cadastro-turma/cadastro-turma.component';
import { CadastroAvaliacaoComponent } from './cadastro-avaliacao/cadastro-avaliacao.component';
import { ListagemDocentesComponent } from './listagem-docentes/listagem-docentes.component';
import { ListagemNotasComponent } from './listagem-notas/listagem-notas.component';
import { NgModule } from '@angular/core';
import { docentesGuardGuard } from './guards/docentes-guard.guard';
import { notasGuard } from './guards/notas.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, data: { title: 'Início'} },
  { path: 'cadastro-docente', component: CadastroDocenteComponent, data: { title: 'Cadastro de Docente'} },
  { path: 'cadastro-aluno', component: CadastroAlunoComponent, data: { title: 'Cadastro de Aluno'} },
  { path: 'cadastro-turma', component: CadastroTurmaComponent, data: { title: 'Cadastro de Turma'} },
  { path: 'cadastro-avaliacao', component: CadastroAvaliacaoComponent, data: { title: 'Cadastro de Avaliação'} },
  { path: 'listagem-docentes', component: ListagemDocentesComponent, canActivate: [docentesGuardGuard], data: { title: 'Listagem de Docentes'} },
  { path: 'listagem-notas', component: ListagemNotasComponent, canActivate: [notasGuard], data: { title: 'Listagem de Notas'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }