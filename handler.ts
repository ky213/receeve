import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { EmailEvent } from './src/entities';
import { EmailEventModel } from './src/models';
import { verifyEmailEvent as validator } from './src/helpers';

export const emailEventHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    //Parse data
    const emailEventBody = JSON.parse(event.body);

    //create emailEvent object
    const emailEventObject = new EmailEvent({ emailEventBody, validator });

    //create the emailEvent model
    const emailEventModel = new EmailEventModel({
      client: new DynamoDB.DocumentClient({
        endpoint: process.env.DB_ENDPOINT,
        region: 'localhost',
      }),
    });

    //save object to database
    await emailEventModel.save(emailEventObject.getEmailEvent());

    //publish object

    return {
      statusCode: 200,
      body: 'done',
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'failed',
        reason: error,
      }),
    };
  }
};
