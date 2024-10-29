import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CadastroDocenteComponent } from './cadastro-docente.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { ViaCepService } from '../services/via-cep.service';
import { DocenteService } from '../services/docente.service';
import { of, throwError } from 'rxjs';

describe('CadastroDocenteComponent', () => {
  let component: CadastroDocenteComponent;
  let fixture: ComponentFixture<CadastroDocenteComponent>;
  let httpMock: HttpTestingController;
  let viaCepService: ViaCepService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDocenteComponent, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        ViaCepService,
        DocenteService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroDocenteComponent);
    component = fixture.componentInstance;
    viaCepService = TestBed.inject(ViaCepService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Initialization', () => {
    it('should initialize the form with default values', () => {
      expect(component.docenteForm).toBeDefined();
      const formValues = component.docenteForm.value;
      expect(formValues.nome).toBe('');
      expect(formValues.genero).toBe('');
      expect(formValues.dataNascimento).toBe('');
      expect(formValues.cpf).toBe('');
      expect(formValues.estadoCivil).toBe('');
      expect(formValues.email).toBe('');
      expect(formValues.materias).toEqual([]);
    });

    it('should have required validators for all mandatory fields', () => {
      const form = component.docenteForm;
      expect(form.get('nome')?.hasValidator(Validators.required)).toBeTrue();
      expect(form.get('genero')?.hasValidator(Validators.required)).toBeTrue();
      expect(form.get('cpf')?.hasValidator(Validators.required)).toBeTrue();
      expect(form.get('email')?.hasValidator(Validators.required)).toBeTrue();
    });
  });

  describe('Form Validations', () => {
    it('should invalidate the form if any required field is missing', () => {
      component.docenteForm.controls['nome'].setValue('');
      expect(component.docenteForm.invalid).toBeTrue();
    });

    it('should validate CPF format', () => {
      const cpfControl = component.docenteForm.controls['cpf'];
      cpfControl.setValue('123.456.789-00');
      expect(cpfControl.valid).toBeTrue();
      cpfControl.setValue('12345678900');
      expect(cpfControl.valid).toBeFalse();
    });

    it('should validate telefone format', () => {
      const telefoneControl = component.docenteForm.controls['telefone'];
      telefoneControl.setValue('(11) 9 1234-5678');
      expect(telefoneControl.valid).toBeTrue();
      telefoneControl.setValue('123456789');
      expect(telefoneControl.valid).toBeFalse();
    });
  });

  describe('Cancel and Not Implemented Functions', () => {
    it('should navigate to the home page on cancel', () => {
      component.onCancel();
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
    });

    it('should display an alert on calling onEdit', () => {
      spyOn(window, 'alert');
      component.onEdit();
      expect(window.alert).toHaveBeenCalledWith('Editar funcionalidade não implementada.');
    });

    it('should display an alert on calling onDelete', () => {
      spyOn(window, 'alert');
      component.onDelete();
      expect(window.alert).toHaveBeenCalledWith('Deletar funcionalidade não implementada.');
    });
  });
});
