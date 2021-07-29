import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUrlsComponent } from './shared-urls.component';

describe('SharedUrlsComponent', () => {
  let component: SharedUrlsComponent;
  let fixture: ComponentFixture<SharedUrlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedUrlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
