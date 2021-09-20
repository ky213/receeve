# EmailEvents notifier with serverless framework and AWS


## Setup

```bash
npm install
```
# Serverless offline

## install local dynamoDB instance

```bash
serverless dynamodb install 
```

## start local dynamoDB instance

```bash
serverless dynamodb start 
```

## crate  table

after dynamodb started locally, go to http://localhost:4002/shell and create a receeve-emailevents-loca table using this schema:

```bash
{
  "TableName": "receeve-emailevents-local",
  "KeySchema": [
    {
      "AttributeName": "id",
      "KeyType": "HASH"
    }
  ],
  "AttributeDefinitions": [
    {
      "AttributeName": "id",
      "AttributeType": "S"
    }
  ],
  "ProvisionedThroughput": {
    "ReadCapacityUnits": 1,
    "WriteCapacityUnits": 1
  },
  "GlobalSecondaryIndexes": [
    {
      "IndexName": "index_name_1",
      "KeySchema": [
        {
          "AttributeName": "id",
          "KeyType": "HASH"
        }
      ],
      "Projection": {
        "ProjectionType": "INCLUDE",
        "NonKeyAttributes": ["attribute_name_1"]
      },
      "ProvisionedThroughput": {
        "ReadCapacityUnits": 1,
        "WriteCapacityUnits": 1
      }
    }
  ]
}
```

## start serverless offline

```bash
npm run start
```

## Build

```bash
npm run build
```

## Deploy locally

```bash
npm run deploy:local
```

## Deploy on staging (on cloud)

```bash
npm run deploy:staging
```

## test on cloud

```bash
npm run test
```

## test locally

```bash
npm run test:offline
```

