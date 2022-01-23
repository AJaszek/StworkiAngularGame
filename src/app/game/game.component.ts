import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../api-connector.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private api: ApiConnectorService, public router: Router, private elementRef: ElementRef) {

    api.getCreatureData().subscribe(
      (response: any) => {
        console.log(response);
        
      },
      (err: any) => console.log(err)
    );
  }

  ngOnInit(): void {
    console.log(window.innerWidth);
  }

  ngAfterViewInit() {
    (document.querySelector('#healthBar') as HTMLElement).style.width = '80%';
  }
  logout() {
    this.api.logout().subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (err: any) => console.log(err)
    );

  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    let posX = (e.clientX / window.innerWidth) * 16 - 8;
    let posY = (e.clientY / window.innerWidth) * 8 - 4;
    if(posX > 4) posX = 4;
    else if(posX < -4) posX = -4;
    if(posY > 2) posY = 2;
    else if(posY < -2) posY = -2;
    (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.transform = "translate(" + posX + "em," + posY + "em)";
    (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "em," + posY + "em)";
  }
}
