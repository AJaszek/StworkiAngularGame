import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../api-connector.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerError = false;
  creatureTypeError = false;

  @ViewChild('loginInput')
  loginInput!: ElementRef;
  @ViewChild('passInput')
  passInput!: ElementRef;
  @ViewChild('typeInput')
  typeInput!: ElementRef;
  @ViewChild('nameInput')
  nameInput!: ElementRef;


  constructor(private api: ApiConnectorService, public router: Router) { }

  ngOnInit(): void {
  }

  register() {
    let login = this.loginInput.nativeElement.value;
    let password = this.passInput.nativeElement.value;
    let type: number = this.typeInput.nativeElement.value;
    let name = this.nameInput.nativeElement.value;
    //console.log(login + ' ' + password)
    if (type > 0 && type <= 2) {
      this.api.register(login, password, type, name).subscribe(
        (response: string) => {
          //console.log(response);
          if (response == "succeed") {
            this.router.navigate(['/login']);
            //console.log("response");
          }
          else if (response == "userExist")
            this.registerError = true;
          else
            console.log(response);
        },
        (err: any) => console.log(err)
      );
    }
    else{
      this.creatureTypeError = true;
    }
  }

}
