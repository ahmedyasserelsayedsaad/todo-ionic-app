import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {
  imgSrc: string | undefined;
  title: any;
  description: any;
  priority: any;
  dueDate: any;
  imgr: any;
  constructor(private todoService: TodosService, private toastCtrl: ToastController) { }

  ngOnInit() { }

  async takephoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
        quality: 60,
      });

      const imagePath = image.webPath;
      this.imgSrc = imagePath;

      console.log(' image dataUrl:', this.imgSrc);
      console.log(' image webPath:', imagePath);
      if (imagePath) {
        try {

          const res = await this.todoService.uploadImage(imagePath);
          console.log('Image uploaded successfully:', res);
          this.imgr = res.image;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      } else {
        console.error('Image path is undefined.');
      }

    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  async addTask() {

    if (!this.title || !this.description || !this.dueDate) {
      const toast = await this.toastCtrl.create({
        message: 'Please fill all fields',
        mode: "ios",
        duration: 1500,
      });
      await toast.present();
      return;
    }

    try {

      const todoData = {
        image: this.imgr,
        title: this.title,
        desc: this.description,
        priority: this.priority,
        dueDate: this.dueDate
      };

      const response = await this.todoService.addToDo(todoData).toPromise();
      console.log('Todo added successfully:', response);

      const addToast = await this.toastCtrl.create({
        message: 'Todo added successfully',
        mode: "ios",
        duration: 1500,
      });
      await addToast.present();

      this.imgSrc = undefined;
      this.title = '';
      this.description = '';
      this.priority = 'medium';
      this.dueDate = '';
    }
    catch (error) {
      console.log('Error adding todo:', error);
      const failToast = await this.toastCtrl.create({
        message: 'Failed to add todo',
        mode: "ios",
        duration: 1500,
      });
      await failToast.present();
    }
  }




}