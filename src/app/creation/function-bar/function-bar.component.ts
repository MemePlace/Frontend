import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss']
})

export class FunctionBarComponent {
  @Input() sHeight: number;
  @Input() sWidth: number;
  @Output() changeSize = new EventEmitter<any>();

  constructor() { }

  subSize(event: any) {
    this.changeSize.emit('tester');
  }

  checkIt(){
    alert(this.sHeight + " x " + this.sWidth);
  }

}
