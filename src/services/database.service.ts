import { DynamoDB } from 'aws-sdk';

import { EmailEvent } from 'entities';
import { DatabaseAdapter } from 'adapters';

const USERS_TABLE = process.env.USERS_TABLE;
export interface IEmailEventsTableProps {
  instance: EmailEvent;
  client: DynamoDB.DocumentClient;
}

export class EmailEventsTable {
  public instance: EmailEvent;
  public client: DatabaseAdapter;

  constructor({ instance, client }: IEmailEventsTableProps) {
    this.instance = instance;
    this.client = client;
  }

  async saveEvent() {
    const params = {
      TableName: USERS_TABLE,
      Item: this.instance.getEmailEvent(),
    };

    return this.client.save(params).promise();
  }
}
