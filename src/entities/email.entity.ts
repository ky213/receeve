export interface EmailEvent {
  name: string;
}

export class Email implements EmailEvent {
  public readonly emailEvent: EmailEvent;
  public readonly name: string;

  constructor({ emailEvent }) {
    this.emailEvent = emailEvent;
  }

  getEmailEvent = () => this.emailEvent;
}
