import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaTurnosComponent } from './reserva-turnos.component';

describe('ReservaTurnosComponent', () => {
  let component: ReservaTurnosComponent;
  let fixture: ComponentFixture<ReservaTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
