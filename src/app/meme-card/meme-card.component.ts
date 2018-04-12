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
  @Input() memeId: number;

  imageLink: string= "data:image/png;base64,ffff";  // ensures no null request being sent
  username: string;
  totalVote = 0;
  myVote = 0;

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    this.memeService.getMemeDetails(this.memeId).then((meme) => {
      this.imageLink = meme.link;
      this.username = meme.creator["username"];
      console.log(this.imageLink);
      this.totalVote = meme.totalVote;
      if (meme.myVote) {
        this.myVote =  meme.myVote["diff"];
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
    if (this.myVote === 1){
      this.memeService.deleteMemeVote(this.memeId).then((value) => {
        this.myVote = value;
        this.totalVote = this.totalVote-1;
      })
    }else{
      this.memeService.upvoteMeme(this.memeId).then((memeVote) => {
        if (this.myVote !== 0) {
          this.totalVote = this.totalVote+2;
        }else{
          this.totalVote = this.totalVote+1;
        }
        this.myVote = memeVote.diff;
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

  onClickDownVote() {
    if (this.myVote === -1) {
      this.memeService.deleteMemeVote(this.memeId).then((value) => {
        this.myVote = 0;
        this.totalVote = this.totalVote+1;
      })
    }else{
      this.memeService.downvoteMeme(this.memeId).then((memeVote) => {
        if (this.myVote !== 0) {
          this.totalVote = this.totalVote-2;
        }else{
          this.totalVote = this.totalVote-1;
        }
        this.myVote = memeVote.diff;
      }).catch((err) => {
        console.log(err.toString());
      });
    }
  }

}
