import { DynamoDB } from 'aws-sdk';
import { EmailEvent } from 'entities/emailEvent.entity';

const USERS_TABLE = process.env.USERS_TABLE;
export interface EmailEventsTableProps {
  instance: EmailEvent;
  client: DynamoDB.DocumentClient;
}

export class EmailEventsTable {
  public instance: EmailEvent;
  public client: DynamoDB.DocumentClient;

  constructor({ instance, client }: EmailEventsTableProps) {
    this.instance = instance;
    this.client = client;
  }

  saveEvent() {
    const params = {
      TableName: USERS_TABLE,
      Item: this.instance.getEmailEvent(),
    };

    return this.client.put(params).promise();
  }
}
