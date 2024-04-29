import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp, nextHandler } from "./next-utils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType } from "@trpc/server";
import bodyParser from "body-parser";
import { IncomingMessage } from "http";
import { stripeWebHookHandler } from "./webhooks";
import nextBuild from "next/dist/build";
import path from "path";
import { PayloadRequest } from "payload/types";
import { parse } from "url";
import cors from "cors";

const app = express();

const PORT = Number(process.env.PORT) || 3000;

//Cors added
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_SERVER_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

export type ExpressContext = inferAsyncReturnType<typeof createContext>;
//For Stripe
export type WebHookRequest = IncomingMessage & { rawBody: Buffer };

const start = async () => {
  //For Stripe Communication
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebHookRequest, _, buffer) => {
      req.rawBody = buffer;
    },
  });
  app.post("/api/webhooks/stripe", webhookMiddleware, stripeWebHookHandler);

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL ${cms.getAdminURL()}`);
      },
    },
  });

  //Protect Cart Page
  const cartRouter = express.Router();
  cartRouter.use(payload.authenticate);
  cartRouter.get("/", async (req, res) => {
    const request = req as PayloadRequest;

    if (!request.user) return res.redirect("/sign-in?origin=cart");
    const parsedUrl = parse(req.url, true);
    return nextApp.render(req, res, "/cart", parsedUrl.query);
  });

  app.use("/cart", cartRouter);
  // Cart Router Code is For Security

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info("Next.js is building for production");
      //@ts-expect-error  -this is use to ignore the error, uncomment this and see for yourself
      await nextBuild(path.join(__dirname, "../"));

      process.exit();
    });
    return;
  }

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  app.use((req, res) => nextHandler(req, res));
  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");
    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
