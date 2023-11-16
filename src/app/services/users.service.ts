import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseApiUrl + '/api/User');
  }

  addUser(addUserRequest: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/User', addUserRequest);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.baseApiUrl + '/api/User/' + id);
  }

  updateUser(id: number, updateUserRequest: User) {
    return this.http.put(
      this.baseApiUrl + '/api/User/' + id,
      updateUserRequest
    );
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseApiUrl + '/api/User/' + id);
  }
}
