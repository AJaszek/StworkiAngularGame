import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from './api-connector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Stworki';

  sessionUser = null;

  constructor(private api: ApiConnectorService, public router: Router) { 
    if (this.sessionUser != null)
      this.router.navigate(['/game']);
    else
      this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    /*this.api.addOrderId("abcd").subscribe(
      (response: any) => {
        console.log(response);
        this.api.getData().subscribe(
          (response2: any) => {
          // do it here
          console.log(response2);
         },
          (err2) => console.log(err2)
          );
     
     },
      (err) => console.log(err)
      );
 ;
    
*/
     
  }




}
