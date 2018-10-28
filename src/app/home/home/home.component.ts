import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { CargarEstados } from '../../reducers/estados/estados.actions';
import { CargarRuta } from '../../reducers/rutas/rutas.actions';
import { CargarLanzamientos } from 'src/app/reducers/lanzamientos/lanzamientos.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  public estados$: Observable<any>;
  private subscripcionEstados: any;
  private subscripcionLanzamientos: any;

  constructor(
      private store: Store<GlobalState>
      ) { }

  ngOnInit() {
    console.log('Home_ngOnInit');
    this.cargaObservables();
    this.cargaDatos();
  }

  private cargaDatos() {
    this.store.dispatch(new CargarEstados());
    this.store.dispatch(new CargarLanzamientos([ null , 2 ]));
    this.store.dispatch(new CargarRuta(['' , false, false, 0]));
  }

  private cargaObservables() {
    this.subscripcionEstados = this.store.select('estados').subscribe(est => {
      this.estados$ = this.store
        .select('estados')
        .pipe(
          map(est2 => {
            if (est2.cargados) {
              this.subscripcionEstados.unsubscribe();
              return est2.estados;
            }
          })
        );
    });

    this.subscripcionLanzamientos = this.store.select('lanzamientos').subscribe(lan => {
      if (lan.cargados) {
        if (lan.lanzamientos.length > 0) {
          // Quitamos la subscripción porque ya tenemos la información
          if (this.subscripcionLanzamientos) {
            this.subscripcionLanzamientos.unsubscribe();
            return this.store.dispatch(new CargarRuta([ 'Estados : Lanzamientos cargados ' + lan.lanzamientos.length , false, false, 0]));
          }
        }
      }
    });




    this.store.subscribe((s: any) => {
      console.log(s);
      if (s.lanzamientos.length > 0) {
        console.log(s);
      }
    });




  }
}
