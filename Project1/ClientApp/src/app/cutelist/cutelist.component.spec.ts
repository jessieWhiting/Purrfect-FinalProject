import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutelistComponent } from './cutelist.component';

describe('CutelistComponent', () => {
  let component: CutelistComponent;
  let fixture: ComponentFixture<CutelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CutelistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CutelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
