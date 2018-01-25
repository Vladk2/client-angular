import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  // get user info
  get() {
    return this.http.get('http://localhost:8080/api/users/');
  }

  // update user's profile
  update(data) {
    return this.http.put('http://localhost:8080/api/users/', data);
  }

  // update user's password
  updatePassword(password) {
    return this.http.post('http://localhost:8080/api/users/password', password);
  }

  // remove account
  destroy() {
    return this.http.delete('http://localhost:8080/api/users/');
  }
}
