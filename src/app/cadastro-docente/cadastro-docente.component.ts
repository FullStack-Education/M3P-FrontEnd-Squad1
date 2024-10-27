import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViaCepService } from '../services/via-cep.service';
import { DocenteService } from '../services/docente.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-docente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ViaCepService, DocenteService],
  templateUrl: './cadastro-docente.component.html',
  styleUrls: ['./cadastro-docente.component.css']
})
export class CadastroDocenteComponent implements OnInit {
  docenteForm!: FormGroup;
  generos = ['Masculino', 'Feminino', 'Outro'];
  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'];
  materias = ['Matemática', 'Física', 'Química', 'História'];
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private router: Router,
    private docenteService: DocenteService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.docenteForm = this.fb.group({
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
      materias: [[], Validators.required]
    });
  }

  buscarEndereco(): void {
    const cep = this.docenteForm.get('enderecoCep')?.value;
    if (cep) {
      this.viaCepService.buscarEndereco(cep).subscribe(
        endereco => {
          this.docenteForm.patchValue({
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
    if (this.docenteForm.valid) {
      const docente = this.docenteForm.value;
      const docenteToSave = {
        ...docente, role: "DOCENTE", id: this.generateUniqueId()
      }
      docenteToSave.id = this.generateUniqueId();

      const docentes = JSON.parse(localStorage.getItem('docentes') || '[]');
      docentes.push(docenteToSave);
      localStorage.setItem('docentes', JSON.stringify(docentes));

      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/listagem-docentes']);
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
