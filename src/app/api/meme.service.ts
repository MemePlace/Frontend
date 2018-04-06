import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

@Injectable()
export class MemeService {

  constructor(private baseApiService: BaseApiService) {}

  createMeme(title: string, link: string, templateId: string, communityId: string) {

  }

  getMemes() {
    // TODO
  }


  getMemeDetails(memeId: string) {

  }

  upvoteMeme(memeId: string) {

  }

  downvoteMeme(memeId: string) {

  }

  unvoteMeme(memeId: string) {

  }

  deleteMeme(memeId: string) {

  }

}
