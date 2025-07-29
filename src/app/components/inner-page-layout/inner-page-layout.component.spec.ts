import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerPageLayoutComponent } from './inner-page-layout.component';

describe('InnerPageLayoutComponent', () => {
  let component: InnerPageLayoutComponent;
  let fixture: ComponentFixture<InnerPageLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InnerPageLayoutComponent]
    });
    fixture = TestBed.createComponent(InnerPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
