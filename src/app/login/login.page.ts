import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('passwordInput', { static: false }) passwordInput: ElementRef | undefined;

  form: FormGroup;

  constructor(
    private userService: UsersService,
    private navCtrl: NavController) {

    this.form = new FormGroup({

      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),

    });

  }

  ngOnInit() {
  }



  login() {
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe((res:any)=>{
        console.log(res);
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          this.navCtrl.navigateForward('/profile');
        }
        
      },
      (error) => {
        console.log('Registration failed:', error);
        alert('loginig failed. Please try again.');
      });
}
else {
  alert('Please fill in all required fields correctly.');
}
  }

}
