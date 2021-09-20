import { SIGNING_KEY } from '../config/contants';
import {
  EmailEventValidator,
  IVendorEmailEvent,
} from '../types/emailEvent.interface';

const crypto = require('crypto');

export const generateEncodedToken = (
  timestamp: string,
  token: string
): string =>
  crypto
    .createHmac('sha256', SIGNING_KEY)
    .update(timestamp.concat(token))
    .digest('hex');

export const verifyEmailEvent: EmailEventValidator = (
  data: IVendorEmailEvent
): boolean => {
  const {
    signature: { timestamp, token, signature },
  } = data;

  const encodedToken = generateEncodedToken(timestamp, token);

  return encodedToken === signature;
};
