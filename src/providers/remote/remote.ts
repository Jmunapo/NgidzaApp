import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RemoteProvider {

  TOKEN = `efbbefnefHBNSND265ev565r5vrv`;
  url: string = 'http://localhost/api/v1/';
  constructor(public http: HttpClient) {
    console.log('Hello RemoteProvider Provider');
  }

  login(cred: any, endpoint: string) {
    return this.http.post(`${this.url}${endpoint}`, cred);
  }

  signup(cred: any, endpoint: string) {
    return this.http.post(`${this.url}${endpoint}`, cred);
  }

  getData(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    reqOpts.headers = 'Authorization', 'Bearer ' + this.TOKEN;
    console.log(reqOpts);
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    return this.http.get(this.url + endpoint, reqOpts);
  }

}
