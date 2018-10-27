import { Action } from '@ngrx/store';
import { Estado } from '../../interfaces/estado';

export enum EstadoActionTypes {
  CargaEstado = '[Estado] Cargar',
  EstadoCargado = '[Estado] Cargados',
}

export class CargaEstado implements Action {
  readonly type = EstadoActionTypes.CargaEstado;
  constructor(readonly payload: any) {}
}

export class EstadoCargado implements Action {
  readonly type = EstadoActionTypes.EstadoCargado;
  constructor(public readonly payload: Estado[]) { }
}

export type EstadoActions =
  |CargaEstado
  |EstadoCargado;
