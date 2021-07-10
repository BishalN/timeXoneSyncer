import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { Reminder } from "../../entity/Reminder";
import { getConnection } from "typeorm";

@Resolver()
export class reminderResolver {
  @Authorized()
  @Mutation(() => Boolean, {
    nullable: true,
  })
  async setReminder(
    @Ctx() { req }: MyContext,
    @Arg("title") title: string,
    @Arg("userSetDate") userSetDate: string,
    @Arg("date") date: string
  ): Promise<boolean> {
    const userId = (req.session as any).userId;
    try {
      const reminder = Reminder.create({
        date,
        title,
        user: userId,
        userSetDate,
      });
      await reminder.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  @Authorized()
  @Query((type) => [Reminder!], { nullable: true })
  async getMyReminders(@Ctx() { req }: MyContext) {
    const reminders = await Reminder.find({
      where: { user: (req.session as any).userId },
    });
    return reminders;
  }

  @Authorized()
  @Mutation((type) => Boolean, { nullable: true })
  async deleteReminder(@Arg("id") id: string, @Ctx() { req }: MyContext) {
    const reminder = await getConnection()
      .createQueryBuilder(Reminder, "reminder")
      .leftJoinAndSelect("reminder.user", "user")
      .where("reminder.id =:id", { id })
      .getOne();

    if (!reminder) {
      throw new Error("Reminder not found");
    }

    //check if the user who is making request owns the reminder
    if ((req.session as any).userId === reminder.user.id) {
      await Reminder.delete({ id });
      return true;
    } else {
      throw new Error("Unauthorized");
    }
  }
}
