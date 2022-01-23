import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from './api-connector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Stworki';

  constructor(private api: ApiConnectorService, public router: Router) { }

  ngOnInit(): void {
    //this.router.navigate(['/game']);
    this.api.checkSession().subscribe(
      (response: any) => {
        if (response == "logged") {
          this.router.navigate(['/game']);
        }
        else{
          this.router.navigate(['/login']);
        }
      },
      (err) => console.log(err)
    );


  }





}
