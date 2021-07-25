import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-convert-url',
  templateUrl: './convert-url.component.html',
  styleUrls: ['./convert-url.component.css']
})
export class ConvertUrlComponent implements OnInit {

  longUrl: string = "";
  showInput: boolean = true;
  responseData: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    let postData = {
      "url": this.longUrl
    }

    // this.http.post('/api/generateShortUrl', {url: this.longUrl}).subscribe(response => {
    //   this.responseData = response;
    //   console.log(response);
    // });

    fetch("/api/generateShortUrl", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"url": this.longUrl})
    }).then(response => response.json())
    .then(data => {
      this.responseData = data;
      this.longUrl = this.responseData.shortURL;
      this.showInput = false;
      console.log(this.responseData);
    })
    .catch(e => console.error(e));
  }

  changed() {
    this.showInput = true;
    console.log("Changed");
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.longUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
