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

  totalVote = 0;
  voted = 0;

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    this.memeService.getMemeDetails(parseInt(this.memeId)).then((meme) => {
      this.totalVote = meme.totalVote;
      if (meme.myVote) {
        this.voted =  meme.myVote["diff"];
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

  onClickUpVote() {
    if (this.voted === 1){
      this.memeService.deleteMemeVote(parseInt(this.memeId)).then((value) => {
        this.voted = value;
        this.memeService.updateMemeVote(parseInt(this.memeId)).then((value) => {
          this.totalVote = value;
        });
      })
    }else{
      this.memeService.upvoteMeme(parseInt(this.memeId)).then((memeVote) => {
        this.voted = memeVote.diff;
        this.memeService.updateMemeVote(parseInt(this.memeId)).then((value) => {
          this.totalVote = value;
        });
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

  onClickDownVote() {
    if (this.voted === -1) {
      this.memeService.deleteMemeVote(parseInt(this.memeId)).then((value) => {
        this.voted = 0;
        this.memeService.updateMemeVote(parseInt(this.memeId)).then((value) => {
          this.totalVote = value;
        });
      })
    }else{
      this.memeService.downvoteMeme(parseInt(this.memeId)).then((memeVote) => {
        this.voted = memeVote.diff;
        this.memeService.updateMemeVote(parseInt(this.memeId)).then((value) => {
          this.totalVote = value;
        });
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

}
