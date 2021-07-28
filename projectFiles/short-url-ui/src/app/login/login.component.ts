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
    console.log(this.userlogin.value);
    fetch('/api/api/login', {
      method: "POST",
      body: JSON.stringify({
        username: this.userlogin.value.username,
        password: this.userlogin.value.password
      })
    }).then(response => response.json())
    .then(data => {
      this.errorMessage = "";
      localStorage.setItem("username", this.userlogin.value.username);
      this.router.navigate(['/']);
    })
    .catch(e => {
      this.errorMessage = e;
      console.error(e)
    });
  }

}
