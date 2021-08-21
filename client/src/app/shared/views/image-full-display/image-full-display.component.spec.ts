import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFullDisplayComponent } from './image-full-display.component';

describe('ImageFullDisplayComponent', () => {
  let component: ImageFullDisplayComponent;
  let fixture: ComponentFixture<ImageFullDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFullDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFullDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
