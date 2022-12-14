import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AristocatsComponent } from './aristocats.component';

describe('AristocatsComponent', () => {
  let component: AristocatsComponent;
  let fixture: ComponentFixture<AristocatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AristocatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AristocatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
