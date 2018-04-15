import { TestBed, inject } from '@angular/core/testing';

import { ImgurService } from './imgur.service';

describe('ImgurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImgurService]
    });
  });

  it('should be created', inject([ImgurService], (service: ImgurService) => {
    expect(service).toBeTruthy();
  }));
});
