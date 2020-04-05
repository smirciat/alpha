import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    static parameters = [HttpClient];
    constructor(http) {
        this.http = http;
    }

    query() {
        return this.http.get('/api/users/');
    }
    get(user = {id: 'me'}) {
        return this.http.get(`/api/users/${user.id || user._id}`);
    }
    create(user) {
        return this.http.post('/api/users/', user);
    }
    changePassword(user, oldPassword, newPassword) {
        return this.http.put(`/api/users/${user.id || user._id}/password`, {oldPassword, newPassword});
    }
    remove(user) {
        return this.http.delete(`/api/users/${user.id || user._id}`)
            .pipe(map(() => user));
    }
}
