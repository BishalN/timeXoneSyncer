import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1625965601000 implements MigrationInterface {
    name = 'Initial1625965601000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(255) NOT NULL, "email" character varying, "profilePicture" text, "googleId" text, "facebookId" text, "discordId" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reminder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "date" text NOT NULL, "userSetDate" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_9ec029d17cb8dece186b9221ede" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reminder" ADD CONSTRAINT "FK_c4cc144b2a558182ac6d869d2a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reminder" DROP CONSTRAINT "FK_c4cc144b2a558182ac6d869d2a4"`);
        await queryRunner.query(`DROP TABLE "reminder"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
