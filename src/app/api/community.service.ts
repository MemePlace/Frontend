import { Injectable } from '@angular/core';
import {BaseApiService, MessageReply, Version} from './base-api.service';
import {UserService} from './user.service';

export interface Community {
  name: string;
  title: string;
  description?: string;
  sidebar?: string;
  nsfw?: boolean;
  favourites?: number;
  favourited: boolean;
  creator?: {
    username: string;
  };
}

export interface CommunityList {
  communities: Array<Community>;
  totalCount: number;
  offset: number;
  size: number;
  sort: number;
}

export interface TemplateList {
  templates: Array<{}>;
  totalCount: number;
  offset: number;
  size: number;
  sort: number;
}

@Injectable()
export class CommunityService {
  constructor(private api: BaseApiService,
              private userService: UserService) { }

  createCommunity(community: Community): Promise<Community> {
    return this.api.post(Version.v1, 'communities', community) as Promise<Community>;
  }

  getCommunities(sort: string, count: number, offset: number): Promise<CommunityList> {
    return this.api.get(Version.v1, `communities?sort=${sort}&count=${count}&offset=${offset}`)
      .then((communitiesList: CommunityList) => {
        return communitiesList;
      });
  }

  getCommunityDetails(name: string): Promise<Community> {
    return this.api.get(Version.v1, `communities/${name}`).then((community: Community) => {
      return community;
    });
  }

  favourite(community: Community): Promise<MessageReply> {
    return this.userService.favouriteCommunity(community);
  }

  unfavourite(community: Community): Promise<MessageReply> {
    return this.userService.unfavouriteCommunity(community);
  }

  isFavourited(name: string) {
    return this.userService.isCommunityFavourited(name);
  }

  getCommunityMemes(name: string): Promise<any> {
    // TODO
    throw Error('Method not implemented');
  }

  getCommunityTemplates(name: string, sort: string, offset: number, count: number): Promise<TemplateList> {
    return this.api.get(Version.v1, `communities/${name}/templates?sort=${sort}&offset=${offset}&count=${count}`)
      .then((templatesList: TemplateList) => {
        return templatesList;
      });
  }

  isCommunityNameAvailable(name: string): Promise<boolean> {
    return this.api.get(Version.v1, `communities/${name}/exists`).then((data: {exists: boolean}) => {
      return data.exists;
    });
  }
}
