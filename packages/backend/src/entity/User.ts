import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  username: string;

  @Column("varchar", { unique: true, nullable: true })
  email: string | null;

  @Column("text", { nullable: true })
  profilePicture: string;

  @Column("text", { nullable: true })
  googleId: string;

  @Column("text", { nullable: true })
  facebookId: string;

  @Column("text", { nullable: true })
  discordId: string;
}
