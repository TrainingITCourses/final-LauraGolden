import { Action } from '@ngrx/store';

export enum LanzamientoActionTypes {
  CargarLanzamiento = '[Lanzamiento] Cargar Lanzamiento',
  LanzamientoCargado = '[Lanzamiento] Lanzamiento Cargado',
  LanzamientoNoCargado = '[Lanzamiento] Lanzamiento No Cargado'
}

export class CargarLanzamiento implements Action {
  readonly type = LanzamientoActionTypes.CargarLanzamiento;
  constructor(readonly payload: any) {}
}
export class LanzamientoCargado implements Action {
  readonly type = LanzamientoActionTypes.LanzamientoCargado;
  constructor(readonly payload: any[]) {}
}

export class LanzamientoNoCargado implements Action {
  readonly type = LanzamientoActionTypes.LanzamientoNoCargado;
  constructor(readonly payload: string) {}
}

export type LanzamientoActions =
  |CargarLanzamiento
  | LanzamientoCargado
  | LanzamientoNoCargado;
