import { GrpcClient, RpcClient, Service } from '@nestcloud/grpc';
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { join } from 'path';
import { SchoolService } from '../interfaces/school-service.interface';
import { School } from './school.model';

const pubSub = new PubSub();
const rpcOptions = {
  service: 'rpc-server',
  package: 'school',
  protoPath: join(__dirname, '../interfaces/school-service.proto'),
};

@Resolver(of => School)
export class SchoolResolver {
  @RpcClient(rpcOptions)
  private readonly client: GrpcClient;
  @Service('SchoolService', rpcOptions)
  private schoolService: SchoolService;

  @Query(returns => School)
  async getById(@Args('id') id: number) {
    const school = await this.schoolService.get({ id }).toPromise();
    console.log('playground:' + school.school);
    if (!school) {
      throw new NotFoundException(id);
    }
    return school.school;
  }

  @Mutation(returns => String)
  async renameSchool(@Args('id') id: number, @Args('name') name: string) {
    const result = await this.schoolService.rename({ id, name }).toPromise();
    if (!result) {
      return 'failed';
    }

    pubSub.publish('nameUpdate', { nameUpdate: id + ' ' + name });
    return result.result + ' ' + name;
  }

  @Subscription(returns => String)
  nameUpdated() {
    return pubSub.asyncIterator('nameUpdate');
  }

}
