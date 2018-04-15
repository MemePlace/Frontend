import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

export interface MemeInfo {
  link: string;
  deleteHash: string;
  id: string,
  width: number,
  height: number
}

@Injectable()
export class ImgurService {
  private url = 'https://api.imgur.com/3/image';
  private clientID = '2e63301babbf33a';

  constructor(private http: HttpClient) { }

  uploadImg(dataURL: string) {
    const httpHeader = new HttpHeaders({
      'Authorization' : 'Client-ID ' + this.clientID
    });
    const options = {'headers': httpHeader};
    const body = {
      image: dataURL
    };

    this.http.post(this.url, body, options).subscribe(res => {
      // TODO: Add this info the database
      console.log(res);
    });

  }

}
