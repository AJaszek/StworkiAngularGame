import { Component, ElementRef, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../api-connector.service';
import { Creature } from '../creature';
import { Food } from '../food';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  encapsulation: ViewEncapsulation.None // Gdy css nie działa po innerHTML
})
export class GameComponent implements OnInit {

  creature!: Creature;
  foods: Food[] = [];


  constructor(private api: ApiConnectorService, public router: Router, private elementRef: ElementRef) {

    this.foods.push(new Food("Banan", 10));
    this.foods.push(new Food("Banan", 10));
    this.foods.push(new Food("Banan", 10));
    this.foods.push(new Food("Truskawka", 5));
    this.foods.push(new Food("Truskawka", 5));
    this.foods.push(new Food("Truskawka", 5));

  }

  ngOnInit(): void {
    this.creature = new Creature(1, "", "", "Testowy stworek", 0, 0, 0, 0);
    /* this.api.getCreatureData().subscribe(
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
         );*/
    console.log(this.creature.getType());
    (document.querySelector('#healthBar') as HTMLElement).style.width = this.creature.getHealth().toString() + "%";
    (document.querySelector('#hungryBar') as HTMLElement).style.width = this.creature.getHunger().toString() + "%";
    (document.querySelector('#tirednessBar') as HTMLElement).style.width = this.creature.getTiredness().toString() + "%";
    this.creature.draw(document.querySelector('.creature') as HTMLElement);
    this.creature.setSleep(this.creature.getSleep(), false);
    /*},
    (err: any) => console.log(err)
  );*/

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

  closeFridge() {

  }
  openFridge() {
    let windowStyle = (document.querySelector('.fridgeContent') as HTMLElement).style;
    if (windowStyle.display == "block")
      windowStyle.display = "none";
    else
      windowStyle.display = "block";
  }

  clickedFood(food: Food){
    console.log(food.getName());
    this.openFridge();
    let tempFood = (document.querySelector('.clickedFoodItem') as HTMLElement).style;
    tempFood.display = "block";
  }
  releasedFood(){
    //console.log(food.getName());
    let tempFood = (document.querySelector('.clickedFoodItem') as HTMLElement).style;
    tempFood.display = "none";
  }

}
