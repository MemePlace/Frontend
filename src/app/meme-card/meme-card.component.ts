import {Component, Input, OnInit} from '@angular/core';
import {Utils} from '../utils';
import { MemeService } from '../api/meme.service';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})
export class MemeCardComponent implements OnInit {
  @Input() imageHeight: number;
  @Input() username: string;
  @Input() image: string;
  @Input() memeId: string;

  voteCount = 0;
  voted = 0;

  constructor(private memeService: MemeService) { }

  ngOnInit() {
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

  onClickUpVote() {
    //this.voteCount -= this.voted; // negate a previous vote

    const result = this.memeService.upvoteMeme(parseInt(this.memeId));

    this.voted = result['diff'];
    this.voteCount = result['diff'];

    // if (this.voted !== 1) {
    //   this.voteCount++;
    //   this.voted = 1;
    // } else {
    //   this.voted = 0;
    // }
  }

  onClickDownVote() {
    //this.voteCount -= this.voted; // negate a previous vote

    const result = this.memeService.downvoteMeme(parseInt(this.memeId));

    console.log(result);

    this.voted = result['diff'];
    this.voteCount = result['diff'];

    // if (this.voted !== -1) {
    //   this.voteCount--;
    //   this.voted = -1;
    // } else {
    //   this.voted = 0;
    // }
  }

}
