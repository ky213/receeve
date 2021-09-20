import 'source-map-support/register';
import { DynamoDB, SNS } from 'aws-sdk';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from 'aws-lambda';

import { EmailEvent } from './src/entities';
import { EmailEventModel } from './src/models';
import { verifyEmailEvent as validator } from './src/helpers';
import { NotificationService } from './src/services';
import { IVendorEmailEvent } from './src/types/emailEvent.interface';

export const initRessources = (emailEventBody: IVendorEmailEvent) => {
  //create emailEvent object
  const emailEventObject = new EmailEvent({ emailEventBody, validator });

  //create the emailEvent model
  const emailEventModel = new EmailEventModel({
    client: new DynamoDB.DocumentClient({
      endpoint: process.env.DB_ENDPOINT,
      region: process.env.REGION || 'localhost',
    }),
  });

  // create notification service
  const notificationService = new NotificationService({
    client: new SNS({
      endpoint: process.env.SNS_ENDPOINT || 'http://localhost:4001',
      region: process.env.REGION || 'localhost',
    }),
  });

  return { emailEventObject, notificationService, emailEventModel };
};

export type IInitRessources = ReturnType<typeof initRessources>;

export const emailEventHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    //Parse data
    const emailEventBody: IVendorEmailEvent = JSON.parse(event.body);

    // init ressources
    const { emailEventObject, notificationService } =
      initRessources(emailEventBody);

    //publish email event
    await notificationService.publish({
      message: emailEventObject.getEmailEvent(),
    });

    // save copy to database
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
