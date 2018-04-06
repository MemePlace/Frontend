import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

export interface Meme {
  id: number,
  title: string,
  link: string,
  creatorId: number,
  TemplateId: number,
  CommunityId: number,
  updatedAt: string,
  createdAt: string
}

export interface MemeVote {
  id: number,
  diff: number,
  MemeId: number,
  UserId: number
}

@Injectable()
export class MemeService {

  constructor(private baseApiService: BaseApiService) {}

  /**
   * Creates a new meme
   * @param {string} title
   * @param {string} link
   * @param {number} templateId
   * @param {number} communityId
   * @return {Promise<Meme>} New meme details
   */
  createMeme(title: string, link: string, templateId: number, communityId: number): Promise<Meme>{
    return this.baseApiService.post(Version.v1, 'memes', {
      title: title,
      link: link,
      templateId: templateId,
      communityId: communityId
    }).then((meme: Meme) => {
      return meme;
    });
  }

  getMemes() {
    // TODO
  }

  /**
   * Gets a meme's detail using the meme's id
   * @param {string} memeId
   */
  getMemeDetails(memeId: string) {
    return this.baseApiService.get(Version.v1, 'memes/${memeId}').then( (value:({}|null)) => {
      return value;
    });
  }

  /**
   * Upvote a meme
   * @param {string} memeId
   */
  upvoteMeme(memeId: string): Promise<MemeVote> {
    return this.baseApiService.put(Version.v1, 'memes/${memeId}/vote', {
      vote: "1"
    }).then( (memeVote: MemeVote) => {
      return memeVote;
    });
  }

  /**
   * Downvote a meme
   * @param {string} memeId
   */
  downvoteMeme(memeId: string): Promise<MemeVote> {
    return this.baseApiService.put(Version.v1, 'memes/${memeId}/vote', {
      vote: "-1"
    }).then( (memeVote: MemeVote) => {
      return memeVote;
    });
  }

  /**
   * Delete user's vote for a meme
   * @param {string} memeId
   */
  deleteMemeVote(memeId: string) {
    return this.baseApiService.delete(Version.v1, 'memes/${memeId}/vote').then((value:({}|void)) => {
      console.log(value);
    });
  }

  /**
   * Delete a meme
   * @param {string} memeId
   */
  deleteMeme(memeId: string) {
    return this.baseApiService.delete(Version.v1, 'memes/${memeId}').then((value:({}|void)) => {
      console.log(value);
    });
  }

}