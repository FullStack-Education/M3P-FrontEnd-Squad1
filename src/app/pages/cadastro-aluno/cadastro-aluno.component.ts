import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViaCepService } from '../../shared/services/via-cep.service';
import { AlunoService } from '../../shared/services/aluno.service';
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
  estadosCivis = ['Solteiro(a)', 'Casado(a)', 'União Estável', 'Divorciado(a)', 'Viúvo(a)'];

  turmas: any[] = [];
  isEditing = false;
  eventualAlunoId: any;


  constructor(
    private fb: FormBuilder,
    private viaCepService: ViaCepService,
    private router: Router,
    private alunoService: AlunoService
  ) {
    let alunoRecebido = this.router.getCurrentNavigation()?.extras.state?.['aluno'];

    if (alunoRecebido) {
      this.isEditing = true;

      this.eventualAlunoId = alunoRecebido.id;
      this.aluno.nome = alunoRecebido.nome;
      this.aluno.genero = alunoRecebido.genero;
      this.aluno.nascimento = alunoRecebido.nascimento;
      this.aluno.cpf = alunoRecebido.cpf;
      this.aluno.rg = alunoRecebido.rg;
      this.aluno.expeditor = alunoRecebido.expeditor;
      this.aluno.naturalidade = alunoRecebido.naturalidade;
      this.aluno.estadoCivil = alunoRecebido.estadoCivil;
      this.aluno.telefone = alunoRecebido.telefone;
      this.aluno.email = alunoRecebido.email;
      this.aluno.senha = alunoRecebido.senha;
      //this.aluno.endereco.cep = alunoRecebido.cep;
      this.aluno.endereco.numero = alunoRecebido.numero;

    }
  }

  aluno = {
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
    perfil: 'ALUNO',
    endereco: {
      cep: '',
      cidade: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      referencia: '',
    },
    avaliacoes: [],
    notaCountId: '',
    turma: []
}

  ngOnInit(): void {
    this.initForm();
    this.buscaTurmas();
  }

  buscaTurmas() {
    return this.alunoService.getTurmas().subscribe(response => {
      this.turmas = response;
    });
  }

  initForm(): void {
    this.alunoForm = this.fb.group({
      nome: [`${this.aluno.nome}`, [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      genero: [`${this.aluno.genero}`, Validators.required],
      dataNascimento: [`${this.aluno.nascimento}`, Validators.required],
      cpf: [`${this.aluno.cpf}`, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      rg: [`${this.aluno.rg}`, [Validators.required, Validators.maxLength(20)]],
      estadoCivil: [`${this.aluno.estadoCivil}`, Validators.required],
      telefone: [`${this.aluno.telefone}`, [Validators.required, Validators.pattern(/^\(\d{2}\) \d \d{4,5}-\d{4}$/)]],
      email: [`${this.aluno.email}`, [Validators.required, Validators.email]],
      senha: [`${this.aluno.senha}`, [Validators.required, Validators.minLength(8)]],
      naturalidade: [`${this.aluno.naturalidade}`, [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      cep: [`${this.aluno.endereco.cep}`, [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
      cidade: [`${this.aluno.endereco.cidade}`],
      estado: [''],
      logradouro: [`${this.aluno.endereco.logradouro}`],
      numero: [`${this.aluno.endereco.numero}`],
      complemento: [`${this.aluno.endereco.complemento}`],
      bairro: [`${this.aluno.endereco.bairro}`],
      referencia: [`${this.aluno.endereco.referencia}`],
      turma_id: [`${this.aluno.turma}`, Validators.required]
    });

    this.buscarEndereco();
  }

  onSubmit(): void {
    if (this.alunoForm.valid) {
      const aluno = this.alunoForm.value;
      const alunoToSave = { ...aluno }

      this.cadastrarUsuarioAluno(alunoToSave);

      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/home']);
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  private cadastrarUsuarioAluno(aluno: any) {
    this.alunoService.cadastrarUsuarioAluno(aluno).subscribe( usuario => {
      this.cadastrarAluno(aluno, usuario)
    })
  }

  private cadastrarAluno(aluno: any, usuario: any) {
    let data = { ...aluno, usuario_id: usuario.usuarioId }
    this.alunoService.cadastrarAluno(data).subscribe(response => {
    });
  }

  onEdit(): void {
    alert('Editar funcionalidade não implementada.');
  }

  onDelete(): void {
    if (this.eventualAlunoId) {
      const alunoDelete = this.eventualAlunoId;

      this.deletaAluno(alunoDelete);
      this.router.navigate(['/listagem-docentes']);

    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  deletaAluno(id: number) {
    this.alunoService.deletarAluno(id).subscribe(response => {
      console.log('Aluno deletado!')
      alert('Aluno deletado com sucesso!');
    });
  }

  onCancel(): void {
    this.router.navigate(['/home']);
  }

  buscarEndereco(): void {
    const cep = this.alunoForm.get('cep')?.value;
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
}
