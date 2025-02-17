import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./home-page/home-page.module").then((m) => m.HomePageModule),
      },
      {
        path: "register",
        loadChildren: () =>
          import("./portal-registration/portal-registration.module").then(
            (m) => m.PortalRegistrationModule
          ),
      },
      {
        path: "forgot/userid",
        loadChildren: () =>
          import("./forgot-userid/forgot-userid.module").then(
            (m) => m.ForgotUseridModule
          ),
      },
      {
        path: "forgot/password",
        loadChildren: () =>
          import("./forgot-password/forgot-password.module").then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: "portal/login",
        loadChildren: () =>
          import("./portal-login/portal-login.module").then(
            (m) => m.PortalLoginModule
          ),
      },
      {
        path: "login/two-factor-authentication",
        loadChildren: () =>
          import(
            "./home-page/login/login-two-factor/login-two-factor.module"
          ).then((m) => m.LoginTwoFactorModule),
      },
      {
        path: "select-organization",
        loadChildren: () =>
          import(
            "./home-page/login/login-select-organization/login-select-organization.module"
          ).then((m) => m.LoginSelectOrganizationModule),
      },
      {
        path: "staff/login",
        loadChildren: () =>
          import("./staff-login/staff-login.module").then(
            (m) => m.StaffLoginModule
          ),
      },
      {
        path: "reset/password",
        loadChildren: () =>
          import("./reset-user-password/reset-user-password.module").then(
            (m) => m.ResetUserPasswordModule
          ),
      },
      
      {
        path: "employer-registration/:id",
        loadChildren: () =>
          import("./employer-registration/employer-registration.module").then(
            (m) => m.EmployerRegistrationModule
          ),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
