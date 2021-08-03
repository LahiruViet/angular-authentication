import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedInUser: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.loginService.getLoggedInUser().subscribe(
      response => {
      this.loggedInUser = response.username;
    }, 
    error => {
      console.log(error);
      this.router.navigate(['login']);
    })
  }

}
