import feathers from "@feathersjs/feathers";
import io from "socket.io-client";
import auth from "@feathersjs/authentication-client";
import { iff, discard } from "feathers-hooks-common";
import feathersVuex from "feathers-vuex";
import Vue from "vue";
import { socketio } from "@feathersjs/client";

// This pseudo hack works since I'm currently deploying everything in th backend public directory.
// TODO: Have separate CI/CD for frontend/backend
const API_URL = window.location.protocol + "//" + window.location.host + "/";
//const API_URL = "http://localhost:3030";

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
