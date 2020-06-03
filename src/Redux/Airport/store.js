import { createStore } from 'redux'
import airportReducer from './airportReducer'

const store = createStore(airportReducer)

export default store