import { SNS } from 'aws-sdk';

export interface INotificationServiceProps {
  client: SNS;
}

export class NotificationService {
  public readonly service: SNS;

  constructor({ client }: INotificationServiceProps) {
    this.service = client;
  }

  public async publish({ topicArn = 'EmailEventsTopic', message }) {
    return this.service
      .publish({
        Message: JSON.stringify(message),
        TopicArn: topicArn,
      })
      .promise();
  }
}
