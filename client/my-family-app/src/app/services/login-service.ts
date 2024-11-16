import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    private apiUrl = 'http://localhost:8090/api/create-account'; // Set your API URL

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<any> {
        //const accountData = { username, password };
        const loginData = {
            "firstName": "",
            "middleName": "middleName",
            "lastName": "sdfsdfs",
            "nickName": "j",
            "birthday": "2000-10-10",
            "age": 89,
            "password": "",
            "email": "",
            "address": "1234 N road CA"
        }
        return this.http.post(this.apiUrl, loginData);
    }
}
