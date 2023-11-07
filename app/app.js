'use strict'

// const path = require('node:path')
// const AutoLoad = require('@fastify/autoload')

// // Pass --options via CLI arguments in command to enable these options.
// const options = {}

// module.exports = async function (fastify, opts) {
//   // Place here your custom code!

//   // Do not touch the following lines

//   // This loads all plugins defined in plugins
//   // those should be support plugins that are reused
//   // through your application
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'plugins'),
//     options: Object.assign({}, opts)
//   })

//   // This loads all plugins defined in routes
//   // define your routes in one of these
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, 'routes'),
//     options: Object.assign({}, opts)
//   })
// }

// module.exports.options = options

import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";

import { createContext } from "./context";
import { appRouter } from "./router";

const app = fastify({ maxParamLength: 5000 });

app.register(cors, { origin: "*" });

app.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: { router: appRouter, createContext },
});

(async () => {
  try {
    await app.listen({ port: 5000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();