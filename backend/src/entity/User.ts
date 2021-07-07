import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Reminder } from "./Reminder";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field((type) => String)
  @Column("varchar", { length: 255 })
  username: string;

  @Field((type) => String, { nullable: true })
  @Column("varchar", { unique: true, nullable: true })
  email: string | null;

  @Field()
  @Column("text", { nullable: true })
  profilePicture: string;

  @Column("text", { nullable: true })
  googleId: string;

  @Column("text", { nullable: true })
  facebookId: string;

  @Column("text", { nullable: true })
  discordId: string;

  @Column("text", { nullable: true })
  stripeId: string | null;

  @Column("text", { default: "free-trial" })
  type: string;

  @Column("text", { nullable: true })
  ccLast4: string | null;

  @OneToMany(() => Reminder, (notification) => notification.user)
  reminders: Reminder[];
}
