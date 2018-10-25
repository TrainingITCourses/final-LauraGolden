import { Action } from '@ngrx/store';
import { Ruta } from '../../interfaces/ruta';

export enum RutasActionTypes {
  CargarRuta = '[Rutas] Cargar',
  RutaCargada = '[Rutas] Cargada',
}

export class CargarRuta implements Action {
  readonly type = RutasActionTypes.CargarRuta;
  constructor(readonly payload: Ruta) {}
}

export class RutaCargada implements Action {
  readonly type = RutasActionTypes.RutaCargada;
  constructor(public readonly payload: Ruta) { }
}

export type RutasActions =
  |CargarRuta
  |RutaCargada;
