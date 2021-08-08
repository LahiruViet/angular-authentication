import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Authentication';

  constructor(private router: Router, private loginService: LoginService) {}

  navigateLogin = () => {
    this.router.navigate(['login'])
  }

  logout = () => {

    this.loginService.logout().subscribe(response => {
      this.loginService.removeJwtToken()
      this.router.navigate(['login'])
    }, 
    error => {
      console.log(error);
    })
  }
}
