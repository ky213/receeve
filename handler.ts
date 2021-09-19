import 'source-map-support/register';
import { DynamoDB, SNS } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda';

import { EmailEvent } from './src/entities';
import { EmailEventModel } from './src/models';
import { verifyEmailEvent as validator } from './src/helpers';
import { NotificationService } from './src/services';

export const emailEventHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  try {
    //Parse data
    const emailEventBody = JSON.parse(event.body);

    //create emailEvent object
    const emailEventObject = new EmailEvent({ emailEventBody, validator });

    // create notification service
    const notificationService = new NotificationService({
      client: new SNS({
        endpoint: process.env.SNS_ENDPOINT,
        region: process.env.REGION || 'localhost',
      }),
    });

    //create the emailEvent model
    const emailEventModel = new EmailEventModel({
      client: new DynamoDB.DocumentClient({
        endpoint: process.env.DB_ENDPOINT,
        region: process.env.REGION || 'localhost',
      }),
    });

    //publish email event
    await notificationService.publish({ message: emailEventObject.getEmailEvent() });

    //save copy to database
    // await emailEventModel.save(emailEventObject.getEmailEvent());

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
