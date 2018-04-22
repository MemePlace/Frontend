import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {CreationComponent} from '../creation.component';
import {FabricComponent} from '../fabric/fabric.component';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-function-bar',
  templateUrl: './function-bar.component.html',
  styleUrls: ['./function-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class FunctionBarComponent {
  @ViewChild('imgURL') urlIn;
  @ViewChild('fileIn') fileIn;
  @ViewChild('fontOption') fontOption;
  @ViewChild('fontAlignTG') fontAlignTG;
  public parent: CreationComponent;
  public fabComp: FabricComponent;

  constructor(private snackBar: MatSnackBar) { }

  initBar(par: CreationComponent, fab: FabricComponent): void {
    this.parent = par;
    this.fabComp = fab;
  }

  uploadFile() {
    const file = this.fileIn.nativeElement.files[0];
    this.fabComp.uploadImageFromFile(file);
  }

  uploadUrl(): void {
    const url = this.urlIn.nativeElement.value;
    if (url === '') {
      this.snackBar.open('Invalid URL', 'Close');
    } else {
      this.fabComp.uploadImageFromExternalUrl(url);
    }
  }

  moveObj(val: number) {
    if (val === 2) {
      this.fabComp.moveFront();
    } else if (val === 1) {
      this.fabComp.moveForward();
    } else if (val === -1) {
      this.fabComp.moveBackward();
    } else if (val === -2) {
      this.fabComp.moveBottom();
    }
  }

  selectAll() {
    this.fabComp.selectAll();
  }

  download() {
    this.fabComp.download();
  }

  clear() {
    this.fabComp.clearCanvas();
  }

  coming() {
    this.snackBar.open('This feature is coming soon!', 'Close');
  }
}
