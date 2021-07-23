import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertUrlComponent } from './convert-url.component';

describe('ConvertUrlComponent', () => {
  let component: ConvertUrlComponent;
  let fixture: ComponentFixture<ConvertUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertUrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
