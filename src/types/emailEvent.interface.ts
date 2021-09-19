export interface IEmailEvent {
  provider: string;
  timestamp: number;
  type: string;
}

export interface IVendorEmailEvent {
  signature: {
    timestamp: string;
    token: string;
    signature: string;
  };
  'event-data': {
    id: string;
    event: string;
    timestamp: number;
  };
}

export type EmailEventValidator = (emailEvent: IVendorEmailEvent) => boolean;
