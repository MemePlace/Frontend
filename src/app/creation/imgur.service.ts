import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

export interface MemeInfo {
  link: string;
  deleteHash: string;
  id: string;
  width: number;
  height: number;
}

@Injectable()
export class ImgurService {
  private url = 'https://api.imgur.com/3/';
  private clientID = '2e63301babbf33a';



  constructor(private http: HttpClient) { }

  uploadImg(dataURL: string): Promise<MemeInfo> {
    // TODO: Get the community that the meme is going into
    const httpHeader = new HttpHeaders({
      'Authorization' : 'Client-ID ' + this.clientID
    });
    const options = {'headers': httpHeader};
    const body = {
      image: dataURL
    };

    return this.http.post((this.url + 'image'), body, options).toPromise()
      .catch((err) => alert ('Upload failed!')) // TODO: Make snackbar
      .then((res: any) => res.data);
  }

}
