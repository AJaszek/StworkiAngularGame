import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiConnectorService } from '../api-connector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError = false;

  @ViewChild('loginInput')
  loginInput!: ElementRef;
  @ViewChild('passInput')
  passInput!: ElementRef;

  constructor(private api: ApiConnectorService, public router: Router) {

  }

  ngOnInit(): void {
  }


  login() {
    let login = this.loginInput.nativeElement.value;
    let password = this.passInput.nativeElement.value;
    //console.log(login + ' ' + password)

    this.api.login(login, password).subscribe(
      (response: string) => {
        //console.log(response);
        if(response == login){
          this.router.navigate(['/game']);
          //console.log("response");
        }
        else if(response == "incorrect")
          this.loginError=true;
        else 
          console.log(response);
      },
      (err: any) => console.log(err)
    );

  }

}
