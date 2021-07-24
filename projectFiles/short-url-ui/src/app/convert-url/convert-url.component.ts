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
    let formData = new FormData();
    formData.append('url', this.longUrl);

    fetch("/api/generateShortUrl", {
      method: "POST",
      body: JSON.stringify(formData)
    }).then(response => response.json())
    .then(data => {
      this.responseData = data;
      this.longUrl = '';
      console.log(this.responseData);
    })
    .catch(e => console.error(e));
  }

}
