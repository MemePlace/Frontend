import {Component, Input, OnInit} from '@angular/core';
import {Community, CommunityService} from '../../api/community.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-community-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() community: Community;

  get isFavourited() {
    return this.communityService.isFavourited(this.community.name);
  }

  favourites_ = 0;

  set totalFavourites(favourites: number) {
    this.favourites_ = favourites;
  }

  get totalFavourites() {
    let v = this.favourites_;

    if (this.isFavourited) {
      v += 1;
    }

    return v;
  }

  constructor(private communityService: CommunityService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    let fav = this.community.favourites;

    if (this.isFavourited) {
      fav -= 1;
    }

    this.totalFavourites = fav;
  }

  async toggleFavourite() {
    const isFavourited = this.communityService.isFavourited(this.community.name);

    try {
      const promise = (isFavourited) ? this.communityService.unfavourite(this.community) :
        this.communityService.favourite(this.community);

      await promise;
    } catch(err) {
      this.snackBar.open(`Failed to favourite: ${err.message}`, 'Close');
    }

  }
}
