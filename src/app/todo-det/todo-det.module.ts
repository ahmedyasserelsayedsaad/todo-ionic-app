import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoDetPageRoutingModule } from './todo-det-routing.module';

import { TodoDetPage } from './todo-det.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoDetPageRoutingModule,
    QRCodeModule
  ],
  declarations: [TodoDetPage]
})
export class TodoDetPageModule {}
