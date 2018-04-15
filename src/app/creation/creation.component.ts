import {Component, OnInit, ViewChild } from '@angular/core';
import 'fabric';
import {MatAutocompleteSelectedEvent} from '@angular/material';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {
  @ViewChild('functs') functs;
  @ViewChild('fab') fab;

  public zoomVal: number;
  title: string;
  communityName: string;

  resetZoom() {
    this.zoomVal = 1;
    this.fab.resetZoom();
  }

  delete() {
    this.fab.delete();
  }

  constructor() {
    const paste = (file) => (this.fab.uploadFile(file, true));
    window.addEventListener('paste', function(e: ClipboardEvent) {
      paste(e.clipboardData.files[0]);
    });

    const myDel = () => (this.delete());
    document.addEventListener('keypress', function(e: KeyboardEvent) {
      if (document.activeElement.id === 'canvCont' && e.key === 'Delete') {
        myDel();
      }
    });
  }


  ngOnInit() {
    this.zoomVal = 1;
    const initSize = 500;
    this.fab.initCanv(this, this.functs, initSize, initSize);
    this.functs.initBar(this, this.fab, [initSize, initSize]);
  }

  onMouseWheel(event: MouseWheelEvent) {
    if (event.deltaY > 0) {
      this.zoomVal -= 0.10;
    } else if (event.deltaY < 0) {
      this.zoomVal += 0.10;
    }

    event.preventDefault();
    this.fab.setZoom(this.zoomVal);
  }

  onCommunitySelect(event: MatAutocompleteSelectedEvent) {
    this.communityName = event.option.value.name;

    console.log(event.option.value.name);
  }
}
