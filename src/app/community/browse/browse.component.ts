import {Component, OnInit} from '@angular/core';
import {Utils} from '../../utils';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Community, CommunityService} from '../../api/community.service';
import {MemeService} from '../../api/meme.service';
import {MemeDialogComponent} from '../../meme-dialog/meme-dialog.component';
import {MatDialog} from '@angular/material';
import {Location} from '@angular/common';

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
              private dialog: MatDialog,
              private communityService: CommunityService,
              private memeService: MemeService,
              private location: Location) { }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.retrieved = false;
      if (params.name && params.id) {
        // Create meme dialog and load meme community in the background
        this.memeService.getMemeDetails(params.id).then((meme) => {
          // open a dialog for the meme
          const memeDiag = this.dialog.open(MemeDialogComponent, {
            data: { memeId: meme.id },
            autoFocus: false,
          });

          memeDiag.beforeClose().subscribe(() => {
            this.location.go(`/c/${meme.Community.name}`);
          });

          if (!this.community || this.community.name !== meme.Community.name) {
            this.communityService.getCommunityDetails(meme.Community.name).then((community) => {
              this.community = community;
              this.retrieved = true;
            });
          }
        }).catch((err) => {
          console.log(err);
          this.router.navigate(['/404'], {skipLocationChange: true});
        });
      } else if (params.name) {
        // Load community
        this.communityService.getCommunityDetails(params.name).then((community) => {
          this.community = community;
          this.retrieved = true;
        }).catch((err) => {
          this.router.navigate(['/404'], {skipLocationChange: true});
        });
      } else {
        setTimeout(() => {
          this.retrieved = true;
        }, 0);
      }
    });
  }
}
