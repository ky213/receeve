import { DynamoDB } from 'aws-sdk';

export interface IDatabaseAdapterProps {
  client: DynamoDB.DocumentClient | any;
}

export const databaseAdapter = ({ client }: IDatabaseAdapterProps) => ({
  save: client.put,
});
