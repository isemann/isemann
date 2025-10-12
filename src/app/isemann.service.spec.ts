import { TestBed } from '@angular/core/testing';

import { IsemannService } from './isemann.service';

describe('IsemannService', () => {
  let service: IsemannService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsemannService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
