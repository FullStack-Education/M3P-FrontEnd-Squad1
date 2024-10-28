import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente.service';
import { AlunoService } from '../services/aluno.service';

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
    private docenteService: DocenteService
  ) {

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.role == 'DOCENTE') {
      this.docentes = this.docenteService.getDocenteLogado(currentUser.name);
    } else {
      this.docentes = this.docenteService.getMock();
    }

  }
  
  turmas = ['Turma A', 'Turma B', 'Turma C', 'Turma D'];
  materias = ['Matemática', 'Física', 'Química', 'História'];

  alunos = this.alunoService.getMock();
  docentes: any[] = [];

  ngOnInit(): void {
    this.initForm();    
  }

  initForm(): void {
    this.avaliacaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      dataInicio: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      dataTermino: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      horario: [formatDate(new Date(), 'HH:mm', 'en-US'), [Validators.required]],
      docente: ['', [Validators.required]],
      materia: ['', [Validators.required]],
      turma: ['', [Validators.required]],
      aluno: ['', [Validators.required]],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }


  onSubmit(): void {
    if (this.avaliacaoForm.valid) {
      const newAvaliacao = { ...this.avaliacaoForm.value, id: this.generateUniqueId() };

      const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes') || '[]');
      avaliacoes.push(newAvaliacao);
      localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

      alert('Avaliação cadastrada com sucesso!');
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
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



  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
