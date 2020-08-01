import { AggregateRoot } from '@nestjs/cqrs';
import { SchoolRenameEvent } from '../events/impl/school-rename.event';

export class School extends AggregateRoot {
  constructor(readonly id: number, private name: string) {
    super();
  }

  rename(name: string) {
    this.name = name
    this.apply(new SchoolRenameEvent(this.id, name));
  }
}
