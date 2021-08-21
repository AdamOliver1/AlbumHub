import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUploadImageComponent } from './header-upload-image.component';

describe('HeaderUploadImageComponent', () => {
  let component: HeaderUploadImageComponent;
  let fixture: ComponentFixture<HeaderUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUploadImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
