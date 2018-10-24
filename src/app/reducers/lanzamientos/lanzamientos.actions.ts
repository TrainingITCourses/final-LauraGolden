import { Action } from '@ngrx/store';

export enum LanzamientosActionTypes {
  CargarLanzamientos = '[Lanzamientos] Cargar',
  LanzamientosCargados = '[Lanzamientos] Cargados',
  LanzamientosNoCargados = '[Lanzamientos] No Cargados',
  OrdenarFechaD = '[Lanzamientos] Ordenar Fecha más Reciente',
  OrdenarFechaA = '[Lanzamientos] Ordenar Fecha más Antigua'
}

export class OrdenarFechaD implements Action {
  readonly type = LanzamientosActionTypes.OrdenarFechaD;
}

export class OrdenarFechaA implements Action {
  readonly type = LanzamientosActionTypes.OrdenarFechaA;
}

export class CargarLanzamientos implements Action {
  readonly type = LanzamientosActionTypes.CargarLanzamientos;
  constructor(readonly payload: any) {}
}

export class LanzamientosCargados implements Action {
  readonly type = LanzamientosActionTypes.LanzamientosCargados;
  constructor(readonly payload: any[]) {}
}

export class LanzamientosNoCargados implements Action {
  readonly type = LanzamientosActionTypes.LanzamientosNoCargados;
  constructor(readonly payload: string) {}
}

export type LanzamientosActions =
  | CargarLanzamientos
  | LanzamientosCargados
  | LanzamientosNoCargados
  | OrdenarFechaD
  | OrdenarFechaA;



