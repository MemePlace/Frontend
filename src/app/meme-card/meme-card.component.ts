import { Component, OnInit, Input } from '@angular/core';

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

  onClickUpVote() {
    this.voteCount -= this.voted; // negate a previous vote
    if (this.voted != 1) {
      this.voteCount++;
      this.voted = 1;
    } else {
      this.voted = 0;
    }
  }

  onClickDownVote() {
    this.voteCount -= this.voted; // negate a previous vote
    if (this.voted != -1) {
      this.voteCount--;
      this.voted = -1;
    } else {
      this.voted = 0;
    }
  }

}
