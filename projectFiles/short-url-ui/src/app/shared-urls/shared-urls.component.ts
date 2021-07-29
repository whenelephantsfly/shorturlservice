import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shared-urls',
  templateUrl: './shared-urls.component.html',
  styleUrls: ['./shared-urls.component.css']
})
export class SharedUrlsComponent implements OnInit {

  username: string = "";
  urls: any[] = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("username")) {
      this.username = <string> localStorage.getItem("username");
      fetch('/api/getPrivateUrls?userName=' + this.username)
        .then(response => response.json())
        .then(data => {
          this.urls = data;
        })
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  }

}
