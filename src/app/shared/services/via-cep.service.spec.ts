import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ViaCepService } from './via-cep.service';

describe('ViaCepService', () => {
  let service: ViaCepService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViaCepService]
    });
    service = TestBed.inject(ViaCepService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch address data for a valid CEP', () => {
    const mockResponse = {
      cep: '12345-678',
      logradouro: 'Rua Exemplo',
      complemento: 'Apto 101',
      bairro: 'Bairro Exemplo',
      localidade: 'Cidade Exemplo',
      uf: 'SP'
    };
    const cep = '12345-678';

    service.buscarEndereco(cep).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://viacep.com.br/ws/${cep}/json/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when the CEP is invalid', () => {
    const cep = '00000-000';

    service.buscarEndereco(cep).subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.status).toBe(400);
      }
    });

    const req = httpMock.expectOne(`https://viacep.com.br/ws/${cep}/json/`);
    expect(req.request.method).toBe('GET');
    req.flush('Invalid CEP', { status: 400, statusText: 'Bad Request' });
  });
});
