import { RutasActions, RutasActionTypes } from './rutas.actions';
import { Ruta } from '../../interfaces/Ruta';


export interface RutasState {
  idRuta: 0;
  nombre: string;
  cargada: boolean;
}

export const initialState: RutasState = {
  idRuta: 0 ,
  nombre: '',
  cargada: false
};

export function reducer(state = initialState, action: RutasActions): RutasState {
  switch (action.type) {
    case RutasActionTypes.CargarRuta:
      return { ...state };
    case RutasActionTypes.RutaCargada:
      state.cargada = true;
      state.idRuta = action.payload[0];
      state.nombre = action.payload[1];
      return {...state};

      // return { ...state, rutas: action.payload };
    default:
      return state;
  }
}
