# NestCloud + GRPC + CQRS + GraphQL

A NodeJS micro-service solution based on Consul, writing by Typescript language and NestJS framework.


## Precondition

* Node.js > 10.0.0
* Consul in port 8500 needed

## How to run

```bash
yarn
yarn run start:server1
yarn run start:server2
yarn run start:client
```

## Endpoint 
* Get School http://localhost:3004/school/get/1234
* Rename School name http://lcalhost:3004/school/rename?id=1234&name=test
* GraphQL Playground http://127.0.0.1:3004/graphql

Playground: getById
 ```
{
  getById(id: 1234) {
    name
  }
}
```
Playground: renameSchool
```
mutation {
  renameSchool(id: 1234, name: "aaaeeea")
}
```