import {Component, Input, OnInit} from '@angular/core';
import {CommunityService} from '../../api/community.service';

@Component({
  selector: 'app-community-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input('communityName') communityName: string;

  constructor(private communityService: CommunityService) { }

  ngOnInit() {

  }

}
