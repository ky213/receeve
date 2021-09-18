import 'source-map-support/register';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const emailEventHandler: APIGatewayProxyHandler = async (
  event: any,
  _context
) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message:
          'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};