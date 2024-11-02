import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  token = {
    token: '',
    role: '',
    nome: '',
    entityId: ''
  };

  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password).subscribe(response =>  {

      this.token = { ...response };
      
      sessionStorage.setItem('token', this.token.token);
      sessionStorage.setItem('role', this.token.role);
      sessionStorage.setItem('nome', this.token.nome);
      sessionStorage.setItem('entityId', this.token.entityId);

      let role = response.role;
      this.router.navigate(['/home'], { state: { role } });
    });
  }

  onRegister() {
    alert('Funcionalidade de cadastro em desenvolvimento.');
  }

  onForgotPassword() {
    alert('Funcionalidade de cadastro em desenvolvimento.');
  }

}
