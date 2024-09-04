import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodosService } from '../services/todos.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-todo-det',
  templateUrl: './todo-det.page.html',
  styleUrls: ['./todo-det.page.scss'],
})
export class TodoDetPage implements OnInit, OnDestroy {
  id: any;
  todoDET: any;
  data: any;
  scannerResult: any;
  constructor(private router: ActivatedRoute, private todosSer: TodosService) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    console.log('Todo ID:', this.id);
    if (this.id) {
      this.getOneTodo();
    } else {
      console.error('Todo ID is missing');
    }
  }
  ngOnDestroy(): void {
    this.stopScan();
    this.getOneTodo();
  }
  getOneTodo() {
    this.todosSer.oneToDo(this.id).subscribe(
      (res: any) => {
        this.todoDET = res;
        console.log('Todo Details:', res);
      },
      (error: any) => {
        console.error('Error todo details:', error);
      }
    );
  }

  generateQrData() {
    this.data = {
      id: this.todoDET._id,
      image: `https://todo.iraqsapp.com/images/${this.todoDET.image}`,
      title: this.todoDET.title,
      desc: this.todoDET.desc,
      status: this.todoDET.status,
      priority: this.todoDET.priority,
    };
    return JSON.stringify(this.data);
  }


  //sanner
  async checkPermission() {
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      return true;
    }

    if (status.denied) {
      BarcodeScanner.openAppSettings();
      return false;
    }

    return false;
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }

      await BarcodeScanner.hideBackground();

      const bodyElement = document.querySelector('body');
      if (bodyElement) {
        bodyElement.classList.add('scanner-active');
      }

      const result = await BarcodeScanner.startScan();
      console.log(result);

      if (result?.hasContent) {
        this.scannerResult = result.content;


        const qrresult = JSON.parse(this.scannerResult);
        this.todoDET = qrresult;

        BarcodeScanner.showBackground();
        if (bodyElement) {
          bodyElement.classList.remove('scanner-active');
        }

        console.log(this.todoDET);  // عرض التفاصيل المستخرجة في console
      }
    } catch (e: any) {
      console.log(e);
      this.stopScan();
      return;
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();

    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.classList.remove('scanner-active');
    }
  }


};



