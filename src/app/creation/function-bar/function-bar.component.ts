import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {CreationComponent} from '../creation.component';
import {FabricComponent} from '../fabric/fabric.component';


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
  public sHeight: number;
  public sWidth: number;
  public resizeCheck: boolean;
  public aspectIcon: string;
  public arToggle: boolean;
  public aspectRatio: number;
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


  constructor() { }


  changeSize(val: [number, number]): void {
    this.setSize(val);
    this.fabComp.setSize(val);
  }

  setSize([newHeight, newWidth]: [number, number]): void {
    this.sHeight = newHeight;
    this.sWidth = newWidth;
  }

  uploadFile() {
    const file = this.fileIn.nativeElement.files[0];
    this.fabComp.uploadFile(file, this.resizeCheck);
  }

// Won't be reached until CORS is figured out (button disabled)
  uploadUrl(): void {
    const url = this.urlIn.nativeElement.value;
    if (url === '') {
      // this.fab.upImg(this.sampleUrls[Math.floor(Math.random() * this.sampleUrls.length)], resize);
    } else {
      this.fabComp.upImg(url, this.resizeCheck);
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

  viewAll() {
    console.log(this.fabComp.getObjects());
  }

  selectAll() {
    this.fabComp.selectAll();
  }

  download() {
    this.fabComp.download();
  }

  publish() {
    this.fabComp.publish();
  }

  clear() {
    this.fabComp.clearCanvas();
  }

  toggleSize() {
    this.resizeCheck = !this.resizeCheck;
  }

  toggleAspectRatio() {
    if (this.arToggle) {
      this.arToggle = false;
      this.aspectIcon = 'lock_open';
    } else {
      this.arToggle = true;
      this.aspectIcon = 'lock';
      this.aspectRatio = this.sHeight / this.sWidth;
      console.log(this.aspectRatio);
    }
  }

  checkAR(axis: string, value: number) {
    if (axis === 'h' && this.arToggle === true) {
      this.sHeight = value;
      this.sWidth = this.sHeight / this.aspectRatio;
    } else if (axis === 'w' && this.arToggle === true) {
      this.sWidth = value;
      this.sHeight = this.sWidth * this.aspectRatio;
    }
  }


  initBar(par: CreationComponent, fab: FabricComponent, size: [number, number]): void {
    this.arToggle = false;
    this.aspectIcon = 'lock_open';
    this.fontSize = 72;
    this.fontAlign = 'center';
    this.resizeCheck = true;
    this.parent = par;
    this.fabComp = fab;
    this.setSize(size);
  }



}
