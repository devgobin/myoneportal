import { Injectable } from "@angular/core";
import * as CryptoJS from "crypto-js";
import { Storage } from "@ionic/storage";
import { AppSettingsService } from "./app-settings.service";
// import {AppGlobal} from '../constants';

@Injectable({
  providedIn: "root",
})
export class AesService {
  constructor(public storage: Storage, public appSetting: AppSettingsService) {}

  async encrypt(text) {
    return new Promise((resolve, reject) => {
      if (this.appSetting.environment.encrypt === false) {
        resolve(text);
        return;
      }
      this.storage.get("encryptkey").then((val) => {
        // console.log(val);
        if (val) {
          let Key = CryptoJS.enc.Utf8.parse(val[0]);
          let IV = CryptoJS.enc.Utf8.parse(val[1]);
          let encryptedText = CryptoJS.AES.encrypt(text, Key, {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          });
          resolve(encryptedText.toString());
          return;
        } else {
          resolve(text);
          return;
        }
      });
    });
  }
}
