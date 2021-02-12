const SeasonsIdReducer = (state = [], action) => {
  switch (action.type) {
    case 'SEASONID':
      return action.seasonId
    default:
      return state;
  }
}

export default SeasonsIdReducer;