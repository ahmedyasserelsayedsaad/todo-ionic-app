import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoDetPage } from './todo-det.page';

const routes: Routes = [
  {
    path: '',
    component: TodoDetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoDetPageRoutingModule {}
