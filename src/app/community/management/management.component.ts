import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  titleText: string;
  descriptionText: string;
  sidebarText: string;
  NSFW_checked: boolean;

  constructor() { }

  ngOnInit() {
  }

  onUpdateCommunity() {

  }


}
