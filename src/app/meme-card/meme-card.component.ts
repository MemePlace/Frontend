import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meme-card',
  templateUrl: './meme-card.component.html',
  styleUrls: ['./meme-card.component.scss']
})

export class MemeCardComponent implements OnInit {
  @Input() cardHeight: string;
  @Input() cardWidth: string;
  @Input() username: string;

  // give default value to height and width.

  // if cardHeight is > 0, then change CSS

  // if cardWidth is > 0, then change CSS

  voteCount = 0;
  voted = false;

  // default style
  cardStyle = {
    'min-width': '100px',
    'max-width': '400px',
    'max-height': '370px',
    'min-height': '370px',
    'display': 'block',
    'position': 'relative',
    'padding': '10px',
    'margin': '5px',
  };

  constructor() { }

  ngOnInit() {
    // y'all need to give correct input w/ correct format. Thanks!
    this.cardStyle = {
      'min-width': '100px',
      'max-width': this.cardWidth,
      'max-height': this.cardHeight,
      'min-height': this.cardHeight,
      'display': 'block',
      'position': 'relative',
      'padding': '10px',
      'margin': '5px',
    };
  }


  onClickUpVote() {
    this.voteCount++;
    console.log(this.voteCount);
  }

  onClickDownVote() {
    this.voteCount--;
    console.log(this.voteCount);
  }

}
