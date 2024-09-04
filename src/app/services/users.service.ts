import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://todo.iraqsapp.com';

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/auth/register`, data);
  }

  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, data);
  }

  userProfile() {
    let token = localStorage.getItem('access_token');
    return this.http.get('https://todo.iraqsapp.com/auth/profile',{
      headers:{
          'Authorization': `Bearer ${token}`
      }
    })
  }
  logout(): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>('https://todo.iraqsapp.com/auth/logout', {}, { headers });
  }
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    console.log('Token in getAuthHeaders:', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
  refreshToken(): Observable<any> {
  
    const refreshToken = localStorage.getItem('refresh_token'); 
    const params = new HttpParams().set('refreshToken', refreshToken||'');
    
    return this.http.get<any>(`${this.apiUrl}/auth/refresh-token`, { params });
  }
  updateToken(newToken: string) {
    localStorage.setItem('access_token', newToken);
  }

}

