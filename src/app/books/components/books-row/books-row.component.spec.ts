import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksRowComponent } from './books-row.component';

describe('BooksRowComponent', () => {
  let component: BooksRowComponent;
  let fixture: ComponentFixture<BooksRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
