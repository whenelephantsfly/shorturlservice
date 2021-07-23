import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-urls',
  templateUrl: './all-urls.component.html',
  styleUrls: ['./all-urls.component.css']
})
export class AllUrlsComponent implements OnInit {

  public urls: any[] = [
    {
      "shortURL": "abcdefg",
      "isPrivate": false,
      "originalURL": "www.google.com",
      "creationDate": {
        "$date": "2021-07-21T15:08:57.000Z"
      },
      "expirationDate": {
        "$date": "2021-07-24T15:08:57.000Z"
      }
    },
    {
      "shortURL": "bcdefgh",
      "isPrivate": false,
      "originalURL": "www.facebook.com",
      "creationDate": {
        "$date": "2021-07-21T15:08:57.000Z"
      },
      "expirationDate": {
        "$date": "2021-07-24T15:08:57.000Z"
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
