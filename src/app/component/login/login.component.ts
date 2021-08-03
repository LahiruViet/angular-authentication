import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credential } from 'src/app/models/credential';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credential = new Credential(); 

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login = () => {
    
    this.loginService.login(this.credential).subscribe(response => {
      this.loginService.saveToken(response.jwtToken);
      this.router.navigate(['login-success']);
    },
    error => {
      console.log(error);
    })
  }

}
