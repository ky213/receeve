import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { EmailEvent } from './src/entities';
import { EmailEventModel } from './src/models';
import { verifyEmailEvent } from './src/helpers';

export const emailEventHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    //Parse data
    const body = JSON.parse(event.body);

    //create emailEvent object
    const emailEvent = new EmailEvent({ emailEvent: body, validator: verifyEmailEvent });

    //create the emailEvent model
    const emailEventModel = new EmailEventModel({
      client: new DynamoDB.DocumentClient({
        region: 'us-east-1',
        endpoint: 'http://localhost:4566',
      }),
    });

    //save object to database
    await emailEventModel.save(emailEvent.getEmailEvent());

    return {
      statusCode: 200,
      body: 'done',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'failed',
        reason: error.message,
      }),
    };
  }
};
