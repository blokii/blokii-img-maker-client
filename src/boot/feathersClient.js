import feathers from "@feathersjs/feathers";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";
import { iff, discard } from "feathers-hooks-common";
import feathersVuex from "feathers-vuex";
import Vue from "vue";
import { socketio } from "@feathersjs/client";

// setting up feathers client to connect to server

const API_URL = process.env.API_URL || "http://localhost:3030";

const socket = io(API_URL, {
  transports: ["websocket"],
  forceNew: true
});

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))
  .hooks({
    before: {
      all: [
        iff(
          context => ["create", "update", "delete"].includes(context.method),
          discard("__id", "__isTemp")
        )
      ]
    }
  });

Vue.prototype.$feathersClient = feathersClient;

export default feathersClient;

// Setting up feathers-vuex
const {
  makeServicePlugin,
  makeAuthPlugin,
  BaseModel,
  models,
  FeathersVuex
} = feathersVuex(feathersClient, {
  serverAlias: "api", // optional for working with multiple APIs (this is the default value)
  idField: "_id", // Must match the id field in your database table/collection
  whitelist: ["$regex", "$options"]
});

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex };
