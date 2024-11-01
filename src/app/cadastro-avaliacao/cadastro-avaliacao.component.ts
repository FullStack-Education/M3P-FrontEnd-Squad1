import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente.service';
import { AlunoService } from '../services/aluno.service';
import { AvaliacaoService } from '../services/avaliacao.service';

@Component({
  selector: 'app-cadastro-avaliacao',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DocenteService],
  templateUrl: './cadastro-avaliacao.component.html',
  styleUrls: ['./cadastro-avaliacao.component.css']
})
export class CadastroAvaliacaoComponent implements OnInit {

  avaliacaoForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alunoService: AlunoService,
    private docenteService: DocenteService,
    private avaliacaoService: AvaliacaoService
  ) {  }
  
  alunos: any[] = [];
  docentes: any[] = [];
  turmas: any[] =[];
  materias: any[] =[];


  ngOnInit(): void {
    this.initForm();
    
    this.buscarAlunos();
    this.buscaTurmas();
    this.buscaDocentes();
    this.buscaMaterias();
  }

  buscarAlunos() {
    return this.alunoService.getAlunos().subscribe(response => {
      this.alunos = response;
    });
  }

  buscaTurmas() {
    return this.alunoService.getTurmas().subscribe(response => {
      this.turmas = response;
    });
  }

  buscaDocentes() {
    return this.docenteService.getDocentes().subscribe(response => {
      this.docentes = response;
    });
  }

  buscaMaterias() {
    return this.alunoService.getMaterias().subscribe(response => {
      this.materias = response;
    });
  }

  initForm(): void {
    this.avaliacaoForm = this.fb.group({
      nomeAvaliacao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      dataNota: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      dataTermino: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      horario: [formatDate(new Date(), 'HH:mm', 'en-US'), [Validators.required]],
      docente_id: ['', [Validators.required]],
      materia_id: ['', [Validators.required]],
      turma_id: ['', [Validators.required]],
      aluno_id: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }


  onSubmit(): void {
    if (this.avaliacaoForm.valid) {
      const newAvaliacao = { ...this.avaliacaoForm.value };
      this.cadastrarAvaliacao(newAvaliacao);
      // this.router.navigate(['/home']);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  cadastrarAvaliacao(avaliacao: any) {
    return this.avaliacaoService.cadastroAvaliacao(avaliacao).subscribe( response => {
      console.log(response)

      //alert('Cadastro realizado com sucesso!');
    });
  }

  onEdit(): void {
    alert('Editar funcionalidade não implementada.');
  }

  onDelete(): void {
    alert('Deletar funcionalidade não implementada.');
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
