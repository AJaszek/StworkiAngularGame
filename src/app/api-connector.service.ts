import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {

  private url = "http://arlax.mygamesonline.org/"; 


  constructor(private http: HttpClient) {
    //this.getData();
   }

  getData() : Observable<any> {
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
    const headerss = new Headers();
    headerss.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    //console.log(tmp);
    return this.http.post<any>(this.url + "testapi.php", tmp);
    //return this.http.post<any>("https://jsonplaceholder.typicode.com/posts", tmp2);
  }

}
