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
  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'União estável', 'Divorciado(a)', 'Viúvo(a)'];
  materias = ['Matemática', 'Física', 'Química', 'História'];

  isEditing = false;
  eventualDocenteId: any;

  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private router: Router,
    private docenteService: DocenteService
  ) {
    let docenteRecebido = this.router.getCurrentNavigation()?.extras.state?.['docente'];

    if (docenteRecebido) {
      this.isEditing = true;

      this.eventualDocenteId = docenteRecebido.id;
      this.docente.nome = docenteRecebido.nome;
      this.docente.genero = docenteRecebido.genero;
      this.docente.nascimento = docenteRecebido.nascimento;
      this.docente.cpf = docenteRecebido.cpf;
      this.docente.rg = docenteRecebido.rg;
      this.docente.naturalidade = docenteRecebido.naturalidade;
      this.docente.estadoCivil = docenteRecebido.estadoCivil;
      this.docente.telefone = docenteRecebido.telefone;
      this.docente.email = docenteRecebido.email;
      //this.docente.endereco.cep = docenteRecebido.endereco.cep;
      this.docente.endereco.numero = docenteRecebido.numero;
      this.docente.endereco.complemento = docenteRecebido.complemento;
      this.docente.endereco.referencia = docenteRecebido.referencia;
      this.materias = docenteRecebido.materias;
    }
  }

  docente = {
    id: '',
    nome: '',
    genero: '',
    nascimento: '',
    cpf: '',
    rg: '',
    idade: '',
    expeditor: '',
    naturalidade: '',
    estadoCivil: '',
    telefone: '',
    email: '',
    senha: '',
    perfil: 'DOCENTE',
    endereco: {
      cep: '',
      cidade: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      referencia: '',
    },
    materias: []
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.docenteForm = this.fb.group({
      nome: [`${this.docente.nome}`, [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      genero: [`${this.docente.genero}`, Validators.required],
      nascimento: [`${this.docente.nascimento}`, Validators.required],
      cpf: [`${this.docente.cpf}`, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: [`${this.docente.rg}`, [Validators.required, Validators.maxLength(20)]],
      estadoCivil: [`${this.docente.estadoCivil}`, Validators.required],
      telefone: [`${this.docente.telefone}`, [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4,5}-\d{4}$/)]],
      email: [`${this.docente.email}`, [Validators.required, Validators.email]],
      senha: [`${this.docente.senha}`, [Validators.required, Validators.minLength(8)]],
      naturalidade: [`${this.docente.naturalidade}`, [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      cep: [`${this.docente.endereco.cep}`, [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cidade: [this.docente.endereco.cidade],
      estado: [''],
      logradouro: [this.docente.endereco.logradouro],
      numero: [this.docente.endereco.numero],
      complemento: [this.docente.endereco.complemento],
      bairro: [this.docente.endereco.bairro],
      referencia: [this.docente.endereco.referencia],
      materias: [`${this.docente.materias}`, Validators.required]
    });

    this.buscarEndereco();
  }

  onSubmit(): void {
    if (this.docenteForm.valid) {
      const docente = this.docenteForm.value;
      const docenteToSave = { ...docente }

      this.cadastrarUsuarioDocente(docenteToSave);
      
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/listagem-docentes']);

    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  private cadastrarUsuarioDocente(docente: any) {
    this.docenteService.cadastrarUsuarioDocente(docente).subscribe( usuario => {
      this.cadastrarDocente(docente, usuario)
    })
  }

  private cadastrarDocente(docente: any, usuario: any) {
    let data = { ...docente, usuario_id: usuario.usuarioId }
    this.docenteService.cadastroDocente(data).subscribe(response => {
    });
  }

  onEdit(): void {
    alert('Editar funcionalidade não implementada.');
  }

  onDelete(): void {
    if (this.docenteForm.valid) {
      const docenteToDelete = this.eventualDocenteId;

      this.deletarDocente(docenteToDelete);
      
      alert('Docente deletado com sucesso!');
      this.router.navigate(['/listagem-docentes']);

    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  deletarDocente(id: number) {
    console.log(id);
    this.docenteService.deletarDocente(id).subscribe(response => {
      console.log('Docente deletado!')
    });
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  buscarEndereco(): void {
    const cep = this.docenteForm.get('cep')?.value;
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

}
