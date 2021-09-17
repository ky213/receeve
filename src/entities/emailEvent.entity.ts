import { IEmailEvent } from 'interfaces/emailEvent.interface';

export class Email {
  public readonly emailEvent: IEmailEvent;

  constructor({ emailEvent }) {
    this.emailEvent = emailEvent;
  }

  getEmailEvent = () => this.emailEvent;
}
