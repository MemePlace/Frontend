import {Component, OnInit} from '@angular/core';
import {Utils} from '../../utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Community, CommunityService} from '../../api/community.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  routeSubscription: Subscription;
  utils = Utils;

  community: Community;
  retrieved = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private communityService: CommunityService) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.retrieved = false;

      if (params.name) {
        this.communityService.getCommunityDetails(params.name).then((community) => {
          this.community = community;
          this.retrieved = true;
        }).catch((err) => {
          this.router.navigate(['/404'], {skipLocationChange: true});
        });
      } else {
        setTimeout(() => {
          this.retrieved = true;
        });
      }
    });
  }
}
