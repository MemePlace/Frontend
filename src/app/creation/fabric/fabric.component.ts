import {Component, ViewChild} from '@angular/core';
import 'fabric';
import {Canvas} from 'fabric/fabric-impl';
import {CreationComponent} from '../creation.component';

declare let fabric;

/* Credit to: https://stackoverflow.com/questions/35789498/new-typescript-1-8-4-build-error-build-property-result-does-not-exist-on-t */
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
  private parent: CreationComponent;

  private canvas: Canvas;
  public height: number; width: number;
  private zoomVal: number; scaledHeight: number; scaledWidth: number;


  constructor() { }

  initCanv(par: CreationComponent, h: number, w: number) {
    this.height = h;
    this.width = w;
    this.zoomVal = 1;
    this.scaledHeight = h;
    this.scaledWidth = w;
    this.parent = par;
    this.canvas = new fabric.Canvas('fabric', {
      backgroundColor: 'white',
      preserveObjectStacking: true
    });

    this.setSize([h, w]);

    this.canvas.on('selection:created', function(e) {
      console.log('created event happened: ' + e);
    });

    this.canvas.on('selection:updated', function(e) {
      console.log('update event happened: ' + e);
    });

    this.canvas.on('selection:cleared', function(e) {
      console.log('cleared event happened: ' + e);
    });
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
    console.log(this.scaledHeight + ' x ' + this.scaledWidth);
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
    console.log('reached');
    console.log(this.canvas.getObjects());
    this.canvas.getObjects();
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
    const setSize = ([height, width]: [number, number]) => (this.parent.setSize([height, width]));

    console.log('deep');
    console.log(file);

    const reader = new FileReader();
    reader.onload = function (event: FileReaderEvent) {
      const imgObj = new Image();
      console.log(event);
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        const image = new fabric.Image(imgObj);
        if (resize) {
          setSize([image.height, image.width]);
        }
        add(image);
      };
    };
    reader.readAsDataURL(file);
  }


  upImg(targeturl: string, resize: boolean) {
    const add = (obj: fabric.Object) => (this.canvas.add(obj));
    const setSize = ([height, width]: [number, number]) => (this.parent.setSize([height, width]));
// TODO: Hadle bad URL's and other failures
    fabric.util.loadImage(targeturl, function (oImg, err) {
      if (err) {
        alert('Better error handling needed');
        throw new Error('Failed Image Load');
      } else {
        console.log('not an err');
        const image = new fabric.Image(oImg);
        if (resize) {
          setSize([image.height, image.width]);
        }
        add(image);
      }
    }, { crossOrigin: 'anonymous' });
  }


  addTxt(bold: boolean, italic: boolean, underline: boolean) {
    const newTxt = new fabric.Textbox('New Text');
    if (bold) {
      newTxt.set('fontWeight', 'bold');
    }
    if (italic) {
      newTxt.set('fontStyle', 'italic');
    }



    this.canvas.add(newTxt);
    this.canvas.centerObject(newTxt);
    this.canvas.requestRenderAll();
  }

  delete() {
    let obj: fabric.Object;
    obj = this.canvas.getActiveObject();
    if (obj) {
      this.canvas.remove(obj);
    }
  }

  clearCanvas() {
    this.canvas.clear();
  }

  toJSON() {
    console.log(JSON.stringify(this.canvas));
  }

}
