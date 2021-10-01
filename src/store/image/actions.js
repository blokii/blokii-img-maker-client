import feathersClient from "../../boot/feathersClient";

export async function save({ commit, rootState }, payload) {
  await feathersClient.service("images").create({
    filename: rootState.global.filename,
    settings: {
      textOptions: rootState.text.textOptions,
      imageOptions: rootState.image.imageOptions
    }
  });
}
