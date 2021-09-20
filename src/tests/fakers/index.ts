import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  IEmailEvent,
  IVendorEmailEvent,
} from '../../types/emailEvent.interface';

export const timeStamp = 1632122593450;

export const emailEvent: IEmailEvent = {
  provider: 'MailGun',
  type: 'opend',
  timestamp: timeStamp,
};

export const emailEventBody: IVendorEmailEvent = {
  signature: {
    token: 'a8ce0edb2dd8301dee6c2405235584e45aa91d1e9f979f3de0',
    timestamp: `${timeStamp}`,
    signature:
      '45390cc9581ac217f5219672116e048458738334df973504eea1101455b3f8f2',
  },
  'event-data': {
    id: 'id',
    event: 'opened',
    timestamp: timeStamp,
  },
};

export const lambdaEvent: APIGatewayProxyEvent = {
  body: JSON.stringify(emailEventBody),
  headers: {},
  multiValueHeaders: {},
  httpMethod: 'post',
  path: 'emailevent',
  isBase64Encoded: false,
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: null,
  resource: '',
};
