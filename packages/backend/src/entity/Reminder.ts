import { MaxLength, MinLength } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Reminder extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  title: string;

  @Field()
  @Column("text")
  date: string;

  @Field()
  @Column("text")
  timeZone: string;

  @Field((type) => String, { nullable: true })
  @ManyToOne(() => User, (user) => user.reminders)
  user: User;
}
