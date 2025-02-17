import { Component, Input, OnInit } from "@angular/core";
import { AppSettingsService } from "src/app/service/app-settings.service";

@Component({
  selector: "app-live-bot",
  templateUrl: "./live-bot.component.html",
  styleUrls: ["./live-bot.component.scss"],
})
export class LiveBotComponent implements OnInit {
  @Input() public botcode = "ESSBOT";
  // @Input() public region = "DEV";
  @Input() public hideIcon = false;
  url = "";
  isOpened = false;
  dragging = false;
  //region ='DEV';
  constructor(public appSetting: AppSettingsService) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  openBot() {
    if (!this.dragging) {
      this.url = this.appSetting.environment.liveBotUrl + "/" + this.botcode;
      this.isOpened = !this.isOpened;
    }
  }
  dragStarted() {
    this.dragging = true;
  }

  dragEnded() {
    setTimeout(() => {
      this.dragging = false;
    }, 400);
  }
}
