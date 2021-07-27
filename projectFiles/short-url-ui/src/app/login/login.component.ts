import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = "";
  password: string = "";
  inputValid:boolean=true;
  rememberMe:  boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  validate()
  {
    
    if(this.username=="" || this.password==""){
      
      this.inputValid=false;
    }
    else{
      this.inputValid=true;
      location.href = "/convert-url";
    }
    
  }


}
