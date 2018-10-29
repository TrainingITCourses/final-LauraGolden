import { Action } from '@ngrx/store';
import { Estado } from '../../interfaces/estado';

export enum EstadosActionTypes {
  CargarEstados = '[Estados] Cargar',
  EstadosCargados = '[Estados] Cargados',
  EstadosNoCargados = '[Estados] No Cargados',
  CargarNombre = '[Estados] Estado Actual',
}

export class CargarEstados implements Action {
  readonly type = EstadosActionTypes.CargarEstados;
}

export class EstadosCargados implements Action {
  readonly type = EstadosActionTypes.EstadosCargados;
  constructor(public readonly payload: Estado[]) { }
}

export class CargarNombre implements Action {
  readonly type = EstadosActionTypes.CargarNombre;
  constructor(public readonly payload: string) { }
}

export class EstadosNoCargados implements Action {
  readonly type = EstadosActionTypes.EstadosNoCargados;
  constructor(public readonly payload: string) { }
}
export type EstadosActions =
  |CargarEstados
  |EstadosCargados
  |EstadosNoCargados
  |CargarNombre;
