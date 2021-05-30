import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserInterface } from '../../../shared/models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:UserInterface;

  constructor(private authService:AuthService,
    private _location:Location ) { }

  ngOnInit(): void {
    const id=localStorage.getItem('uid');
    this.authService.getUser(id).subscribe(user=>{
      this.user=user;
      console.log(this.user);
    });
  }

backClicked() {
    this._location.back();
  }

}
