// import Stripe from "stripe";
// import User from "../models/user.model.js";

// export const stripeWebHook = async (req, res) => {
//   const sign = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = Stripe.webhooks.constructEvent(
//       req.body,
//       sign,
//       process.env.WEBHOOK_SECRET,
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Webhook error" });
//   }
//   if (event.type == "checkout.session.completed") {
//     const session = event.data.object;
//     const userId = session.metadata.userId;
//     const credits = Number(session.metadata.credits);
//     const plan = session.metadata.plan;
//     await User.findByIdAndDelete(userId, {
//       $inc: { credits: credits },
//       plan: plan,
//     });
//   }
//   return res.json({ received: true });
// };

import Stripe from "stripe";
import User from "../models/user.model.js";

export const stripeWebHook = async (req, res) => {
  const sign = req.headers["stripe-signature"];
  let event;

  try {
    event = Stripe.webhooks.constructEvent(
      req.body,
      sign,
      process.env.WEBHOOK_SECRET,
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Webhook error" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);
    const plan = session.metadata.plan;

    await User.findByIdAndUpdate(
      userId,
      {
        $inc: { credits: credits },
        plan: plan,
      },
      { new: true },
    );
  }

  return res.json({ received: true });
};
