import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  errorMessage: string = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  userlogin = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  onSubmit()
  {
    fetch('/api/api/login/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.userlogin.value.username,
        password: this.userlogin.value.password
      })
    }).then(response => response.json())
    .then(data => {
      if(data.non_field_errors) this.errorMessage = data.non_field_errors;
      else {
        this.errorMessage = "";
        localStorage.setItem("username", this.userlogin.value.username);
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
