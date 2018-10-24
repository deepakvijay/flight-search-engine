import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAutoCompleteComponent } from './city-auto-complete.component';

describe('CityAutoCompleteComponent', () => {
  let component: CityAutoCompleteComponent;
  let fixture: ComponentFixture<CityAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
