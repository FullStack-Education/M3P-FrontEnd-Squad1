import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListagemDocentesComponent } from './listagem-docentes.component';
import { Router } from '@angular/router';
import { DocenteService } from '../../shared/services/docente.service';
import { of } from 'rxjs';

describe('ListagemDocentesComponent', () => {
  let component: ListagemDocentesComponent;
  let fixture: ComponentFixture<ListagemDocentesComponent>;
  let docenteService: DocenteService;
  let router: Router;

  beforeEach(async () => {
    const docenteServiceMock = {
      getMock: jasmine.createSpy('getMock').and.returnValue([
        { id: 1, nome: 'Docente 1', email: 'docente1@example.com' },
        { id: 2, nome: 'Docente 2', email: 'docente2@example.com' },
      ]),
    };

    const routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [ListagemDocentesComponent],
      providers: [
        { provide: DocenteService, useValue: docenteServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemDocentesComponent);
    component = fixture.componentInstance;
    docenteService = TestBed.inject(DocenteService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all docentes', () => {
    expect(component.filteredDocentes.length).toBe(2);
  });

  it('should filter docentes based on search query', () => {
    component.onSearch('Docente 1');
    expect(component.filteredDocentes.length).toBe(1);
    expect(component.filteredDocentes[0].nome).toBe('Docente 1');
    
    component.onSearch('docente2@example.com');
    expect(component.filteredDocentes.length).toBe(1);
    expect(component.filteredDocentes[0].email).toBe('docente2@example.com');

    component.onSearch('3');
    expect(component.filteredDocentes.length).toBe(0);
  });

  it('should reset the filter when search query is empty', () => {
    component.onSearch('Docente 1');
    expect(component.filteredDocentes.length).toBe(1);
    
    component.onSearch('');
    expect(component.filteredDocentes.length).toBe(2); 
  });

  it('should navigate to cadastro-docente when "Ver Mais" is clicked', () => {
    const docente = component.filteredDocentes[0];
    component.onViewDocente(new Event('click'));
    expect(router.navigate).toHaveBeenCalledWith(['/cadastro-docente'], { state: { event: jasmine.any(Object) } });
  });
});
