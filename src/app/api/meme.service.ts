import { Injectable } from '@angular/core';
import {BaseApiService, MessageReply, Version} from './base-api.service';
import {UserService} from './user.service';

export interface Meme {
  id: number;
  title: string;
  Image: {
    link: string,
    width: number,
    height: number
  };
  creator: {
    username: string;
  };
  TemplateId: number;
  Community: {
    name: string;
  };
  createdAt: string;
  totalVote: number;
  myVote: {
    diff: number;
  };
}

export interface MemeList {
  memes: Array<Meme>;
  totalCount: number;
  offset: number;
  sort: string;
}

@Injectable()
export class MemeService {
  private memes: {[id: number]: Meme} = {};

  constructor(private api: BaseApiService,
              private userService: UserService) {
    userService.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // destroy cache, we don't know how we voted on stuff
        this.memes = {};
      }
      else {
        // remove our votes
        Object.keys(this.memes).forEach((id) => {
          if (this.memes[id].myVote) {
            delete this.memes[id].myVote;
          }
        });
      }
    });
  }

  /**
   * Creates a new meme
   * @param {string} title
   * @param {string} link
   * @param {number} width
   * @param {number} height
   * @param {number} templateId
   * @param {string} communityName
   * @return {Promise<Meme>} New meme details
   */
  createMeme(title: string, link: string, width: number, height: number, templateId: number, communityName: string): Promise<Meme>{
    return this.api.post(Version.v1, `memes`, {
      title: title,
      link: link,
      templateId: templateId,
      communityName: communityName
    }).then((meme: Meme) => {
      return meme;
    });
  }

  async getMemes(sort: string, offset: number, count: number, communityName?: string): Promise<MemeList> {
    let result;

    if (communityName) {
      result = await this.api.get(Version.v1,
        `communities/${communityName}/memes?sort=${sort}&offset=${offset}&count=${count}`) as Promise<MemeList>;
    }
    else {
      result = await this.api.get(Version.v1, `memes?sort=${sort}&offset=${offset}&count=${count}`) as Promise<MemeList>;
    }

    result.memes.forEach((meme: Meme) => {
      this.memes[meme.id] = meme;
    });

    return result;
  }

  /**
   * Gets a meme's detail using the meme's id
   * @param {number} memeId
   */
  async getMemeDetails(memeId: number): Promise<Meme> {
    if (this.memes[memeId]) {
      return Promise.resolve(this.memes[memeId])
    }

    return this.api.get(Version.v1, `memes/${memeId}`).then( (meme: Meme) => {
      this.memes[meme.id] = meme;
      return meme;
    });
  }

  /**
   * Upvote a meme
   * @param {number} memeId
   */
  upvoteMeme(memeId: number): Promise<MessageReply> {
    return this.api.put(Version.v1, `memes/${memeId}/vote`, {
      vote: 1
    }).then((reply: MessageReply) => {
      if (this.memes[memeId]) {
        this.memes[memeId].myVote = {diff: 1};
      }

      return reply;
    });
  }

  /**
   * Downvote a meme
   * @param {number} memeId
   */
  downvoteMeme(memeId: number): Promise<MessageReply> {
    return this.api.put(Version.v1, `memes/${memeId}/vote`, {
      vote: -1
    }).then((reply: MessageReply) => {
      if (this.memes[memeId]) {
        this.memes[memeId].myVote = {diff: -1};
      }

      return reply;
    });
  }

  /**
   * Delete user's vote for a meme
   * @param {number} memeId
   */
  deleteMemeVote(memeId: number) {
    return this.api.delete(Version.v1, `memes/${memeId}/vote`).then((value:({}|void)) => {
      if (this.memes[memeId]) {
        delete this.memes[memeId].myVote;
      }
    });
  }

  /**
   * Delete a meme
   * @param {number} memeId
   */
  deleteMeme(memeId: number) {
    return this.api.delete(Version.v1, `memes/${memeId}`).then((value:({}|void)) => {
      if (this.memes[memeId]) {
        delete this.memes[memeId];
      }

      return value;
    });
  }

}
