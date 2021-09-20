import { DocumentClient } from 'aws-sdk/clients/dynamodb.d';
import { EVENTS_TABLE_NAME } from '../config/contants';
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
        TableName: EVENTS_TABLE_NAME,
        Item: {
          id: getUUID(),
          ...object,
        },
      })
      .promise();
  }
}
