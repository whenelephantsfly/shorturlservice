import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-convert-url',
  templateUrl: './convert-url.component.html',
  styleUrls: ['./convert-url.component.css']
})
export class ConvertUrlComponent implements OnInit {

  longUrl: string = "";
  responseData: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    const data = {
      longUrl: this.longUrl
    }

    fetch("localhost:8000/generateShortUrl", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
      this.responseData = data;
    })
    .catch(e => console.log(e));
  }

}
