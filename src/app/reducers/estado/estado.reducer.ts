import { EstadoActions, EstadoActionTypes } from './estado.actions';
import { Estado } from '../../interfaces/Estado';


export interface EstadoState {
  estado: Estado[];
  cargado: boolean;
}

export const initialState: EstadoState = {
  estado: [] ,
  cargado: false
};

export function reducer(state = initialState, action: EstadoActions): EstadoState {
  switch (action.type) {
    case EstadoActionTypes.CargaEstado:
      return { ...state, cargado: false };
    case EstadoActionTypes.EstadoCargado:
      state.cargado = true;
      state.estado = action.payload;
      return { ...state };
    default:
      return state;
  }
}
