import { BrowserModule } from "@angular/platform-browser";
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
} from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { SnackbarModule } from "./common/snackbar/snackbar.module";
import { IonicStorageModule } from "@ionic/storage";
import { AppGlobal } from "./constants";
import { MatIconModule } from "@angular/material/icon";
import { MessagePortalModule } from "./common/message-portal/message-portal.module";
import { PermissionModule } from "./permission/permission.module";
import { SessionAlertModule } from "./common/session-alert/session-alert.module";
import { AppSettingsService } from "./service/app-settings.service";

export const appSettingFactory = (configService: AppSettingsService) => {
  return () => configService.loadConfig();
};

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    SnackbarModule,
    MatIconModule,
    MessagePortalModule,
    PermissionModule,
    SessionAlertModule,
    // MatIconRegistry
    IonicStorageModule.forRoot({
      name: AppGlobal.dbname,
      driverOrder: ["sqlite", "indexeddb", "localstorage"],
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appSettingFactory,
      deps: [AppSettingsService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
