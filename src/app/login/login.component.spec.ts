import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { Location } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty values', () => {
    const loginForm = component.loginForm;
    expect(loginForm).toBeDefined();
    expect(loginForm.get('email')?.value).toBe('');
    expect(loginForm.get('password')?.value).toBe('');
  });

  it('should mark email as invalid if email is not in the correct format', () => {
    component.loginForm.controls['email'].setValue('invalid-email');
    expect(component.loginForm.controls['email'].valid).toBeFalse();
  });

  it('should mark password as invalid if less than 6 characters', () => {
    component.loginForm.controls['password'].setValue('12345');
    expect(component.loginForm.controls['password'].valid).toBeFalse();
  });

  it('should login successfully and navigate to home on valid credentials', () => {
    component.loginForm.controls['email'].setValue('admin@scholargate.com');
    component.loginForm.controls['password'].setValue('admin123');

    spyOn(localStorage, 'setItem');
    component.onSubmit();

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'currentUser',
      JSON.stringify({
        email: 'admin@scholargate.com',
        password: 'admin123',
        role: 'ADMINISTRADOR',
        name: 'Marina Oliveira'
      })
    );
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an alert on incorrect login credentials', () => {
    spyOn(window, 'alert');
    component.loginForm.controls['email'].setValue('wrong@scholargate.com');
    component.loginForm.controls['password'].setValue('wrongpassword');

    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Email ou senha incorretos. Tente novamente.');
  });

  it('should display an alert when onRegister is called', () => {
    spyOn(window, 'alert');
    component.onRegister();
    expect(window.alert).toHaveBeenCalledWith('Funcionalidade de cadastro em desenvolvimento.');
  });

  it('should display an alert when onForgotPassword is called', () => {
    spyOn(window, 'alert');
    component.onForgotPassword();
    expect(window.alert).toHaveBeenCalledWith('Funcionalidade de recuperação de senha em desenvolvimento.');
  });
});
