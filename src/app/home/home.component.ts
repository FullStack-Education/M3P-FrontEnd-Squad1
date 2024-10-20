import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeAdminComponent } from "../home-admin/home-admin.component";
import { DocenteHomeComponent } from "../home-docente/home-docente.component";
import { HomeAlunoComponent } from '../home-aluno/home-aluno.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HomeAdminComponent, DocenteHomeComponent, HomeAlunoComponent, ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userRole: string = '';

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userRole = currentUser.role || '';
  }
}
