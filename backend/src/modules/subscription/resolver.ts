import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";
import { stripe } from "../../utils/stripe";

@Resolver()
export class subscriptionResolver {
  @Authorized()
  @Mutation(() => User, {
    nullable: true,
  })
  async createSubscription(
    @Ctx() { req }: MyContext,
    @Arg("source") source,
    @Arg("ccLast4") ccLast4: string
  ) {
    const UserId = (req.session as any).userId;
    const user = await User.findOne(UserId);

    let stripeId = user.stripeId;
    if (!stripeId) {
      const customer = await stripe.customers.create({
        email: user.email,
        source,
      });
      await stripe.subscriptions.create({
        customer: user.stripeId,
        //gotta be dynamic based of the arguments
        items: [{ price: process.env.STRIPE_YEARLY_PRICE }],
      });

      stripeId = customer.id;
    } else {
      // update customer
      await stripe.customers.update(stripeId, {
        source,
      });
      await stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            price: process.env.STRIPE_YEARLY_PRICE,
          },
        ],
      });
    }

    user.stripeId = stripeId;
    user.type = "paid";
    user.ccLast4 = ccLast4;
    await user.save();

    return user;
  }
}
