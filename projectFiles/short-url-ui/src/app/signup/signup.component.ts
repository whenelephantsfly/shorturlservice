import { Component, OnInit } from '@angular/core';

import { FormGroup,FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage: string = "";
  
 

  ngOnInit(): void {
  }


  usersignup:FormGroup;

  constructor(private formBuilder:FormBuilder,private router: Router) {
    this.usersignup = this.formBuilder.group({
      username: new FormControl(null,[Validators.required]),
      emailid: new FormControl('', [ Validators.required, Validators.email ]),
      password: new FormControl('',Validators.required),
      confirmpassword: new FormControl('',Validators.required)
    },{validators : this.MustMatch('password','confirmpassword')})
   
   }

  get f()
  {
   return  this.usersignup.controls
  }
  MustMatch(controlName: string, matchingcontrolName:string)
  {
    return (formGroup:FormGroup)=>{
      const control =formGroup.controls[controlName];
      const matchingControl =formGroup.controls[matchingcontrolName];
      if(matchingControl.errors && !matchingControl.errors.MustMatch)
      {
        return 
      }
      if(control.value !== matchingControl.value)
      {
        
        matchingControl.setErrors({MustMatch:true})
        
      }
      else
      {
        matchingControl.setErrors(null)
      }
    }
  }

  onSubmit(){
    fetch('/api/api/register/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.usersignup.value.username,
        email: this.usersignup.value.emailid,
        password: this.usersignup.value.password
      })
    }).then(response => response.json())
    .then(data => {
      if(data.non_field_errors) this.errorMessage = data.non_field_errors;
      else {
        this.errorMessage = "";
        localStorage.setItem("username", this.usersignup.value.username);
        localStorage.setItem("token", data.token);
        this.router.navigate(['/']);
      }
    })
    .catch(e => {
      this.errorMessage = e;
      console.error(e)
    });
    
  }

  
  
}
