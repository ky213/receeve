import { ClientConfiguration as DynamoDBCONFIG } from 'aws-sdk/clients/dynamodb.d';
import { ClientConfiguration as SNSConfig } from 'aws-sdk/clients/sns.d';

const { IS_OFFLINE, TABLE_NAME } = process.env;
export const EMAIL_PROVIDER: string = 'MailGun';
export const SIGNING_KEY: string = 'MailGunSigningKey';
export const EVENTS_TABLE_NAME = TABLE_NAME || 'receeve-emailevents-local'; // for local tests

export const DynamoDBOptions: DynamoDBCONFIG = IS_OFFLINE
  ? {
      region: 'localhost',
      endpoint: 'http://localhost:4002',
    }
  : undefined;

export const SNSOptions: SNSConfig = IS_OFFLINE
  ? {
      region: 'localhost',
      endpoint: 'http://localhost:4001',
    }
  : undefined;
