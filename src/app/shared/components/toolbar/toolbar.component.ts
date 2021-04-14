import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  url:string;

  constructor( private router: Router ) { 
    console.log(this.router.url);
  }

  ngOnInit(): void {
    this.url=this.router.url;
    console.log(this.router.url);
  }

}
