import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { DocenteHomeComponent } from "../home-docente/home-docente.component";
import { HomeAlunoComponent } from '../home-aluno/home-aluno.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeAdminComponent, DocenteHomeComponent, HomeAlunoComponent, ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userRole = '';

  constructor (private router: Router) {
   this.userRole = this.router.getCurrentNavigation()?.extras.state?.['role'];
  }

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role') || '';
  }
}
