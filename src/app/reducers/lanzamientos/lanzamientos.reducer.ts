import { Action } from '@ngrx/store';
import { Lanzamiento } from '../../interfaces/lanzamiento';
import { LanzamientosActions, LanzamientosActionTypes } from './lanzamientos.actions';

export interface LanzamientoState {
  lanzamientos: Lanzamiento[];
  mensaje?: string;
  cargados: boolean;
}

export const initialState: LanzamientoState = {
  lanzamientos: [],
  mensaje: '',
  cargados: false,
};

export function reducer(state = initialState, action: LanzamientosActions): LanzamientoState {
  switch (action.type) {
    case LanzamientosActionTypes.CargarLanzamientos:
      return {...state, cargados: false};
    case LanzamientosActionTypes.LanzamientosCargados:
      state.lanzamientos = action.payload;
      state.mensaje = null;
      return {...state, cargados: true };
    case LanzamientosActionTypes.LanzamientosNoCargados:
      state.lanzamientos = [];
      state.mensaje = action.payload;
      return { ...state };
    default:
      return {...state };
  }
}
