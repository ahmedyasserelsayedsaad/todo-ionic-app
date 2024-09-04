import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userData:any = {
    name: '',
    phoneNumber: '',
    password: '',
    yearsOfExperience: null,
    experienceLevel: '',
    address: ''
  };
  constructor(
    private userService: UsersService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}


  register(){
    this.navCtrl.navigateForward('/register')
  }

}
