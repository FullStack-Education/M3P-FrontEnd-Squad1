import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TurmaService } from '../services/turma.service';
import { CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente.service';

@Component({
  selector: 'app-cadastro-turma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [TurmaService, DocenteService],
  templateUrl: './cadastro-turma.component.html',
  styleUrls: ['./cadastro-turma.component.css']
})
export class CadastroTurmaComponent implements OnInit {
  turmaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private docenteService: DocenteService
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser.role == 'DOCENTE') {
      this.docentes = this.docenteService.getDocenteLogado(currentUser.name);
    } else {
      this.docentes = this.docenteService.getMock();
    }
  }

  docentes: any[] = [];
  materias = ['Matemática', 'Física', 'Química', 'História'];
  isEditing = false;
  
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.turmaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      dataInicio: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      dataTermino: [formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), [Validators.required]],
      horario: [formatDate(new Date(), 'HH:mm', 'en-US'), [Validators.required]],
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
    this.router.navigate(['/home']);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
