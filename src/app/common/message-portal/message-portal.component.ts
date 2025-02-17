import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MessagePortalPipe } from 'src/app/pipe/message-portal.pipe';
import { DataService } from 'src/app/service/data.service';
import { MESSAGE_DIALOG_DATA } from './message-portal-interface';
import { MessagePortalOverlayRef } from './message-portal-overlay';
// import { MessagePortalOverlayRef } from './message-portal-overlay';

const ANIMATION_TIMINGS = '500ms cubic-bezier(0.25, 0.8, 0.25, 1)';
// const ANIMATION_TIMINGS = '500ms ease';

@Component({
  selector: 'app-message-portal',
  templateUrl: './message-portal.component.html',
  styleUrls: ['./message-portal.component.scss'],
})
export class MessagePortalComponent implements OnInit {
  
  animationState: 'void' | 'enter' | 'leave' = 'enter';

  @HostListener('document:keydown', ['$event']) private handleKeydown(
    event: KeyboardEvent
  ) {
    // console.log(event.key);
    if (event.key === 'Escape') {
      this.dialogRef.close();
    }
  }
  errorMessage = false;
  warningMessage = false;
  infoMessage = false;

  message = {
    errorMessage: [],
  };

  constructor(
    public dialogRef: MessagePortalOverlayRef,
    @Inject(MESSAGE_DIALOG_DATA) public data: any
  ) {
    this.message = this.data.message;
    setTimeout(() => {
      this.constructType(this.data.type);
    }, 100);
    // console.log(this.data.type);
    
    // this.frameType();
    
    console.log(this.message);
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  allFalse() {
    this.errorMessage = false;
    this.warningMessage = false;
    this.infoMessage = false;
  }

  constructType(val) {
    this.allFalse();
    switch (val) {
      case '':
        // console.log('ok');
        this.frameType();
        break;
      case 'error':
        this.errorMessage = true;
        break;
      case 'warn':
        this.warningMessage = true;
        break;
      case 'info':
        this.infoMessage = true;
        break;
      default:
        this.frameType();
        break;
    }
  }

  frameType(){
    // const messageP = new MessagePortalPipe();
        const errorCount = new MessagePortalPipe().transform(this.message.errorMessage, 0);
        if (errorCount.length > 0) {
          this.allFalse();
          this.errorMessage = true;
        } else {
          const warningCount = new MessagePortalPipe().transform(this.message.errorMessage, 1);
          console.log(warningCount.length);
          if (warningCount.length > 0) {
            
            this.allFalse();
            this.warningMessage = true;
          } else {
            const infoCount = new MessagePortalPipe().transform(this.message.errorMessage, 2);
            if (infoCount.length > 0) {
              this.allFalse();
              this.infoMessage = true;
            }
          }
        }
        console.log(errorCount.length);
  }

  csFileDialogClose(val) {
    this.dialogRef.close();
  }
 
}
