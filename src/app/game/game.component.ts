import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../api-connector.service';
import { Creature } from '../creature';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  creature!: Creature ;

  constructor(private api: ApiConnectorService, public router: Router, private elementRef: ElementRef) {

    
  }

  ngOnInit(): void {
    this.creature= new Creature(0,"","","",0,0,0,0);
    this.api.getCreatureData().subscribe(
      (response: any) => {
        this.creature = new Creature(
          response.type,
          response.kind,
          response.description,
          response.name,
          response.level,
          response.health,
          response.hunger,
          response.tiredness,
          );
          (document.querySelector('#healthBar') as HTMLElement).style.width = this.creature.getHealth().toString()+"%";
          (document.querySelector('#hungryBar') as HTMLElement).style.width = this.creature.getHunger().toString()+"%";
          (document.querySelector('#tirednessBar') as HTMLElement).style.width = this.creature.getTiredness().toString()+"%";
      },
      (err: any) => console.log(err)
    );
    
  }


  ngAfterViewInit() {

    if(!this.creature.getSleep())
    window.addEventListener('touchmove', this.process_touchmove, false);
    //window.removeEventListener
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
    if(!this.creature.getSleep())
    this.moveAfterCursor(e.clientX, e.clientY);
  }
  moveAfterCursor(x:number, y:number){

    let posX = (x / window.innerWidth) * 16 - 8;
    let posY = (y / window.innerHeight) * 8 - 3;
    if(posX > 6) posX = 6;
    else if(posX < -6) posX = -6;
    if(posY > 5) posY = 5;
    else if(posY < -5) posY = -5;
    (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
    (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";

    (document.querySelectorAll('.pupil')[0] as HTMLElement).style.transform = "translate(" + posX/6 + "vh," + posY/3 + "vh)";
    (document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX/6 + "vh," + posY/3 + "vh)";

    (document.querySelector('.creatureMouth') as HTMLElement).style.transform = "translate(" + posX/2 + "vh," + posY/2 + "vh)";

    return 0;
    
    //(document.querySelector('.upperLip') as HTMLElement).style.height = "";
    //element.getBoundingClientRect() - x, y elementu
  }
  process_touchmove(ev:any) {
    let x:number = ev.touches[0].screenX;
    let y:number = ev.touches[0].screenY;
    let posX = (x / window.innerWidth) * 16 - 8;
    let posY = (y / window.innerHeight) * 8 - 3;
    if(posX > 6) posX = 6;
    else if(posX < -6) posX = -6;
    if(posY > 5) posY = 5;
    else if(posY < -5) posY = -5;
    (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";
    (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.transform = "translate(" + posX + "vh," + posY + "vh)";

    (document.querySelectorAll('.pupil')[0] as HTMLElement).style.transform = "translate(" + posX/6 + "vh," + posY/3 + "vh)";
    (document.querySelectorAll('.pupil')[1] as HTMLElement).style.transform = "translate(" + posX/6 + "vh," + posY/3 + "vh)";

    (document.querySelector('.creatureMouth') as HTMLElement).style.transform = "translate(" + posX/2 + "vh," + posY/2 + "vh)";
    

  }

  changeLampeState(){
    let state = !this.creature.getSleep();
    this.creature.setSleep(state);
    if(state){
      //(document.querySelectorAll('.sleepTime')[0] as HTMLElement).style.visibility = "visible";
      //(document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.height = "0.4%";
      (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.animation = "closeEyes 1s linear forwards";
      (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.animation = "closeEyes 1s linear forwards";
      //(document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.height = "0.4%";
      window.removeEventListener("touchmove", this.process_touchmove, false);
      (document.querySelector('.sleepTime') as HTMLElement).style.animation = "darkenWindow 2s linear forwards";
      (document.querySelector('.lamp') as HTMLElement).style.backgroundColor = "rgb(238, 255, 0)";
    }
    else{
      //(document.querySelectorAll('.sleepTime')[0] as HTMLElement).style.visibility = "hidden";
      (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.height = "10%";
      (document.querySelectorAll('.creatureEye')[0] as HTMLElement).style.animation = "openEyes 1s linear forwards";
      (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.animation = "openEyes 1s linear forwards";
      (document.querySelectorAll('.creatureEye')[1] as HTMLElement).style.height = "10%";
      window.addEventListener("touchmove", this.process_touchmove, false);
      (document.querySelector('.sleepTime') as HTMLElement).style.animation = "lightenWindow 2s linear forwards";
      (document.querySelector('.lamp') as HTMLElement).style.backgroundColor = "rgba(238, 255, 0, 0)";
      //(document.querySelector('.sleepTime') as HTMLElement).style.animationDirection= "reverse";
    }
  }


}
