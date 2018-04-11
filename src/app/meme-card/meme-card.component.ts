import {Component, Input, OnInit} from '@angular/core';
import {Utils} from '../utils';
import { MemeService } from '../api/meme.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})
export class MemeCardComponent implements OnInit {
  @Input() imageHeight: number;
  @Input() memeId: number;

  imageLink: string= "data:image/png;base64,ffff";  // ensures no null request being sent
  username: string;
  totalVote = 0;
  myVote = 0;

  constructor(private memeService: MemeService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.memeService.getMemeDetails(this.memeId).then((meme) => {
      this.imageLink = meme.link;
      this.username = meme.creator.username;
      this.totalVote = meme.totalVote || 0;

      if (meme.myVote) {
        this.myVote =  meme.myVote.diff;
        this.totalVote -= this.myVote; // we represent the total as myVote + totalVote
      }
    });
  }

  maxCardWidth(height: number): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.95;
    } else {
      return Math.min(Utils.screenWidth * 0.95, height * 2.5);
    }
  }

  minCardWidth(height: number): number {
    if (Utils.isMobile) {
      return Utils.screenWidth * 0.95;
    } else {
      return 0;
    }
  }

  checkHeight(height: number): number {
    if (Utils.isMobile) {
      return null;
    } else {
      return height;
    }
  }

  onClickMeme() {
    // TODO
  }

  async onClickUpVote() {
    try {
      const promise = (this.myVote === 1) ? this.memeService.deleteMemeVote(this.memeId): this.memeService.upvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === 1) ? 0 : 1;
    } catch(e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

  async onClickDownVote() {
    try {
      const promise = (this.myVote === -1) ? this.memeService.deleteMemeVote(this.memeId): this.memeService.downvoteMeme(this.memeId);
      await promise;

      this.myVote = (this.myVote === -1) ? 0 : -1;
    } catch(e) {
      this.snackBar.open(`Failed to vote: ${e.message}`, 'Close');
    }
  }

}
