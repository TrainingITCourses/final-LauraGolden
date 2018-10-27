import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { EstadoActionTypes, CargaEstado, EstadoCargado } from './estado.actions';
import { mergeMap, map } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';


@Injectable()
export class EstadoEffects {

  @Effect()
  public Carga$ = this.actions$
    .ofType(EstadoActionTypes.CargaEstado)
    .pipe(
      mergeMap((action: CargaEstado) =>
        this.apiService
          .getStateTypes$(action.payload)
          .pipe(map(estado => new EstadoCargado(estado))
      ))
    );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
