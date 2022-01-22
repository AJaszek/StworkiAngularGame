import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../api-connector.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private api: ApiConnectorService, public router: Router) { 
    
    /*api.getCreatureData().subscribe(
      (response: any) => {
        console.log(response);
        
      },
      (err: any) => console.log(err)
    );*/
  }

  ngOnInit(): void {

  }


  logout() {
    this.api.logout().subscribe(
      (response: any) => {
        //console.log(response);
        this.router.navigate(['/login']);
      },
      (err: any) => console.log(err)
      );
    
  }

}
