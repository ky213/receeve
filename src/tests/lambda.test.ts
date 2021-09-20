import { expect } from 'chai';

import { lambdaEvent } from './fakers';
import { emailEventHandler } from '../../handler';

describe('Handler tests', () => {
  it('it sould return a success response', async () => {
    const response = await emailEventHandler(lambdaEvent, null, null);
    //@ts-ignore
    expect(response.statusCode).to.equal(200);
  }, 30000);
});
