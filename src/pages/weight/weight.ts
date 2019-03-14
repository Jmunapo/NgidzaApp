import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RemoteProvider } from '../../providers/remote/remote';

@IonicPage()
@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage {

  userInfo: any = {
    name: 'Joe Munapo',
    pationtId: 125,
    stage: 55
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private remote: RemoteProvider
  ) {

  }

  ionViewDidLoad() {
    this.remote.getData('weight', { id: 155 }).subscribe((resp: any) => {
      console.log(resp);
      if (resp) {
        this.userInfo = resp;
      }
    }, error => {
      console.log(error);
    })
    console.log('Joe');
  }

}
