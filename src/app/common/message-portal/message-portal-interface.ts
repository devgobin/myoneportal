import { InjectionToken } from '@angular/core';

export interface MessageData {
  from?: string;
  type: string;
  message: any;
}
export const MESSAGE_DIALOG_DATA = new InjectionToken<MessageData>(
  'MESSAGE_DIALOG_DATA'
);
