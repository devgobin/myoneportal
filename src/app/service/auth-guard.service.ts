import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}

  canActivate(): boolean {
    const token = JSON.parse(sessionStorage.getItem("FNPFPortalUserData"));
    if (token) {
      return true;
    }
    this.router.navigate(["/"]);
    return false;
    // return true;
  }
}
