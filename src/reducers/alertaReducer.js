import {
    
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

// Cada reducer tiene su propio state
const inicialSate = {
    alerta : null
}

export default function (state = inicialSate, action){

    switch(action.type){

        case MOSTRAR_ALERTA:
            return ({
                ...state,
                alerta : action.payload
            })
        case OCULTAR_ALERTA:
            return({
                ...state,
                alerta : null
            })

        default:
            return state;
    }
}