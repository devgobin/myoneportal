import { Injectable } from "@angular/core";
import { FullSpinnerService } from "src/app/common/full-spinner/full-spinner.service";

@Injectable({
  providedIn: "root",
})
export class ViewReceivedFeesService {
  loadingTrue = false;
  btnClicked = false;
  errorTrue = false;
  constructor(public fullspinner: FullSpinnerService) {}
  initialData = {
    WAStatusValues: [],
    VRBatchNo: [],
    DDLOrgCampus: [],
  };
  setAll(val) {
    this.loadingTrue = val;
    this.fullspinner.empty.next(val);
  }
}
