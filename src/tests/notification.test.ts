import { expect } from 'chai';
import { IInitRessources, initRessources } from '../../handler';
import { emailEventBody } from './fakers';

describe('Notifications tests', () => {
  let ressources: IInitRessources;

  beforeAll(() => {
    ressources = initRessources(emailEventBody);
  });

  it('it sould pulish email event notification', async () => {
    const result = await ressources.notificationService.publish({
      topicArn: 'EmailEvents',
      message: ressources.emailEventObject.getEmailEvent(),
    });

    return expect(result?.MessageId).not.to.be.empty;
  });
});
