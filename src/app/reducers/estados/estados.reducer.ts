import { EstadosActions, EstadosActionTypes } from './estados.actions';
import { Estado } from '../../interfaces/Estado';


export interface EstadosState {
  estadosC: Estado[];
  cargados: boolean;
  nombre: string;
}

export const initialState: EstadosState = {
  estadosC: [] ,
  cargados: false,
  nombre: '',
};

export function reducer(state = initialState, action: EstadosActions): EstadosState {
  switch (action.type) {
    case EstadosActionTypes.CargarEstados:
      return { ...state, cargados: false };
    case EstadosActionTypes.EstadosCargados:
      return { ...state, estadosC: action.payload, cargados: true };
    case EstadosActionTypes.CargarNombre:
      return { ...state, nombre: action.payload };
    case EstadosActionTypes.EstadosNoCargados:
      this.message = action.payload;
      break;
    default:
      return state;
  }
}
