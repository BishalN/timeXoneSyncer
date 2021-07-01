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
  //there can be null list but we don't allow the non null reminder member inside the list
  @Query((type) => [Reminder!], { nullable: true })
  async getMyReminders(@Ctx() { req }: MyContext) {
    const reminders = await Reminder.find({
      where: { user: (req.session as any).userId },
    });
    return reminders;
  }

  @Authorized()
  @Mutation((type) => Reminder, { nullable: true })
  async deleteReminder(@Arg("id") id: string, @Ctx() { req }: MyContext) {
    const reminder = await Reminder.findOne({ where: { id } });
    if (!reminder) {
      throw new Error("Reminder not found");
    }
    console.log(reminder.user, (req.session as any).userId);
    // console.log((req.session as any).userId, reminder.user);
    //check if the user owns the reminder
    if ((req.session as any).userId === reminder.user) {
      const deletedReminder = await Reminder.delete({ id });
      return deletedReminder;
    } else {
      throw new Error("Unauthorized");
    }
  }
}
