import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  url:string;
  token='';

  constructor( public authService: AuthService,
    private router:Router ) { 
  }

  ngOnInit(): void {
    this.token =  this.authService.currentToken;
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigateByUrl('/user/login');
  }

}
