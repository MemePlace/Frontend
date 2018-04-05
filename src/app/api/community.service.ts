import { Injectable } from '@angular/core';
import { BaseApiService, Version } from './base-api.service';

@Injectable()
export class CommunityService {

  constructor(private api:BaseApiService) { }

}
