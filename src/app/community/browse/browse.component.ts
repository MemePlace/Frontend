import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  constructor() { }

  user1 = {un: 'shining777', height: '300', img: 'https://material.angular.io/assets/img/examples/shiba2.jpg'};
  user2 = {un: 'dante888', height: '300', img: 'http://i0.kym-cdn.com/photos/images/original/001/217/729/f9a.jpg'};
  user3 = {un: 'step7750', height: '300', img: 'http://i0.kym-cdn.com/entries/icons/original/000/025/224/bitconnect.jpg'};
  user4 = {un: 'clayton123', height: '300', img: 'https://fthmb.tqn.com/onZS-nRlttC_o-4JSQEXImdfL3E=/768x0/filters:no_upscale()/success-56a9fd1f3df78cf772abee09.jpg'};
  user5 = {un: 'dave--2', height: '300', img: 'http://i0.kym-cdn.com/entries/icons/original/000/021/353/6ec4b66c67510dc2734cf478fc033bdc.jpg'};
  user6 = {un: 'sam10101', height: '300', img: 'https://i.ytimg.com/vi/XAQmlzsmOY4/maxresdefault.jpg'};
  user7 = {un: 'dante888', height: '300', img: 'https://imgs.xkcd.com/comics/exploits_of_a_mom.png'};
  user8 = {un: 'dante888', height: '300', img: 'http://i0.kym-cdn.com/photos/images/original/001/224/694/300'};

  users = [this.user1, this.user2, this.user3, this.user4, this.user5, this.user6, this.user7, this.user8];

  ngOnInit() {
  }

  get screenWidth(): number {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  get isMobile(): boolean {
    return this.screenWidth <= 1000;
  }

}
