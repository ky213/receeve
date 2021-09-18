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

export interface IVendorEmailEvent {
  signature: {
    timestamp: string;
    token: string;
    signature: string;
  };
  'event-data': {
    id: string;
    event: EmailEvents;
    timestamp: number;
  };
}

export type EmailEventValidator = (emailEvent: IVendorEmailEvent) => boolean;
