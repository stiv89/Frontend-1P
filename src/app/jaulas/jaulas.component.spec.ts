import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulasComponent } from './jaulas.component';

describe('JaulasComponent', () => {
  let component: JaulasComponent;
  let fixture: ComponentFixture<JaulasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaulasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
