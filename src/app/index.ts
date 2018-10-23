import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../environments/environment';
import * as fromLanzamientos from './reducers/lanzamientos/lanzamientos.reducer';
import * as fromEstados from './reducers/estados/estados.reducer';
import * as fromLanzamiento from './reducers/lanzamiento/lanzamiento.reducer';

export interface GlobalState {
  lanzamientos: fromLanzamientos.LanzamientoState;
  estados: fromEstados.EstadosState;
  lanzamiento: fromLanzamiento.LanzamientoState;
}

export const reducers: ActionReducerMap<GlobalState> = {
  lanzamientos: fromLanzamientos.reducer,
  estados: fromEstados.reducer,
  lanzamiento: fromLanzamiento.reducer,
};


export const metaReducers: MetaReducer<GlobalState>[] = !environment.production ? [] : [];