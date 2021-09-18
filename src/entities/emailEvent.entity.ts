import { EMAIL_PROVIDER } from 'config/contants';
import { EmailEventValidator, IEmailEvent, IVendorEmailEvent } from 'types/emailEvent.interface';
export interface IEmailEventProps {
  emailEvent: IVendorEmailEvent;
  validator: EmailEventValidator;
}
export class EmailEvent {
  public readonly emailEvent: IEmailEvent;

  constructor({ emailEvent, validator }: IEmailEventProps) {
    this.validateEmailEvent(validator)(emailEvent);
    this.emailEvent = this.normalizeEmaiEvent(emailEvent);
  }

  validateEmailEvent = (validator: EmailEventValidator) => (emailEvent: IVendorEmailEvent) => {
    if (!validator(emailEvent)) throw new Error('email event has no valid signature');
  };

  normalizeEmaiEvent = (emailEvent: IVendorEmailEvent): IEmailEvent => ({
    provider: EMAIL_PROVIDER,
    timestamp: emailEvent['event-data'].timestamp,
    type: emailEvent['event-data'].event,
  });

  getEmailEvent = () => this.emailEvent;
}
