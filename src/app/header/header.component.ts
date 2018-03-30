import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Utils} from '../utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle: EventEmitter<null> = new EventEmitter();
  private utils = Utils;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.sidebarToggle.emit();
  }
}
