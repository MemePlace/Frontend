import { TestBed, inject } from '@angular/core/testing';

import { MemeService } from './meme.service';

describe('MemeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemeService]
    });
  });

  it('should be created', inject([MemeService], (service: MemeService) => {
    expect(service).toBeTruthy();
  }));
});
