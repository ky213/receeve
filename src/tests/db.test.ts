import { expect } from 'chai';
import { IInitRessources, initRessources } from '../../handler';
import { emailEventBody } from './fakers';

describe('EmailEVents Table tests', () => {
  let ressources: IInitRessources;

  beforeAll(() => {
    ressources = initRessources(emailEventBody);
  });

  it('it sould save email event ', async () => {
    const result = await ressources.emailEventModel.save(
      ressources.emailEventObject.getEmailEvent()
    );

    expect(result).not.to.be.null;
  }, 30000);
});
