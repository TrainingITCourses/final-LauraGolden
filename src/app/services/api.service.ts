import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from '..';

@Injectable()
export class ApiService {
  constructor(private httpC: HttpClient, private store: Store<GlobalState>) {}

  public getStatusTypes$ = (): Observable<any[]> =>
    this.httpC
      .get('../../assets/launchstatus.json')
      .pipe(map((res: any) => res.types))

  public getFilterLaunches(valor): Observable<any> {
    if (valor !== null) {
      return this.httpC.get('../../assets/launchlibrary.json').pipe(
        map((res: any) =>
          res.launches
            .filter(lan => {
              return this.filtraEstados(lan, Number(valor));
            })
            .map(lanzamiento => {
              return lanzamiento;
            })
        )
      );
    } else if (valor === 0 ) {
       return this.httpC.get('../../assets/launchlibrary.json').pipe(map((res: any) => res.launches));
    } else {
      return of([]);
    }
  }

  public getLaunch$ = (valor): Observable<any[]> =>
    this.httpC
      .get('../../assets/launchlibrary.json')
      .pipe(map((res: any) => res.launches
          .filter(lan => {
            return lan.id === Number(valor);
          })
          .map(lanzamiento => {
            return lanzamiento;
          })
       ))

  private filtraEstados(lanzamiento: any, valor: number): boolean {
    return (lanzamiento.status === valor);
  }
}
