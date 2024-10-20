import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    const usersMock = [
      { email: 'admin@scholargate.com', password: 'admin123', role: 'ADMINISTRADOR', name: 'Marina Oliveira' },
      { email: 'docente@scholargate.com', password: 'docente123', role: 'DOCENTE', name: 'Otávio Queiroz' },
      { email: 'aluno@scholargate.com', password: 'aluno123', role: 'ALUNO', name: 'Pedro Torres' }
    ];

    const user = usersMock.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/home']);
    } else {
      alert('Email ou senha incorretos. Tente novamente.');
    }
  }

  onRegister() {
    alert('Funcionalidade de cadastro em desenvolvimento.');
  }

  onForgotPassword() {
    alert('Funcionalidade de recuperação de senha em desenvolvimento.');
  }
}
