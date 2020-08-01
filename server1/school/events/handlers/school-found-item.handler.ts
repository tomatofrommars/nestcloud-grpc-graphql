import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { SchoolRenameEvent } from '../impl/school-rename.event';

@EventsHandler(SchoolRenameEvent)
export class SchoolFoundItemHandler implements IEventHandler<SchoolRenameEvent> {
  handle(event: SchoolRenameEvent) {
    console.log(clc.yellowBright('Async SchoolRenameEvent...'));
  }
}
