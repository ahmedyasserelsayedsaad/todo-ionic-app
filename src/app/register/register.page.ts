import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AlertController, NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  form: FormGroup;

  constructor(
    private userService: UsersService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) { 

    this.form = new FormGroup({
      displayName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      experienceYears: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }
 

register() {
  if (this.form.valid) {
    console.log('Years of Experience:', this.form.value.experienceYears);
    this.userService.register(this.form.value).subscribe(
      (res: any) => {
        console.log(res);
        
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          this.navCtrl.navigateForward('/login');
        }
      },
      (error) => {
        console.log('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    );
  } else {
    alert('Please fill in all required fields correctly.');
  }
}






}
