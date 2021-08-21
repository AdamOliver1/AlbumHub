import { TestBed } from '@angular/core/testing';

import { ImageDialogServiceService } from './image-dialog-service.service';

describe('ImageDialogServiceService', () => {
  let service: ImageDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
