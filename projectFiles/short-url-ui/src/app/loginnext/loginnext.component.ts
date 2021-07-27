import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginnext',
  templateUrl: './loginnext.component.html',
  styleUrls: ['./loginnext.component.css']
})
export class LoginnextComponent implements OnInit {
  longUrl: string = "";
  showInput: boolean = true;
  responseData: any = {};

  constructor() { }

  ngOnInit(): void {
  }
  

}
