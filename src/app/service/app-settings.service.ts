import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppSettingsService {
  environment = {
    sandboxMode: false,
    basePath: "",
    baseAppPath: "",
    encrypt: false,
    maxFileSize: 0,
    fileSizeErrorMsg: "",
    fileAccept: "",
    liveBotUrl: "",
    showBotWindow: false,
    fileAcceptImages: "",
  };

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http
      .get("./app.settings.json")
      .toPromise()
      .then((success: any) => {
        this.environment = success;
        if (this.environment.sandboxMode) {
        } else {
          // this.renderer.removeClass(this.document.body, "sandbox-theme");
        }
      });
  }
}
