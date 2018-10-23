import { EstadosActions, EstadosActionTypes } from './estados.actions';
import { Estado } from '../../interfaces/Estado';


export interface EstadosState {
  estados: Estado[];
  cargados: boolean;
}

export const initialState: EstadosState = {
  estados: [] ,
  cargados: false
};

export function reducer(state = initialState, action: EstadosActions): EstadosState {
  switch (action.type) {
    case EstadosActionTypes.CargarEstados:
      return { ...state, cargados: false };
    case EstadosActionTypes.EstadosCargados:
      return { ...state, estados: action.payload, cargados: true };
    case EstadosActionTypes.EstadosNoCargados:
      this.message = action.payload;
      break;
    default:
      return state;
  }
}
