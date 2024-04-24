import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import type Stripe from "stripe";

export const paymentRouter = router({
  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      let { productIds } = input;

      if (productIds.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No products selected",
        });
      }

      const payload = await getPayloadClient();

      const { docs: products } = await payload.find({
        collection: "products",
        where: {
          id: {
            in: productIds,
          },
        },
      });

      //filter the products
      const filteredProducts = products.filter((prod) => Boolean(prod.priceId));
      //declare the ordered products
      const order = await payload.create({
        collection: "orders",
        data: {
          _isPaid: false,
          products: filteredProducts,
          user: user.id,
        },
      });

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      filteredProducts.forEach((product) => {
        line_items.push({
          price: product.priceId!,
          quantity: 1,
        });
      });

      line_items.push({
        //From Stripe Create Products Page
        price: "price_1P90SZSB59offld6jC1NXY82",
        quantity: 1,
        //disabling multiple transaction fee
        adjustable_quantity: {
          enabled: false,
        },
      });
      try {
        const stripeSession = await stripe.checkout.sessions.create({
          //if payment is successful
          success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          //if payment is cancelled
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ["card", "amazon_pay", "paypal", "mobilepay"],
          mode: "payment",
          //to unlock the items
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items,
        });
      } catch (error) {}
    }),
});
