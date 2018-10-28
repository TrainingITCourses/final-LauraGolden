import { RutasActions, RutasActionTypes } from './rutas.actions';
import { Ruta } from '../../interfaces/Ruta';


export interface RutasState {
  // idRuta: 0;
  // nombre: string;
  cargada: boolean;
  mensaje: string;
  botonVolver: boolean;
  botonFechas: boolean;
  idEstado: number;
}

export const initialState: RutasState = {
  // idRuta: 0 ,
  // nombre: '',
  cargada: false,
  mensaje: '',
  botonVolver: false,
  botonFechas: false,
  idEstado: 0,
};

export function reducer(state = initialState, action: RutasActions): RutasState {
  switch (action.type) {
    case RutasActionTypes.CargarRuta:
      state.cargada = true;
      state.mensaje = action.payload[0];
      state.botonVolver = action.payload[1];
      state.botonFechas = action.payload[2];
      state.idEstado = action.payload[3];
      return { ...state };
    default:
      return state;
  }
}
