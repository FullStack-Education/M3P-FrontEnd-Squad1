import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userRole: string = '';
  isCollapsed: boolean = false;
  isMobile: boolean = false;
  isMobileSidebarOpen: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.userRole = sessionStorage.getItem('role') || '';

    this.checkIfMobile();

    window.addEventListener('resize', this.checkIfMobile.bind(this));
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.isCollapsed = false; 
      this.isMobileSidebarOpen = true;
    } else {
      this.isCollapsed = false; 
      this.isMobileSidebarOpen = false;
    }
  }

  toggleCollapse() {
    if (this.isMobile) {
      this.isMobileSidebarOpen = !this.isMobileSidebarOpen; 
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');

    this.router.navigate(['/']);
  }
}
