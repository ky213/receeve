export type EmailProviders = 'MailGun';

export type EmailEvents =
  | 'delivered'
  | 'failed'
  | 'opened'
  | 'clicked'
  | 'unsubscribed'
  | 'complained'
  | 'stored';

export interface IEmailEvent {
  provider: EmailProviders;
  timestamp: number;
  type: EmailEvents;
}
