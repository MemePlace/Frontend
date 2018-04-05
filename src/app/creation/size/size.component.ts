import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent {
  @Input() zoomVal: number;
  @Output() changeZoom = new EventEmitter<number>();

  onZoom(event: any) {
    this.changeZoom.emit(event.value);
  }


  constructor() { }

}
