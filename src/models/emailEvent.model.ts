import { DocumentClient } from 'aws-sdk/clients/dynamodb.d';
import { getUUID } from '../helpers';
import { IEmailEvent } from '../types/emailEvent.interface';

export interface IDatabaseAdapterProps {
  client: DocumentClient | any;
}
//Todo: singlton pattern
export class EmailEventModel {
  public client: DocumentClient;

  constructor({ client }: IDatabaseAdapterProps) {
    this.client = client;
  }

  save(object: IEmailEvent) {
    return this.client
      .put({
        TableName: process.env.TABLE_NAME || 'EmailEvent',
        Item: {
          id: getUUID(),
          ...object,
        },
      })
      .promise();
  }
}
