import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {





  private url = "http://arlax.mygamesonline.org/testapi2.php/";


  constructor(private http: HttpClient) {
    //this.getData();
  }

  getData(): Observable<any> {
    return this.http.get(this.url + "testapi2.php");
    //return this.http.get("https://catfact.ninja/fact");
    //console.log(data);
  }

  addOrderId(data: any) {
    let tmp = {
      name: "data",
      name2: "abc"
    }
    let tmp2 = {
      title: "data",
      body: "abc",
      userId: 1
    }

    return this.http.post<any>(this.url + "testapi.php", tmp);
  }

  login(login: string, password: string) {
    let loginData = {
      login: login,
      password: password
    }
    return this.http.post<any>(this.url + "login", loginData);
  }
  register(login: string, password: string, creatureType: number, creatureName: string) {
    let registerData = {
      login: login,
      password: password,
      creatureType: creatureType,
      creatureName: creatureName
    }
    return this.http.post<any>(this.url + "register", registerData);
  }
  getCreatureData() {
    return this.http.get(this.url + "getCreatureData");
  }
  getAllCreatures() {
    return this.http.get(this.url + "getAllCreatures");
  }
  checkSession() {
    return this.http.get(this.url + "sessionCheck");
  }
  logout() {
    return this.http.get(this.url + "logout");
  }
  changeSleep(state: boolean) {

    let tmp;
    if (state) {
      tmp = {
        sleep: 1
      }
    }
    else {
      tmp = {
        sleep: 0
      }
    }
    return this.http.post<any>(this.url + "changeSleep", tmp);
  }
  creatureEat(type: number) {
    let tmp = {
      type: type
    }
    return this.http.post<any>(this.url + "eat", tmp);
  }
}
