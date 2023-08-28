import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedByComponent } from './searched-by.component';

describe('SearchedByComponent', () => {
  let component: SearchedByComponent;
  let fixture: ComponentFixture<SearchedByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchedByComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
