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

   /* api.getCreatureData().subscribe(
      (response: any) => {
        console.log(response);
        
      },
      (err: any) => console.log(err)
    );*/
  }

  ngOnInit(): void {}

  aaa(ev:any){
    let x:number = ev.touches[0].screenX;
    let y:number = ev.touches[0].screenY;
    x*=1;
    y*=1;
    this.moveAfterCursor(x, y);
  }
  ngAfterViewInit() {
    (document.querySelector('#healthBar') as HTMLElement).style.width = '80%';
    window.addEventListener('touchmove', this.process_touchmove, false);
  }
  process_touchmove(ev:any) {
    let x:number = ev.touches[0].screenX;
    let y:number = ev.touches[0].screenY;
    let posX = (x / window.innerWidth) * 16 - 8;
    let posY = (y / window.innerHeight) * 8 - 3;
    if(posX > 4) posX = 4;
    else if(posX < -4) posX = -4;
    if(posY > 2) posY = 2;
    else if(posY < -2) posY = -2;
    (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.transform = "translate(" + posX + "em," + posY + "em)";
    (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "em," + posY + "em)";

    (document.querySelectorAll('.pupil')[0] as HTMLElement).style.transform = "translate(" + posX/7 + "em," + posY/5 + "em)";
    (document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX/7 + "em," + posY/5 + "em)";

    (document.querySelector('.creatureMouth') as HTMLElement).style.transform = "translate(" + posX/2 + "em," + posY/2 + "em)";

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
  @HostListener('document:touchmove', ['$event'])
  onMouseMove(e:any) {
    this.moveAfterCursor(e.clientX, e.clientY);
    
  }


  moveAfterCursor(x:number, y:number){

    let posX = (x / window.innerWidth) * 16 - 8;
    let posY = (y / window.innerHeight) * 8 - 3;
    if(posX > 4) posX = 4;
    else if(posX < -4) posX = -4;
    if(posY > 2) posY = 2;
    else if(posY < -2) posY = -2;
    (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.transform = "translate(" + posX + "em," + posY + "em)";
    (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "em," + posY + "em)";

    (document.querySelectorAll('.pupil')[0] as HTMLElement).style.transform = "translate(" + posX/7 + "em," + posY/5 + "em)";
    (document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX/7 + "em," + posY/5 + "em)";

    (document.querySelector('.creatureMouth') as HTMLElement).style.transform = "translate(" + posX/2 + "em," + posY/2 + "em)";

    return 0;
    
    //(document.querySelector('.upperLip') as HTMLElement).style.height = "";
  }



}
