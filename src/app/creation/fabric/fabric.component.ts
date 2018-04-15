import {Component, ViewChild} from '@angular/core';
import 'fabric';
import {CreationComponent} from '../creation.component';
import {FunctionBarComponent} from '../function-bar/function-bar.component';
import {ImgurService} from '../imgur.service';
import {MatSnackBar} from '@angular/material';
import {MemeService} from '../../api/meme.service';

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

  private badURL = 'https://fthmb.tqn.com/i5PTJXJQGb5Kg64f2T1mMDt2ULg=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/ggg-580734603df78cbc28f46d37.PNG';

  constructor(private imgurService: ImgurService,
              private memeService: MemeService,
              private snackBar: MatSnackBar) { }

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
    if (!(file)) { return; }
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

  upImg(targeturl: string, resize: boolean) {
    this.imgurService.uploadImg(targeturl)
      .then((val) => this.upURL(val.link, resize))
      .catch((err) => this.parent.err(err.toString()));
  }


  upURL(url, resize: boolean){
    const add = (obj: fabric.Object) => {
      this.canvas.add(obj);
      this.canvas.renderAll();
    };
    const setSize = (val: [number, number]) => (this.setSize(val));
    const setFBSize = (val: [number, number]) => (this.functComp.setSize(val));
    // TODO: Handle bad URL's and other failures
    fabric.Image.fromURL(url, (oImg) => {
      if (resize) {
        setSize([oImg.height, oImg.width]);
        setFBSize([oImg.height, oImg.width]);
      }
      this.canvas.add(oImg);
    }, {crossOrigin: 'Anonymous'});
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
    const communityName = this.parent.communityName;

    if (!communityName) {
      this.snackBar.open('You must pick a community to post to!', 'Close');
      return;
    }

    const pic = this.canvas.toDataURL({
      height: this.height,
      width: this.width
    });

    const imageData = pic.replace('data:image/png;base64,', '');
    this.imgurService.uploadImg(imageData).then((response) => {
      return this.memeService.createMeme(this.parent.title, response.link, response.width, response.height, null, communityName);
    }).then((meme) => {
      this.snackBar.open('Successfully created meme!');
      this.parent.resetZoom();
      this.parent.title = '';
      this.parent.communityName = '';
    }).catch((err) => {
      this.snackBar.open(`Failed to create meme: ${err.message}`, 'Close');
    });
  }

}
