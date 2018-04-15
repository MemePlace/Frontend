import {Component, ViewChild} from '@angular/core';
import 'fabric';
import {CreationComponent} from '../creation.component';
import {FunctionBarComponent} from '../function-bar/function-bar.component';
import {ImgurService} from '../imgur.service';

declare let fabric;

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'app-fabric',
  templateUrl: './fabric.component.html',
  styleUrls: ['./fabric.component.scss']
})

export class FabricComponent {
  @ViewChild('canvCont') canvCont;
  private parent: CreationComponent;

  private canvas;
  private functComp: FunctionBarComponent;
  public height: number; width: number;
  private zoomVal: number; scaledHeight: number; scaledWidth: number;


  constructor(private imgurService: ImgurService) { }

  initCanv(par: CreationComponent, funct: FunctionBarComponent, h: number, w: number) {
    this.height = h;
    this.width = w;
    this.zoomVal = 1;
    this.scaledHeight = h;
    this.scaledWidth = w;
    this.parent = par;
    this.functComp = funct;

    this.canvas = new fabric.Canvas('fabric', {
      backgroundColor: 'white',
      preserveObjectStacking: true
    });

    this.setSize([h, w]);
  }




  setSize([nheight, nwidth]: [number, number]) {
    this.height = nheight;
    this.width = nwidth;
    this.scaledHeight = nheight * this.zoomVal;
    this.scaledWidth = nwidth * this.zoomVal;
    this.adjustSize([this.scaledHeight, this.scaledWidth]);
  }

// This sets the display size, zooming
  adjustSize([h, w]: [number, number]) {
    this.canvas.setHeight(h);
    this.canvas.setWidth(w);
  }



  setZoom(val) {
    this.zoomVal = val;
    this.scaledHeight = this.zoomVal * this.height;
    this.scaledWidth = this.zoomVal * this.width;
    this.adjustSize([this.scaledHeight, this.scaledWidth]);
    this.canvas.setZoom(this.zoomVal);
  }

  resetZoom() {
    this.setZoom(1);
  }

  moveFront() {
    this.canvas.bringToFront(this.canvas.getActiveObject());
  }

  moveForward() {
    this.canvas.bringForward(this.canvas.getActiveObject());
  }

  moveBackward() {
    this.canvas.sendBackwards(this.canvas.getActiveObject());
  }

  moveBottom() {
    this.canvas.sendToBack(this.canvas.getActiveObject());
  }

  getObjects() {
    console.log(this.canvas.getObjects());
  }

/* CREDIT TO https://github.com/michaeljcalkins/angular-fabric/blob/master/assets/fabric.js */
  download() {
    const pic = this.canvas.toDataURL({
      height: this.height,
      width: this.width
    });

    const data = pic.replace('data:image/png;base64,', '');
    const blob = this.b64toBlob(data, 'image/png');

    this.canvas.discardActiveObject();
    this.resetZoom();

    const link = document.createElement('a');
    link.download = 'myCanvas.png';
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  /* CREDIT TO https://github.com/michaeljcalkins/angular-fabric/blob/master/assets/fabric.js */
  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    const sliceSize = 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }


  uploadFile(file, resize) {
    const add = (obj: fabric.Object) => (this.canvas.add(obj));
    const setSize = (val: [number, number]) => (this.setSize(val));
    const setFBSize = (val: [number, number]) => (this.functComp.setSize(val));

    const reader = new FileReader();
    reader.onload = function (event: FileReaderEvent) {
      const imgObj = new Image();
      console.log(event);
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        const image = new fabric.Image(imgObj);
        if (resize) {
          setSize([image.height, image.width]);
          setFBSize([image.height, image.width]);
        }
        add(image);
      };
    };
    reader.readAsDataURL(file);
  }

// TODO: Deal with CORS, until then this functionality is disabled
  upImg(targeturl: string, resize: boolean) {
    const add = (obj: fabric.Object) => (this.canvas.add(obj));
    const setSize = (val: [number, number]) => (this.setSize(val));
    const setFBSize = (val: [number, number]) => (this.functComp.setSize(val));
    // TODO: Handle bad URL's and other failures
    fabric.util.loadImage(targeturl, function (oImg, err) {
      if (err) {
        alert('Better error handling needed');
        throw new Error('Failed Image Load');
      } else {
        const image = new fabric.Image(oImg);
        if (resize) {
          setSize([image.height, image.width]);
          setFBSize([image.height, image.width]);
        }
        add(image);
      }
    }, { crossOrigin: 'anonymous' });
  }


  addTxt(bold: boolean, italic: boolean, underline: boolean, font: string, size: number, align: string) {
    const fontWeight = bold ? 'bold' : 'normal';
    const fontStyle = italic ? 'italic' : 'normal';

    const newTxt = new fabric.Textbox('New Text', {
      fontSize: size,
      fontFamily: font,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: align,
      underline: underline,
      fill: '#fff',
      stroke: '#000',
      _strokeWidth: 2,
    });


    this.canvas.add(newTxt);
    this.canvas.centerObject(newTxt);
    this.canvas.requestRenderAll();
  }

  delete() {
    const sel = this.canvas.getActiveObjects();
    if (sel) {
      this.canvas.remove(...sel);
    }
    this.canvas.discardActiveObject().renderAll();
  }

  selectAll() {
    this.canvas.discardActiveObject();
    const selection = new fabric.ActiveSelection(this.canvas.getObjects(), {
      canvas: this.canvas
    });
    this.canvas.setActiveObject(selection).renderAll();
    console.log(this.canvCont.nativeElement);
    this.canvCont.nativeElement.focus();
  }

  clearCanvas() {
    this.canvas.clear();
  }

  toJSON(): string {
    console.log(JSON.stringify(this.canvas));
    return JSON.stringify(this.canvas);
  }

  publish() {
    this.parent.resetZoom();
    const pic = this.canvas.toDataURL({
      height: this.height,
      width: this.width
    });
    const data = pic.replace('data:image/png;base64,', '');
    const test  = this.imgurService.uploadImg(data);
    test.then((val) => console.log(val));
  }

}
