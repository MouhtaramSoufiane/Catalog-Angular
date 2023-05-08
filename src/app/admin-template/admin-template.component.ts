import {Component, OnInit} from '@angular/core';
import {AuthentifcationService} from "../Services/authentifcation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit{
  constructor(public authService:AuthentifcationService,private router:Router) {
  }

  ngOnInit(): void {

  }


  handleLogout() {
    localStorage.removeItem("authUser")
    this.authService.authenticateUser=undefined;
    this.router.navigateByUrl("/login")

  }
}
