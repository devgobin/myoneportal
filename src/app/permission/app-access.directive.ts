import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appAccess]",
})
export class AppAccessDirective {
  @Input("appAccess") elemId = "";
  @Input("parentId") parentId = "";

  replaceHtml =
    '<div class="v-center text-center"><h3>You are not authorized to view this page</h3><p>Please reach to your organization primary contact for more information</p></div>';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const userData = JSON.parse(sessionStorage.getItem("FNPFPortalUserData"));
    if (userData.plstProtoUserRights) {
      const rights = userData.plstProtoUserRights;

      // Check for Parent Id Avaliable
      const index = rights.map((e) => e.iViewName).indexOf(this.parentId);

      // If Unavaliable Remove Element
      if (index !== -1) {
        const permissions = rights[index].resourcePermission;
        const isAvailableIndex = permissions
          .map((e) => e.iResourceName)
          .indexOf(this.elemId);
        if (isAvailableIndex !== -1) {
          if (this.elemId === this.parentId) {
            if (permissions[isAvailableIndex].iPermission !== "1") {
              this.el.nativeElement.innerHTML = this.replaceHtml;
            }
          } else {
            if (permissions[isAvailableIndex].iPermission === "0") {
              this.el.nativeElement.remove();
            }
          }
        } else {
          if (this.elemId === this.parentId) {
            this.el.nativeElement.innerHTML = this.replaceHtml;
          }
        }
      } else {
        this.el.nativeElement.innerHTML = this.replaceHtml;
      }
    }
  }
}
