import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { SchoolController } from './school.controller';
import { QueryHandlers } from './queries/handlers';
import { SchoolRepository } from './repository/school.repository';

@Module({
  imports: [CqrsModule],
  controllers: [SchoolController],
  providers: [
    SchoolRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class SchoolModule {}
