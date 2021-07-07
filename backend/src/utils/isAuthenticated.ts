import { AuthChecker } from "type-graphql";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";

export const customAuthChecker: AuthChecker<MyContext> = async ({
  root,
  args,
  context,
  info,
}) => {
  const id = (context.req.session as any).userId;
  const user = await User.findOne({ where: { id } });

  if (user) {
    //the user is authenticated
    return true;
  }

  //User is not authenticated
  return false;
};
