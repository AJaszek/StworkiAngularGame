import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  constructor() { 

  }

  ngOnInit(): void {
  }


  login(){
    let login = this.loginInput.nativeElement.value;
    let password = this.passInput.nativeElement.value;
    console.log(login + ' ' + password)
    
  }

}
