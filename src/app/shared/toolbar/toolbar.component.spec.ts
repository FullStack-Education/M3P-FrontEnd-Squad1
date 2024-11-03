import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarComponent } from './toolbar.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let routerEvents$: Subject<any>;

  const mockActivatedRoute = {
    firstChild: {
      firstChild: {
        snapshot: {
          data: { title: 'Test Page Title' },
        },
      },
    },
  };

  beforeEach(async () => {
    routerEvents$ = new Subject();

    const mockRouter = {
      events: routerEvents$.asObservable(),
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ToolbarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update pageTitle based on ActivatedRoute data', () => {
    routerEvents$.next(new NavigationEnd(1, '/test-path', '/test-path'));

    fixture.detectChanges();

    expect(component.pageTitle).toBe('Test Page Title');
  });

  it('should set default values for userName and userRole if no currentUser is in localStorage', () => {
    expect(component.userName).toBe('Usuário');
    expect(component.userRole).toBe('');
  });

  it('should set userName and userRole from currentUser in localStorage', () => {
    const mockUser = { name: 'John Doe', role: 'Admin' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

    component.ngOnInit();

    expect(component.userName).toBe('John Doe');
    expect(component.userRole).toBe('Admin');
  });
});
