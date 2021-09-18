import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { EmailEvent } from './src/entities';
import { EmailEventsTable } from './src/services';
import { databaseAdapter } from './src/adapters';
import { verifyEmailEvent } from './src/helpers';

export const emailEventHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const emailEvent = new EmailEvent({ emailEvent: body, validator: verifyEmailEvent });
    const client = databaseAdapter({ client: DynamoDB.DocumentClient });
    const emailEventsTable = new EmailEventsTable({ instance: emailEvent, client });

    await emailEventsTable.saveEvent();

    return {
      statusCode: 200,
      body: 'emailevent processed successfully',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'failed to process email event',
        reason: error.message,
      }),
    };
  }
};
