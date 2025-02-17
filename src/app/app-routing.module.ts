import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./service/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "app",
    loadChildren: () =>
      import("./portal/portal.module").then((m) => m.PortalModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "admin-login",
    loadChildren: () =>
      import("./administrative-login/administrative-login.module").then(
        (m) => m.AdministrativeLoginModule
      ),
  },
  {
    path: "valid-compliance-letter/:id",
    loadChildren: () =>
      import(
        "./compliance-check/valid-compliance-letter/valid-compliance-letter.module"
      ).then((m) => m.ValidComplianceLetterModule),
  },
  {
    path: "invalid-compliance-letter",
    loadChildren: () =>
      import(
        "./compliance-check/invalid-compliance-letter/invalid-compliance-letter.module"
      ).then((m) => m.InvalidComplianceLetterModule),
  },
  { path: "**", redirectTo: "/" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
