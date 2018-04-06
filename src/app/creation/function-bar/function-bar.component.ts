import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss']
})

export class FunctionBarComponent {
  @Input() sHeight: number;
  @Input() sWidth: number;
  @Output() newSize = new EventEmitter<[number, number]>();
  @Output() imgURL = new EventEmitter<string>();

  constructor() { }


  changeSize(newHeight: number, newWidth: number): void {
    this.newSize.emit([newHeight, newWidth]);
  }

  upload(value: string): void {
    this.imgURL.emit(value);
  }

}
