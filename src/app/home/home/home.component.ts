import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { CargarEstados } from '../../reducers/estados/estados.actions';
import { CargarRuta } from '../../reducers/rutas/rutas.actions';
import { Ruta } from '../../interfaces/ruta';
import { Subscription } from 'rxjs';
import { CargarLanzamientos } from 'src/app/reducers/lanzamientos/lanzamientos.actions';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  public estados$: Observable<any>;
  // public estados: any[];
  public informacion = { counter: 0, messaje: '' };

  // public lanzamientos$: Observable<any>;
  // public lanzamientos: any[];
  // rutaSubscription: Subscription;

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
    // this.store.dispatch(new CargarRuta([0 , 'estados']));
    // this.rutaSubscription = this.store.select('lanzamientos').subscribe( data => {
    //   this.store.dispatch(new CargarRuta( data.lanzamientos.length + ' lanzamientos ' ));
    // });
    this.store.dispatch(new CargarRuta(['Lanzamientos XXX' , false, false]));
    this.store.dispatch(new CargarLanzamientos( null ));

  }

  private cargaObservables() {
    this.store.select('estados').subscribe(est => {
      // this.estados = est.estados;
      this.estados$ = this.store
        .select('estados')
        .pipe(
          map(est2 => {
            if (est2.cargados) {

              // this.store.select('lanzamientos').subscribe(lan => {
              //   if (lan.cargados) {
              //     if (lan.lanzamientos.length > 0) {
              //       this.store.dispatch(new CargarRuta( lan.lanzamientos.length + ' lanzamientos ' ));
              //     }
              //   }
              // });

              return est2.estados;
            }
          })
        );
    });

    // this.store.select('lanzamientos').subscribe(lan => {
    //   this.lanzamientos = lan.lanzamientos;
    //   this.lanzamientos$ = this.store
    //     .select('lanzamientos')
    //     .pipe(
    //       map(lan2 => {
    //         if (lan2.cargados) {
    //           this.store.dispatch(new CargarRuta( lan2.lanzamientos.length + ' lanzamientos ' ));
    //           return lan2.lanzamientos;
    //         }
    //       })
    //     );
    // });

  }


  ngOnDestroy() {
    // this.rutaSubscription.unsubscribe();
  }
}
