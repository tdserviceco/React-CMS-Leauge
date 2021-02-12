const SeasonsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SEASONS':
      return action.seasons
    default:
      return state;
  }
}

export default SeasonsReducer;