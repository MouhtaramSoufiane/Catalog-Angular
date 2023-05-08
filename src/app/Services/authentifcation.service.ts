import {Injectable, OnInit} from '@angular/core';
import {AppUser} from "../model/user.model";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentifcationService {

  users:AppUser[]=[];
  authenticateUser:AppUser | undefined

  constructor() {
    this.users.push({userId:UUID.UUID(),username:"user1",password:"1234",roles:["ADMIN","USER"]})
    this.users.push({userId:UUID.UUID(),username:"user2",password:"0000",roles:["USER"]})
  }

  public login(username:string,password:string):Observable<AppUser>{
    let appUser = this.users.find(u=>u.username==username);
    if(!appUser){
     return throwError(()=>new Error("user not found"));
    }
    if(appUser.password!=password) return throwError(()=>new Error("bad Creditianls"));
    return of(appUser)
  }


  public authenticationUser(user:AppUser):Observable<boolean>{
    this.authenticateUser=user;
    localStorage.setItem("authUser",JSON.stringify({username:user.username,roles:user.roles,jwt:"JWT_TOKEN"}))
    return of(true)
  }

  public isAdmin(role:string):boolean{
    return this.authenticateUser!.roles.includes(role);

  }
  public isAuthenticated(){
    return this.authenticateUser!=undefined;
  }

}
