import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { RemoteProvider } from '../../providers/remote/remote';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  account: { name: string, email: string, password: string, number: string, myDate: string, gender: string } = {
    name: '',
    email: '',
    password: '',
    number: '',
    myDate: 'MM/DD/YYYY',
    gender: 'm'
  };

  // Our translated text strings
  private signupErrorString: string;
  constructor(public navCtrl: NavController,
    private remote: RemoteProvider,
    public toastCtrl: ToastController, public translateService: TranslateService) {
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.remote.signup(this.account, 'signup').subscribe((resp) => {
      this.navCtrl.push('WelcomePage');
    }, (err) => {
      this.navCtrl.push('WelcomePage');
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: "You have successfully signed up . Please sign in .",//this.signupErrorString
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  welcomePage() {
    this.navCtrl.push('WelcomePage');
  }
}
