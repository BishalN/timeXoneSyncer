import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Reminder } from "../../entity/Reminder";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class reminderResolver {
  @Authorized()
  @Mutation(() => Boolean, {
    nullable: true,
  })
  async setReminder(
    @Ctx() { req }: MyContext,
    @Arg("title", { validate: true }) title: string,
    @Arg("description", { nullable: true }) description: string,
    @Arg("date") date: string
  ): Promise<boolean> {
    const userId = (req.session as any).userId;
    try {
      const reminder = Reminder.create({
        date,
        description,
        title,
        user: userId,
      });
      await reminder.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  @Authorized()
  //there can be null list but we don't allow the non null reminder member inside the list
  @Query((type) => [Reminder!], { nullable: true })
  async getMyReminders(@Ctx() { req }: MyContext) {
    const reminders = await Reminder.find({
      where: { user: (req.session as any).userId },
    });

    return reminders;
  }
}
