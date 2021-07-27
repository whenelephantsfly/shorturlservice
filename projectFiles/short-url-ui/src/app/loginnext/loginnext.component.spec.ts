import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginnextComponent } from './loginnext.component';

describe('LoginnextComponent', () => {
  let component: LoginnextComponent;
  let fixture: ComponentFixture<LoginnextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginnextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginnextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
