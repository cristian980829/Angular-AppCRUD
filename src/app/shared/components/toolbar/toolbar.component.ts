import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor( public authService: AuthService,
                      private _snackBar: MatSnackBar ) { 
  }

  ngOnInit(): void {
  }

  onLogout() {
    this.authService.logoutUser();
  }

}
