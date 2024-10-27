import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViaCepService } from '../services/via-cep.service';
import { AlunoService } from '../services/aluno.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ViaCepService, AlunoService],
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {
  alunoForm!: FormGroup;
  generos = ['Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  turmas = ['Turma A', 'Turma B', 'Turma C'];
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private router: Router,
    private alunoService: AlunoService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.alunoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      genero: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: ['', [Validators.required, Validators.maxLength(20)]],
      estadoCivil: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4,5}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      naturalidade: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      enderecoCep: ['', [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cidade: [''],
      estado: [''],
      logradouro: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      pontoReferencia: [''],
      turmas: [[], Validators.required]
    });
  }

  buscarEndereco(): void {
    const cep = this.alunoForm.get('enderecoCep')?.value;
    if (cep) {
      this.viaCepService.buscarEndereco(cep).subscribe(
        endereco => {
          this.alunoForm.patchValue({
            cidade: endereco.localidade,
            estado: endereco.uf,
            logradouro: endereco.logradouro,
            bairro: endereco.bairro,
            complemento: endereco.complemento || '',
          });
        },
        error => {
          alert('Erro ao buscar endereço. Verifique o CEP.');
        }
      );
    }
  }

  onSubmit(): void {
    if (this.alunoForm.valid) {
      const aluno = this.alunoForm.value;
      const alunoToSave = {
        ...aluno, role: "ALUNO", id: this.generateUniqueId()
      }
      alunoToSave.id = this.generateUniqueId();

      const alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
      alunos.push(alunoToSave);
      localStorage.setItem('alunos', JSON.stringify(alunos));

      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/']);
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
