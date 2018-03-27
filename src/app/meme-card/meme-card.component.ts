import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})

export class MemeCardComponent implements OnInit {
  @Input() imageHeight: number;
  @Input() username: string;
  @Input() image: string;

  voteCount = 0;
  voted = 0;

  constructor() { }

  ngOnInit() {
  }

  get screenWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  get isMobile(): boolean {
    return this.screenWidth <= 1000;
  }

  maxCardWidth(height: number): number {
    if (this.isMobile) {
      return this.screenWidth * 0.95;
    } else {
      return Math.min(this.screenWidth * 0.95, height * 2.5);
    }
  }

  minCardWidth(height: number): number {
    if (this.isMobile) {
      return this.screenWidth * 0.95;
    } else {
      return 0;
    }
  }

  checkHeight(height: number): number {
    if (this.isMobile) {
      return null;
    } else {
      return height;
    }
  }

  onClickUpVote() {
    this.voteCount -= this.voted; // negate a previous vote

    if (this.voted !== 1) {
      this.voteCount++;
      this.voted = 1;
    } else {
      this.voted = 0;
    }
  }

  onClickDownVote() {
    this.voteCount -= this.voted; // negate a previous vote

    if (this.voted !== -1) {
      this.voteCount--;
      this.voted = -1;
    } else {
      this.voted = 0;
    }
  }

}
