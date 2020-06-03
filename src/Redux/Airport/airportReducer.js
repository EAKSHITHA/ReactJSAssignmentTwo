import { T_TYPE } from '../../_services/_utils/utils'
import AirportData from '../../Database/airport.json'

let initialState = {
    airportList: AirportData,
    quantity: 0
}

const airportReducer = (state = initialState, action) => {
     let airport = state.airportList.find(x => x.AirportId == action.payload.AirportId)
    // let quantity = state.quantity
    // let available = airport.fuelCapacity - state.Quantity
    // switch(action.type) {
    //     case T_TYPE.inout:
    //         return { ...state, airportList: [...state.airportList.filter(x => x !== airport), { ...airport, fuelAvaliable: quantity - available}] }
    //     case T_TYPE.outin:
    //         return { ...state, airportList: [...state.airportList.filter(x => x !== airport), { ...airport, fuelAvaliable: quantity + available}] }
    //     default: return state
    //return { ...state, airportList: ...temp}
    //     }
    switch(action.type) {
        case 'GET':
            return state.airportList
        default: return state
    }
}

export default airportReducer