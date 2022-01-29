import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../api-connector.service';
import { Creature } from '../creature';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  creatures: Creature[] = [];

  chosenType = -1;

  registerError = false;
  creatureTypeError = false;
  registerSucceed = false;
  emptyFields = false;

  @ViewChild('loginInput')
  loginInput!: ElementRef;
  @ViewChild('passInput')
  passInput!: ElementRef;
  @ViewChild('nameInput')
  nameInput!: ElementRef;
  



  constructor(private api: ApiConnectorService, public router: Router) {
    this.getCreatures();
  }

  ngOnInit(): void {
  }

  getCreatures() {
    this.api.getAllCreatures().subscribe(
      (response: any) => {
        response.forEach((element: any) => {

          this.creatures.push(new Creature(
            element.type,
            element.kind,
            element.description
          ));
        });
      },
      (err: any) => console.log(err)
    );

  }

  register() {
    let canRegister = true;

    this.emptyFields = false;
    this.registerError = false;
    this.creatureTypeError = false;
    this.registerSucceed = false;

    let login = this.loginInput.nativeElement.value;
    let password = this.passInput.nativeElement.value;
    let name = this.nameInput.nativeElement.value;

    if (login == "" || password == "" || name == ""){
      canRegister = false;
      this.emptyFields = true;
    }
    if (this.chosenType > this.creatures.length && this.chosenType < 1) {
      canRegister = false;
      this.creatureTypeError = true;
    }
    if (canRegister) {

      this.api.register(login, password, this.chosenType, name).subscribe(
        (response: string) => {
          if (response == "succeed") {
            this.registerSucceed = true;
          }
          else if (response == "userExist")
            this.registerError = true;
          else
            console.log(response);
        },
        (err: any) => console.log(err)
      );
    }
  }


}
