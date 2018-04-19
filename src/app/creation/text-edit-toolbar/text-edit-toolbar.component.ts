import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {fabric} from 'fabric';

@Component({
  selector: 'app-text-edit-toolbar',
  templateUrl: './text-edit-toolbar.component.html',
  styleUrls: ['./text-edit-toolbar.component.scss']
})
export class TextEditToolbarComponent implements OnInit {
  canvas_;
  hidden = true;

  @HostBinding('style.bottom.px') bottom = 0;
  @HostBinding('style.left.px') left = 0;

  @Input() set canvas(v) {
    this.canvas_ = v;
    this.bindEvents();
  }

  get canvas() {
    return this.canvas_;
  }

  constructor() { }

  ngOnInit() {
  }

  bindEvents() {
    this.canvas.on('text:editing:entered', () => {
      const object = this.canvas.getActiveObject();

      console.log('editing entered');
      console.log(this.canvas.getActiveObject());
      this.bottom = this.canvas.height - object.top + 20;
      this.left = object.left + (object.width / 2);
      this.hidden = false;
    });

    this.canvas.on('text:editing:exited', () => {
      console.log('editing exited');
      this.hidden = true;
    });
  }
}
