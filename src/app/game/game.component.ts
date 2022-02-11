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
  foodToEat!: Food;


  constructor(private api: ApiConnectorService, public router: Router, private elementRef: ElementRef) {
    /*
        this.foods.push(new Food(1, "Banan", "foodBanana", 10));
        this.foods.push(new Food(1, "Banan", "foodBanana", 10));
        this.foods.push(new Food(2, "Truskawka", "foodStrawberry", 5));
        this.foods.push(new Food(2, "Truskawka", "foodStrawberry", 5));
        this.foods.push(new Food(3, "Czekolada", "foodChocolate", 5));
        this.foods.push(new Food(3, "Czekolada", "foodChocolate", 5));
        this.foods.push(new Food(4, "Ciastko", "foodCookie", 5));
        this.foods.push(new Food(4, "Ciastko", "foodCookie", 5));
    
    */

  }

  ngOnInit(): void {
    this.creature = new Creature(1, "", "", "Testowy stworek", 1, 100, 10, 100);
    this.foodToEat = new Food(-1, "", "", 0, 0, 0);
    this.api.getCreatureData().subscribe(
      (response: any) => {
        this.creature = new Creature(
          response.userC.type,
          response.userC.kind,
          response.userC.description,
          response.userC.name,
          response.userC.level,
          response.userC.health,
          response.userC.hunger,
          response.userC.tiredness,
          Boolean(Number(response.userC.sleep))
        );
        response.fridgeContent.forEach((el: any) => {
          this.foods.push(new Food(el.type, el.name, el.cssClassName, el.healthPoints, el.hungPoints, el.tiredPoints));
        });
        this.refreshBars();
        this.creature.draw(document.querySelector('.creature') as HTMLElement);
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

  refreshBars() {
    (document.querySelector('#healthBar') as HTMLElement).style.width = this.creature.getHealth().toString() + "%";
    (document.querySelector('#hungryBar') as HTMLElement).style.width = this.creature.getHunger().toString() + "%";
    (document.querySelector('#tirednessBar') as HTMLElement).style.width = this.creature.getTiredness().toString() + "%";
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  onMouseMovee(e: any) {
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

  clickedFood(food: Food) {
    this.openFridge();
    let tempFood = (document.querySelector('.clickedFoodItem') as HTMLElement);
    tempFood.style.display = "block";
    tempFood.innerHTML = "<div></div>";
    tempFood.children[0].className = food.getCssClassName();
    this.foodToEat = food;

    //window.addEventListener("mousemove", this.foodMove);
    onmousemove = (event: MouseEvent) => {
      this.foodMove(event);
    }
  }
  releasedFood() {
    //console.log(food.getName());
    let tempFood = (document.querySelector('.clickedFoodItem') as HTMLElement).style;
    tempFood.display = "none";
    //window.removeEventListener("mousemove", this.foodMove);
    onmousemove = (event: MouseEvent) => {
      //this.foodMove(event);
    }
    if (this.foodToEat.getCanEat()) {
      this.creature.addHunger(Number(this.foodToEat.getHungerPoints()));
      this.creature.addHealth(Number(this.foodToEat.getHealthPoints()));
      this.creature.addTiredness(Number(this.foodToEat.getTiredPoints()));
      this.api.creatureEat(this.foodToEat.getType());
    }
    this.refreshBars();
    (document.querySelector('.upperLip') as HTMLElement).style.height = "100%";
  }

  foodMove(ev: any) {
    let x: number = ev.clientX;
    let y: number = ev.clientY;
    let posX = (x / window.innerWidth) * 16 - 8;
    let posY = (y / window.innerHeight) * 8 - 3;
    if (posX > 6) posX = 6;
    else if (posX < -6) posX = -6;
    if (posY > 5) posY = 5;
    else if (posY < -5) posY = -5;

    // for (let i = 0; i < document.querySelectorAll('.creatureEye').length; i++)
    (document.querySelector('.clickedFoodItem') as HTMLElement).style.transform = "translate(" + x + "px," + y + "px)";
    let mouthPos = (document.querySelector('.creatureMouth') as HTMLElement).getBoundingClientRect();
    let xDist = Math.abs((mouthPos.left + (mouthPos.width / 2)) - x);
    let yDist = Math.abs((mouthPos.top + (mouthPos.height / 2)) - y);
    let dist = ((yDist + xDist) / 2);

    if (dist < 100) {
      (document.querySelector('.upperLip') as HTMLElement).style.height = dist + "%";
      if (dist > 20)
        this.foodToEat.setCanEat(false);
      else
        this.foodToEat.setCanEat(true);
    }
  }

}
