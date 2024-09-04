import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosAgendadosComponent } from './turnos-agendados.component';

describe('TurnosAgendadosComponent', () => {
  let component: TurnosAgendadosComponent;
  let fixture: ComponentFixture<TurnosAgendadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosAgendadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosAgendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
