import { LanzamientoActions, LanzamientoActionTypes } from './lanzamiento.actions';
import { Lanzamiento } from '../../interfaces/lanzamiento';

export interface LanzamientoState {
  lanzamiento: Lanzamiento[];
  cargado: boolean;
  mensaje?: string;
}

export const initialState: LanzamientoState = {
  lanzamiento: [],
  cargado: false
};

export function reducer(state = initialState, action: LanzamientoActions): LanzamientoState {
  switch (action.type) {
    case LanzamientoActionTypes.CargarLanzamiento:
      return {...state, cargado: false};
    case LanzamientoActionTypes.LanzamientoCargado:
      state.lanzamiento = action.payload;
      return {...state, cargado: true };
    case LanzamientoActionTypes.LanzamientoNoCargado:
      state.lanzamiento = [];
      return { ...state };
    default:
      return {...state };
  }
}

