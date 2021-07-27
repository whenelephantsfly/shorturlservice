import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string = "";
  password: string = "";
  confirmpassword: string="";
  emailid: string="";
  inputs: boolean=true;
  pass_copass:boolean=true;
  user_already_exist:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
  signupvalidate()
  {

    if((this.username=="Megha" || this.emailid=="meghamoon02@gmail.com") &&
    this.username!="" && this.emailid!=""){
      
      this.user_already_exist=false;
    }
    else{
      this.user_already_exist=true;
    }  

    
    if(this.username=="" || this.emailid=="" || this.password=="" || this.confirmpassword==""){
      
      this.inputs=false;
    }
    else{
      this.inputs=true;
    }

    

    if(this.password!=this.confirmpassword  &&
    this.username!="" && this.emailid!="" && this.password!="" && this.confirmpassword!="")
    {
      this.pass_copass=false;
    }
    else{
      this.pass_copass=true;
    }


    
  }
}
