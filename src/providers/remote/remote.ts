import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RemoteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RemoteProvider {
  url: string = 'https://example.com/api/v1/'
  constructor(public http: HttpClient) {
    console.log('Hello RemoteProvider Provider');
  }

  login(cred: any, endpoint: string) {
    return this.http.post(`${this.url}${endpoint}`, cred);
  }

  signup(cred: any, endpoint: string) {
    return this.http.post(`${this.url}${endpoint}`, cred);
  }

  getData(type: string, userId) {
    return this.http.get(`${this.url}${type}`, userId);
  }

}
