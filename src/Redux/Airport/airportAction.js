import { T_TYPE }  from '../../_services/_utils/utils'

export const GetAirport = (airport) => {
    return {
        type: 'GET'
    }
}

export const AddFuel = (airport,quantity) => {
    return {
        type: T_TYPE.outin,
        payload: airport,
        quan: quantity
    }
}

export const RemoveFuel = (airport) => {
    return {
        type: T_TYPE.inout,
        payload: airport
    }
}