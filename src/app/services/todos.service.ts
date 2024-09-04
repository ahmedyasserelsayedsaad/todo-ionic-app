import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private apiUrl = 'https://todo.iraqsapp.com/todos';
  private gettodosApi = 'https://todo.iraqsapp.com/todos';
  constructor(private http: HttpClient, private userser: UsersService) { }

  addToDo(todo: any): Observable<any> {
    const headers = this.userser.getAuthHeaders();
    console.log('Headers:', headers);
    return this.http.post<any>(this.apiUrl, todo, { headers })
  }

  async uploadImage(imagePath: string): Promise<any> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      
    });
    const response = await fetch(imagePath);
    const blob = await response.blob();

    const uploadData = new FormData();
    uploadData.append('image', blob, 'image.png'); 

    return this.http.post(  'https://todo.iraqsapp.com/upload/image', uploadData, { headers }).toPromise();
  }
  toDos(page:number=1): Observable<any>  {
    const headers = this.userser.getAuthHeaders();
    console.log('Headers:', headers);
    const url = `${this.gettodosApi}?page=${page}`;
    return this.http.get<any>(url, { headers }).pipe(take(1));
  }

  oneToDo(id:any): Observable<any>  {
    const headers = this.userser.getAuthHeaders();
    console.log('Headers:', headers);
    const url = `https://todo.iraqsapp.com/todos/${id}`;
    return this.http.get<any>(url, { headers });
  }

  deleteTodo(id:any): Observable<any>  {
    const headers = this.userser.getAuthHeaders();
    console.log('Headers:', headers);
    const url = `https://todo.iraqsapp.com/todos/${id}`;
    return this.http.delete<any>(url, { headers });
  }
}
