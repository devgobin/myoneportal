import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appMenuAccess]",
})
export class MenuAccessDirective implements OnInit {
  @Input("appMenuAccess") elemId = "";
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const userData = JSON.parse(sessionStorage.getItem("FNPFPortalUserData"));
    if (userData.plstProtoUserRights) {
      const rights = userData.plstProtoUserRights;
      const index = rights.map((e) => e.iViewName).indexOf("SDBAR");
      if (index !== -1) {
        const permissions = rights[index].resourcePermission;
        const isAvailableIndex = permissions
          .map((e) => e.iResourceName)
          .indexOf(this.elemId);
        if (isAvailableIndex === -1) {
          this.el.nativeElement.remove();
        } else {
          if (permissions[isAvailableIndex].iPermission !== "1") {
            this.el.nativeElement.remove();
          }
        }
      } else {
        this.el.nativeElement.remove();
      }
    } else {
      this.el.nativeElement.remove();
    }
  }
}
