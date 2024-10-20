import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TurmaService } from '../services/turma.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente.service';

@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [TurmaService, DocenteService],
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.scss']
})
export class CadastroTurmaComponent implements OnInit {
  turmaForm!: FormGroup;
  docentes: string[] = [];
  materias = ['Matemática', 'Física', 'Química', 'História'];
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDocentes();
    this.initForm();
  }

  loadDocentes(): void {
    const storedDocentes = localStorage.getItem('docentes');
    if (storedDocentes) {
      const docentesArray = JSON.parse(storedDocentes);
      this.docentes = docentesArray.map((docente: { nome: any; }) => docente.nome);
    } else {
      alert('Nenhum docente encontrado.');
    }
  }

  loadMaterias(): void {
    const storedMaterias = localStorage.getItem('materias');
    if (storedMaterias) {
      this.materias = JSON.parse(storedMaterias);
    } else {
      alert('Nenhuma matéria encontrada.');
    }
  }

  initForm(): void {
    this.turmaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      dataInicio: ['', Validators.required],
      dataTermino: ['', Validators.required],
      horario: ['', Validators.required],
      docente: ['', Validators.required],
      materia: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.turmaForm.valid) {
      const turma = this.turmaForm.value;
      const turmaToSave = {
        ...turma, id: this.generateUniqueId()
      };

      const turmas = JSON.parse(localStorage.getItem('turmas') || '[]');
      turmas.push(turmaToSave);
      localStorage.setItem('turmas', JSON.stringify(turmas));

      alert('Cadastro realizado com sucesso!');
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
