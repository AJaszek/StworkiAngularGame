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

  creature!: Creature;

  constructor(private api: ApiConnectorService, public router: Router, private elementRef: ElementRef) {


  }

  ngOnInit(): void {
    this.creature = new Creature(0, "", "", "", 0, 0, 0, 0);
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
          Boolean(Number(response.sleep))
        );
        (document.querySelector('#healthBar') as HTMLElement).style.width = this.creature.getHealth().toString() + "%";
        (document.querySelector('#hungryBar') as HTMLElement).style.width = this.creature.getHunger().toString() + "%";
        (document.querySelector('#tirednessBar') as HTMLElement).style.width = this.creature.getTiredness().toString() + "%";
        this.creature.setSleep(this.creature.getSleep(), false);
      },
      (err: any) => console.log(err)
    );

  }



  ngAfterViewInit() {

    /*  if (!this.creature.getSleep())
        window.addEventListener('touchmove', this.process_touchmove, false);*/
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
  onMouseMove(e: any) {
    if (!this.creature.getSleep())
      this.creature.moveAfterCursor(e.clientX, e.clientY);
  }

  changeLampeState() {
    let state = !this.creature.getSleep();
    this.creature.setSleep(state, true);
    this.api.changeSleep(state).subscribe();
    //this.sleep(state, true);
  }
  

}
