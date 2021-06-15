import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class meResolver {
  @Query(() => User, {
    nullable: true,
  })
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    if (!(ctx.req.session as any).userId!) return undefined;

    return User.findOne((ctx.req.session as any)!.userId);
  }
}
