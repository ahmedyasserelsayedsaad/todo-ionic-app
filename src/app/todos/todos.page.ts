import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { TodosService } from '../services/todos.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { readTask } from '@ionic/pwa-elements/dist/types/stencil-public-runtime';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  todos: any = [];
  page: number = 1;
  activeChip: string = 'All';

  constructor(
    private navCtrl: NavController, 
    private todosSer: TodosService, 
    private actionsheet: ActionSheetController,
    private userService:UsersService) { }

  ngOnInit() {
    this.getTodos();
  }


  goProfile() {
    this.navCtrl.navigateForward('/profile')
    console.log('go to your profile');

  }



  addToDO() {
    this.navCtrl.navigateForward('/add-todo')
    console.log('go to your profile');

  }



  setActiveChip(chip: string) {
    this.activeChip = chip;

  }

  getTodos(event?: any) {
    this.todosSer.toDos(this.page).subscribe((res: any) => {
      console.log(res);
      for(let i=0;i<=res.length;i++){
        if (res[i]&&res[i].priority === "heigh") {
          res[i].status === 'inprogress';
        }
      }
    
      this.todos = [...this.todos, ...res.map((todo: any) => {
        todo.image = `https://todo.iraqsapp.com/images/${todo.image}`;
        return todo;
      })];

      if (event) {
        event.target.complete();
      }
    });
  }



  loadMore(ev: any) {

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
      this.getTodos(ev)
    }, 1000);
  }

  refresh(e: any) {
    this.todos = [];

    setTimeout(() => {
      e.target.complete();
      this.getTodos(e);
    }, 2000);

  }

  async action(todo: any) {
    let sheet = await this.actionsheet.create({
      header: "choose mode",
      mode: 'ios',
      buttons: [
        {
          icon: "trash",
          text: 'do want to delete this item',
          handler: () => {
            console.log('deleted');
            this.deleteToDo(todo._id)

          },
        },
        {
          icon: "create",
          text: 'do want to edit this item',
          handler: () => {
            console.log('edited');

          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await sheet.present();
  }


  deleteToDo(id: any) {
    this.todosSer.deleteTodo(id).subscribe((res: any) => {
      console.log('Todo deleted successfully', res);
      this.todos = this.todos.filter((todo: any) => todo._id !== id);
    })
  }


  logOut(){
    this.userService.logout().subscribe(()=>{
      localStorage.removeItem('access_token');
      return this.navCtrl.navigateForward('/login') 
    })
  }
}
