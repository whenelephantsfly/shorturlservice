import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-convert-url',
  templateUrl: './convert-url.component.html',
  styleUrls: ['./convert-url.component.css']
})
export class ConvertUrlComponent implements OnInit {

  longUrl: string = "";
  shortUrl: string = "";
  responseData: any = {};
  errorMessage: string = "";
  username: string = "";
  privateUrl: boolean = false;
  usersString: string = "";
  expirationDateAndTime: string = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().slice(0, 16);

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("username")) {
      this.username = <string> localStorage.getItem("username");
    }
  }

  get isValidUrl() {
    return this.longUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g);
  }

  onSubmit() {

    var difference = new Date(this.expirationDateAndTime).getTime() - new Date().getTime();

    let postData = { 
      "url": this.longUrl,
      "expirationDateAndTime": difference,
      "isPrivate": this.privateUrl,
      "allowedUsers": this.usersString
    }
    
    fetch("/api/generateShortUrl" + (this.username ? "?userName=" + this.username : ""), {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(postData)
    }).then(response => response.json())
      .then(data => {
        this.responseData = data;
        if(this.responseData.Error) this.errorMessage = this.responseData.Error;
        else this.errorMessage = "";
        this.shortUrl = this.responseData.shortURL;
      })
      .catch(e => console.error(e));
  }

  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.shortUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  }

}
