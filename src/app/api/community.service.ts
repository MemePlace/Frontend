import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

export interface Community {
  name: string;
  title: string;
  description?: string;
  sidebar?: string;
  nsfw?: boolean;
  creatorId: number;
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

  constructor(private api: BaseApiService) { }

  // create new community
  createCommunity(community: Community): Promise<any> {
    return this.isCommunityNameAvailable(community.name).then((exists: boolean) => {
      if (!exists) {
        this.api.post(Version.v1, 'communities', community).then((community: Community) => {
        return community;
        });
      } else { return 'This community already exists'; }
    });
  }

  // get communities from database
  getCommunities(sort: string, count: number, offset: number): Promise<CommunityList> {
    return this.api.get(Version.v1, `communities?sort=${sort}&count=${count}&offset=${offset}`).then((communitiesList: CommunityList) => {
      return communitiesList;
    });
  }

  // get community details
  getCommunityDetails(name: string): Promise<Community> {
    return this.api.get(Version.v1, `communities/${name}`).then((community: Community) => {
      return community;
    });
  }

  // favourite community
  favouriteCommunity(name: string): Promise<any> {
    return this.api.put(Version.v1, `communities/${name}/favourite`, {} ).then((msg: string) => {
      return msg;
    });
  }
  // removes community from favourite communities
  deleteFavourite(name: string): Promise<any> {
    return this.api.delete(Version.v1, `communities/${name}/favourite`).then((msg: string) => {
      return msg;
    });
  }

  // get memes from community
  getCommunityMemes(name: string): Promise<any> {
    // TODO
    throw Error('Method not implemented');
  }

  // get templates from community
  getCommunityTemplates(name: string, sort: string, offset: number, count: number): Promise<TemplateList> {
    return this.api.get(Version.v1, `communities/${name}/templates?sort=${sort}&offset=${offset}&count=${count}`).then((templatesList: TemplateList) => {
      return templatesList;
    });
  }
  // check if community name is available
  isCommunityNameAvailable(name: string): Promise<boolean> {
    return this.api.get(Version.v1, `${name}/exists`).then((exists: boolean) => {
      return exists;
    });
  }
}
