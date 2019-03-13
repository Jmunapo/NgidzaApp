import { Component } from '@angular/core';
import { App, IonicPage, NavController, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RemoteProvider } from '../../providers/remote/remote';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'

})
export class WelcomePage {
  form: FormGroup;
  isReadyToSave: boolean;
  falsemsg: string;
  // @ViewChild(Nav) nav: Nav;

  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  private signinErrorString: string;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
    private remote: RemoteProvider,
    public viewCtrl: ViewController, public app: App) {

    this.form = formBuilder.group({
      user_name: ['', Validators.required],
      user_pass: ['', Validators.required]
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
    this.signinErrorString = "Error";

    this.falsemsg = "Welcome !";
  }

  signIn() {
    if (!this.form.valid) {
      let toast = this.toastCtrl.create({
        message: "Email and password both are required to Sign In.",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      return;
    }
    else {
      let loading = this.loadingCtrl.create({
        content: 'Signing in  wait...'
      });
      loading.present();
      setTimeout(() => {
        loading.dismiss();
        this.remote.login(this.account, 'login').subscribe((resp) => {
          // this.navCtrl.push(this.pages[0].component);
          console.log(resp);
        }, (err) => {
          console.log(err);
          this.navCtrl.setRoot('TabsPage');
          let toast = this.toastCtrl.create({
            message: this.falsemsg,//"opps ! some issues had occured please try again later !", //this.signinErrorString
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }, 2000);
    }
  }
  signup() {
    this.navCtrl.push('TabsPage');
  }
}
