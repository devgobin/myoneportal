import { AfterViewInit, Component, OnInit, Renderer2 } from "@angular/core";
import { AppSettingsService } from "./service/app-settings.service";
import { DataService } from "./service/data.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    public data: DataService,
    public appSetting: AppSettingsService,
    public renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.data.init();
    this.lockScreenOrientation();
    this.addScriptTag();
  }

  title = "fnpf-portal";

  ngAfterViewInit() {
    if (this.appSetting.environment.sandboxMode) {
      this.renderer.addClass(document.body, "sandbox-theme");
    } else {
      this.renderer.removeClass(document.body, "sandbox-theme");
    }
  }
  lockScreenOrientation() {
    if (screen.orientation) {
      screen.orientation.lock("portrait").catch(() => {
        // Error handling
        console.log("unable to lock");
      });
    }
  }
  addScriptTag() {
    if (this.appSetting.environment.showBotWindow) {
      const script = this.renderer.createElement("script");
      script.src = "//fw-cdn.com/1837264/2660332.js";
      script.setAttribute("chat", "true");
      script.setAttribute("widgetId", "712c7992-523f-451a-a7a4-0971410d0330");
      this.renderer.appendChild(document.body, script);
    }
  }
}
