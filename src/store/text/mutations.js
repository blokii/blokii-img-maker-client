export function SET_FONT(state, opts) {
  state.font = opts.font;
}

export function updateOptions(state, opts) {
  state.textOptions = opts.data;
}

export function updateTechOptions(state, techOpts) {
  state.textOptions.technologies = techOpts.data;
}

export function setTextOptions(state, opts) {
  state.textOptions = opts;
}

export function clear(state) {
  state.textOptions = {
    font: "Lato",
    title: "",
    subtitle: "",
    author: "",
    titleColor: "#000",
    subtitleColor: "#555",
    authorColor: "#000",
    titleStrokeColor: "#000",
    subtitleStrokeColor: "#000",
    authorStrokeColor: "#000",
    technologies: []
  };
}
