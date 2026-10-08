import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuoteDialog } from './add-quote-dialog';

describe('AddQuoteDialog', () => {
  let component: AddQuoteDialog;
  let fixture: ComponentFixture<AddQuoteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuoteDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuoteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
