import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteHomeComponent } from './home-docente.component';

describe('DocenteHomeComponent', () => {
  let component: DocenteHomeComponent;
  let fixture: ComponentFixture<DocenteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocenteHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocenteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
