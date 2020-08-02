import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';

import { RenameSchoolCommand } from './commands/impl/rename-school.command';
import { GetSchoolRequest, GetSchoolResponse, RenameResponse, School } from './interfaces/schroll.interface';
import { GetSchoolQuery } from './queries/impl';

@Controller('school')
export class SchoolController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('SchoolService')
  async get(request: GetSchoolRequest): Promise<GetSchoolResponse> {
    return {
      school: await this.queryBus.execute(new GetSchoolQuery(request.id)),
    };
  }

  @GrpcMethod('SchoolService')
  async rename(request: School): Promise<RenameResponse> {
    console.log(request);
    return {
      result: await this.commandBus.execute(new RenameSchoolCommand(request.id, request.name)),
    };
  }
}
