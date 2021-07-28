import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
  }
  usersignup = new FormGroup({
    username: new FormControl('', Validators.required),
    emailid: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('',Validators.required),
    confirmpassword: new FormControl('',Validators.required)
  });
  
  onSubmit(){
    
  }

  
}
