export function SET_FONT (state, payload) {
  state.font = payload.font
}

export function updateOptions(state, payload) {
  state.textOptions = payload.data
}

export function updateTechOptions(state, payload) {
  /*let idx = payload.changed;
  let dup = [...state.technologyOptions]
  dup[idx].selected = !state.technologyOptions[idx].selected
  state.technologyOptions = dup*/
  console.log('payload', payload.data)
  state.textOptions.technologies = payload.data
}