import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class meResolver {
  @Authorized()
  @Query(() => User, {
    nullable: true,
  })
  async me(@Ctx() { req }: MyContext): Promise<any> {
    console.log("here we are");
    return User.findOne((req.session as any)!.userId);
  }
}
