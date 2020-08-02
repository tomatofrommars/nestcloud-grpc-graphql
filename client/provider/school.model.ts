import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class School {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  address?: string;
}
