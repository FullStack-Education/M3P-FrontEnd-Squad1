import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CadastroAlunoComponent } from './cadastro-aluno.component';

describe('CadastroAlunoComponent', () => {
  let component: CadastroAlunoComponent;
  let fixture: ComponentFixture<CadastroAlunoComponent>;
  let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroAlunoComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
