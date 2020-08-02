import { Injectable } from '@nestjs/common';
import { School } from '../models/school.model';
import { middleSchool } from './fixtures/user';

@Injectable()
export class SchoolRepository {
  async findOneById(id: number): Promise<School> {
    return middleSchool;
  }

  async updateName(id: number, name: string): Promise<string> {
    this.findOneById(id).then(r => middleSchool.rename(name));
    return 'success';
  }
}
