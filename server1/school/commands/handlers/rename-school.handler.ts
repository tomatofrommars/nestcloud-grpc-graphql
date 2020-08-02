import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { SchoolRepository } from '../../repository/school.repository';
import { RenameSchoolCommand } from '../impl/rename-school.command';

@CommandHandler(RenameSchoolCommand)
export class RenameSchoolHandler implements ICommandHandler<RenameSchoolCommand> {
  constructor(
    private readonly repository: SchoolRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: RenameSchoolCommand) {
    console.log(clc.greenBright('RenameSchoolCommand...'));

    const { id, name } = command;
    const middleSchool = this.publisher.mergeObjectContext(
        await this.repository.findOneById(id),
    );
    middleSchool.rename(name);
    middleSchool.commit();
    return 'success';
  }
}
