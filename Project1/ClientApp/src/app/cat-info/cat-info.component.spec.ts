import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatInfoComponent } from './cat-info.component';

describe('CatInfoComponent', () => {
  let component: CatInfoComponent;
  let fixture: ComponentFixture<CatInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
