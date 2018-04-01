import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-zoomslider',
  templateUrl: './zoomslider.component.html',
  styleUrls: ['./zoomslider.component.scss']
})
export class ZoomsliderComponent {
  @Input() zoomVal: number;
  @Output() changeZoom = new EventEmitter<number>();

  onZoom(event: any) {
    this.changeZoom.emit(event.value);
  }

  constructor() { }

}
