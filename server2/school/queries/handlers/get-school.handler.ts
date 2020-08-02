import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { SchoolRepository } from '../../repository/school.repository';
import { GetSchoolQuery } from '../impl';
import {School} from '../../models/school.model';

@QueryHandler(GetSchoolQuery)
export class GetSchoolHandler implements IQueryHandler<GetSchoolQuery> {
  constructor(private readonly repository: SchoolRepository) {}

  async execute(query: GetSchoolQuery) {
    console.log(clc.yellowBright('Async GetSchoolQuery...' + query.id));
    return this.repository.findOneById(query.id);
  }
}
