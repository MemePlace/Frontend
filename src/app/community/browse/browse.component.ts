import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  constructor() { }

  user1 = {un: 'shining777', width: '400px', height: '370px'};
  user2 = {un: 'dante888', width: '600px', height: '370px'};
  user3 = {un: 'step7750', width: '300px', height: '370px'};
  user4 = {un: 'clayton123', width: '300px', height: '370px'};
  user5 = {un: 'dave--2', width: '300px', height: '370px'};
  user6 = {un: 'sam10101', width: '300px', height: '370px'};

  users = [this.user1, this.user2, this.user3, this.user4, this.user5, this.user6];

  ngOnInit() {
  }

}
