export function updateOptions( state, payload) {
  state.imageOptions = payload.imageOptions
}

export function updateFilter (state, payload) {
  let newFilter = {...state.imageOptions.filter}
  newFilter.filterName = payload.filterName;
  newFilter.filterParams.filterValue = null;
  state.imageOptions.filter = newFilter
}

export function updateFilterOptions(state, payload) {
  let newFilter = {...state.imageOptions.filter}
  newFilter.filterParams.filterValue = payload.settings;
  state.imageOptions.filter = newFilter
}