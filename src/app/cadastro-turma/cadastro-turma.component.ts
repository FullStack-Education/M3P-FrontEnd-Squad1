import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente.service';
import { AlunoService } from '../services/aluno.service';

@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [DocenteService, AlunoService],
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {
  turmaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private docenteService: DocenteService,
    private alunoService: AlunoService
  ) {  }

  docentes: any[] = [];
  materias: any[] = [];
  cursos: any[] = []
  isEditing = false;
  
  ngOnInit(): void {
    this.initForm();

    this.buscaDocentes();
    this.buscaMaterias();
    this.buscaCursos();
  }

  buscaCursos() {
    return this.docenteService.getCursos().subscribe(response => {
      this.cursos = response;
    });
  }

  buscaDocentes() {
    return this.docenteService.getDocentes().subscribe(response => {
      let role = sessionStorage.getItem('role');
      let nome = sessionStorage.getItem('nome');
      
      if (role == 'PROFESSOR') {
        for (let docente of response) {
          if (docente.nome == nome) {
            this.docentes.push(docente);
            break;
          }
        }
      } else { this.docentes = response; }

    });
  }

  buscaMaterias() {
    return this.alunoService.getMaterias().subscribe(response => {
      this.materias = response;
    });
  }

  initForm(): void {
    this.turmaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      dataInicio: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      dataTermino: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      horario: [formatDate(new Date(), 'HH:mm', 'en-US'), [Validators.required]],
      docente_id: ['', Validators.required],
      materia_id: ['', Validators.required],
      curso_id: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.turmaForm.valid) {
      const turma = this.turmaForm.value;
      const turmaToSave = { ...turma };

      this.cadastrarTurma(turmaToSave)

      this.router.navigate(['/home']);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  cadastrarTurma(turma: any) {
    return this.docenteService.cadastrarTurma(turma).subscribe( () => {
      alert('Cadastro realizado com sucesso!');
      // this.materias = response;
    });
  }

  onEdit(): void {
    alert('Editar funcionalidade não implementada.');
  }

  onDelete(): void {
    alert('Deletar funcionalidade não implementada.');
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
