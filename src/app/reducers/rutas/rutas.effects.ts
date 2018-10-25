import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { RutasActionTypes, CargarRuta, RutaCargada} from './rutas.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

@Injectable()
export class RutasEffects {

  // @Effect()
  // public Carga$ = this.actions$
  //   .ofType(RutasActionTypes.CargarRuta)
  //   .pipe(
  //     mergeMap((action: CargarRuta) =>
  //        return new RutaCargada(action.payload))

  //     )
  //   );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
