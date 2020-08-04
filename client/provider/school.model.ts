import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class School {
  @Field({ nullable: false })
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  address?: string;
}
