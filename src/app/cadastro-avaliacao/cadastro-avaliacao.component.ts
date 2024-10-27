import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente.service';

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
  docentes: string[] = [];
  turmas: string[] = [];
  materias = ['Matemática', 'Física', 'Química', 'História'];
  alunos = ['Pedro Torres'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDocentes();
    this.loadTurmas();
    this.loadAlunos();
    this.initForm();
  }

  initForm(): void {
    this.avaliacaoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(64)]],
      dataInicio: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required],
      dataTermino: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required],
      horario: [formatDate(new Date(), 'HH:mm', 'en-US'), Validators.required],
      docente: ['', Validators.required],
      materia: ['', Validators.required],
      turma: ['', Validators.required],
      aluno: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }

  loadDocentes(): void {
    const storedDocentes = localStorage.getItem('docentes');
    if (storedDocentes) {
      const docentesArray = JSON.parse(storedDocentes);
      this.docentes = docentesArray.map((docente: any) => docente.nome);
    } else {
      alert('Nenhum docente encontrado.');
    }
  }

  loadTurmas(): void {
    const storedTurmas = localStorage.getItem('turmas');
    if (storedTurmas) {
      const turmasArray = JSON.parse(storedTurmas);
      this.turmas = turmasArray.map((turma: any) => turma.nome);
    } else {
      alert('Nenhuma turma encontrada.');
    }
  }

  loadAlunos(): void {
    const storedAlunos = localStorage.getItem('alunos');
    
    let alunosArray: string[] = [];
  
    if (storedAlunos) {
      alunosArray = JSON.parse(storedAlunos).map((aluno: any) => aluno.nome);
    } else {
      alert('Nenhum aluno encontrado no localStorage.');
    }
  
    this.alunos = [...new Set([...this.alunos, ...alunosArray])];
  
    if (this.alunos.length === 0) {
      alert('Nenhum aluno encontrado.');
    }
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
