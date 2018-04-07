import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

export interface Community {
  name: string;
  title: string;
  description: string;
  sidebar: string;
  nsfw: boolean;
  creatorId: number;
}

export interface CommunityList {
  communities: Array<string>;
  totalCount: number;
  offset: number;
  size: number;
  sort: number;
}

export interface TemplateList {
  templates: Array<string>;
  totalCount: number;
  offset: number;
  size: number;
  sort: number;
}

@Injectable()
export class CommunityService {
  // private community: Community;
  // private name: string;

  constructor(private api: BaseApiService) { }

  // create new community
  createCommunity(
    name: string,
    title: string,
    description: string,
    sidebar: string,
    nsfw: boolean,
    creatorId: string): Promise<any> {
    return this.isCommunityNameAvailable(name).then((exists: boolean) => {
      if (!exists) {
        this.api.post(Version.v1, 'communities', { name, title, description, sidebar, nsfw, creatorId }).then((community: Community) => {
        return community;
        });
      } else { return 'This community already exists'; }
    });
  }

  // get communities from database
  getCommunities(): Promise<CommunityList> {
    return this.api.get(Version.v1, 'communities?sort=<top|new>&count=<10>&offset=<0>').then((communitiesList: CommunityList) => {
      return communitiesList;
    });
  }

  // get community details
  getCommunityDetails(name: string): Promise<Community> {
    return this.api.get(Version.v1, 'communities/' + name).then((community: Community) => {
      return community;
    });
  }

  // favourite community
  favouriteCommunity(name: string): Promise<any> {
    return this.api.put(Version.v1, 'communities/' + name + '/favourite', {} ).then((msg: string) => {
      return msg;
    });
  }
  // removes community from favourite communities
  deleteFavourite(name: string): Promise<any> {
    return this.api.delete(Version.v1, 'communities/' + name + '/favourite').then((msg: string) => {
      return msg;
    });
  }

  //get memes from community
  getCommunityMemes(name: string): Promise<any> {
    // TODO
    throw Error('Method not implemented');
  }

  // get templates from community
  getCommunityTemplates(name: string): Promise<TemplateList> {
    return this.api.get(Version.v1, 'communities/' + name + '/templates?sort=top|new&offset=0&count=10').then((templatesList: TemplateList) => {
      return templatesList;
    });
  }
  // check if community name is available
  isCommunityNameAvailable(name: string): Promise<boolean> {
    return this.api.get(Version.v1, name + '/exists').then((exists: boolean) => {
      return exists;
    });
  }
}
