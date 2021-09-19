import { EMAIL_PROVIDER } from '../config/contants';
import { EmailEventValidator, IEmailEvent, IVendorEmailEvent } from '../types/emailEvent.interface';
export interface IEmailEventProps {
  emailEventBody: IVendorEmailEvent;
  validator: EmailEventValidator;
}
export class EmailEvent {
  public readonly emailEventBody: IEmailEvent;

  constructor({ emailEventBody, validator }: IEmailEventProps) {
    this.validateEmailEvent(validator)(emailEventBody);
    this.emailEventBody = this.normalizeEmaiEvent(emailEventBody);
  }

  validateEmailEvent = (validator: EmailEventValidator) => (emailEvent: IVendorEmailEvent) => {
    if (!validator(emailEvent)) throw new Error('email event has no valid signature');
  };

  normalizeEmaiEvent = (emailEvent: IVendorEmailEvent): IEmailEvent => ({
    provider: EMAIL_PROVIDER,
    timestamp: emailEvent['event-data'].timestamp,
    type: emailEvent['event-data'].event,
  });

  getEmailEvent = () => this.emailEventBody;
}
