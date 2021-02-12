import { combineReducers } from 'redux'
import Seasons from './SeasonsReducer'

const allReducers = combineReducers({
  seasons: Seasons
})

export default allReducers;