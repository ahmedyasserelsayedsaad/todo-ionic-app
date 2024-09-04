import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
profile:any;
  constructor(
    private userService: UsersService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.getProfile();
  }
getProfile(){
this.userService.userProfile().subscribe((res:any)=>{
  this.profile=res
  console.log(res);
  
},(error)=>{
  console.log(error);
  
}

)
}

todosPage(){
  this.navCtrl.navigateForward('/todos')
}
}
