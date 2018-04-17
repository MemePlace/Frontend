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
  private parent: CreationComponent;
  private fabComp: FabricComponent;
  public fontSize: number;
  public fontAlign: string;
  public selected = 'Impact';
  public fontColour; // TODO: Implement font color UI

  // TODO: Not all fonts are loaded into FabricJS immediately, pre-loading is needed
  public fonts: Array<any> = [
    { name: 'Impact' },
    { name: 'Arial' },
    { name: 'Pacifico' },
    { name: 'Roboto' },
    { name: 'Lora' },
    { name: 'Croissant One' },
    { name: 'Architects Daughter' },
    { name: 'Emblema One' },
    { name: 'Graduate' },
    { name: 'Hammersmith One' },
    { name: 'Oswald' },
    { name: 'Oxygen' },
    { name: 'Krona One' },
    { name: 'Indie Flower' },
    { name: 'Courgette' },
    { name: 'Gruppo' },
    { name: 'Ranchers' }
    ];

  constructor(private snackBar: MatSnackBar) { }

  uploadFile() {
    const file = this.fileIn.nativeElement.files[0];
    this.fabComp.uploadImageFromFile(file);
  }

  uploadUrl(): void {
    const url = this.urlIn.nativeElement.value;
    if (url === '') {
      this.parent.err('Invalid URL');
    } else {
      this.fabComp.uploadImageFromExternalUrl(url);
    }
  }

  alignChange(e) {
    this.fontAlign = e.value;
  }

  addTxt(bold: boolean, italic: boolean, underline: boolean, font: string, size: number) {
    this.fabComp.addTxt(bold, italic, underline, font, size, this.fontAlign);
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

  initBar(par: CreationComponent, fab: FabricComponent): void {
    this.fontSize = 72;
    this.fontAlign = 'center';
    this.parent = par;
    this.fabComp = fab;
  }

  coming() {
    this.snackBar.open('This feature is coming soon!', 'Close');
  }
}
