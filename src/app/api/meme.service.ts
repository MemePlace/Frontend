import { Injectable } from '@angular/core';
import {BaseApiService, MessageReply, Version} from './base-api.service';

export interface Meme {
  id: number,
  title: string,
  link: string,
  creatorId: number,
  TemplateId: number,
  CommunityId: number,
  updatedAt: string,
  createdAt: string,
  creator: {
    username: string,
  }
  Community: string,
  totalVote: number,
  myVote: {
    diff: number;
  };
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
    return this.baseApiService.post(Version.v1, `memes`, {
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
   * @param {number} memeId
   */
  getMemeDetails(memeId: number): Promise<Meme> {
    return this.baseApiService.get(Version.v1, `memes/${memeId}`).then( (meme: Meme) => {
      return meme;
    });
  }

  /**
   * Upvote a meme
   * @param {number} memeId
   */
  upvoteMeme(memeId: number): Promise<MessageReply> {
    return this.baseApiService.put(Version.v1, `memes/${memeId}/vote`, {
      vote: 1
    }) as Promise<MessageReply>;
  }

  /**
   * Downvote a meme
   * @param {number} memeId
   */
  downvoteMeme(memeId: number): Promise<MessageReply> {
    return this.baseApiService.put(Version.v1, `memes/${memeId}/vote`, {
      vote: -1
    }) as Promise<MessageReply>;
  }

  /**
   * Delete user's vote for a meme
   * @param {number} memeId
   */
  deleteMemeVote(memeId: number) {
    return this.baseApiService.delete(Version.v1, `memes/${memeId}/vote`).then((value:({}|void)) => {
      return 0;
    });
  }

  /**
   * Delete a meme
   * @param {number} memeId
   */
  deleteMeme(memeId: number) {
    return this.baseApiService.delete(Version.v1, `memes/${memeId}`).then((value:({}|void)) => {
      return value;
    });
  }

}
