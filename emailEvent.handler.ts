import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { EmailEvent } from 'entities';
import { EmailEventsTable } from 'services';
import { databaseAdapter } from 'adapters';
import { verifyEmailEvent } from 'helpers';

const client = databaseAdapter({ client: DynamoDB.DocumentClient });

export const emailEventHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = JSON.parse(event.body);
    const emailEvent = new EmailEvent({ emailEvent: body, validator: verifyEmailEvent });
    const emailEventsTable = new EmailEventsTable({ instance: emailEvent, client });

    await emailEventsTable.saveEvent();
  } catch (error) {
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
