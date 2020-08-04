import { NotFoundException, OnModuleInit } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { join } from 'path';
import { SchoolService } from '../interfaces/school-service.interface';
import { School } from './school.model';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';

const pubSub = new PubSub();

@Resolver(() => School)
export class SchoolResolver implements OnModuleInit {

  private schoolService: SchoolService;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'school',
      protoPath: join(__dirname, '../interfaces/school-service.proto'),
    },
  })
  client: ClientGrpc;

  onModuleInit() {
    this.schoolService = this.client.getService<SchoolService>('SchoolService');
  }

  @Query(() => School)
  async getById(@Args('id') id: number) {
    const school = await this.schoolService.get({ id }).toPromise();
    console.log('playground:' + school.school);
    if (!school) {
      throw new NotFoundException(id);
    }
    return school.school;
  }

  @Mutation(() => String)
  async renameSchool(@Args('id') id: number, @Args('name') name: string) {
    const result = await this.schoolService.rename({ id, name }).toPromise();
    if (!result) {
      return 'failed';
    }

    pubSub.publish('nameUpdate', { nameUpdate: id + ' ' + name });
    return result.result + ' ' + name;
  }

  @Subscription(() => String)
  nameUpdated() {
    return pubSub.asyncIterator('nameUpdate');
  }

}
