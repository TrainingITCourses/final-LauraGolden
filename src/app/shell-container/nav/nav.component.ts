import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Informacion } from '../../interfaces/informacion';
// import { SwUpdate } from '@angular/service-worker';
import { Botones } from '../../interfaces/botones';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ruta } from 'src/app/interfaces/ruta';
import { CargarRuta } from 'src/app/reducers/rutas/rutas.actions';
import { CargarLanzamientos } from '../../reducers/lanzamientos/lanzamientos.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  public bEstado: Informacion;
  public escondeBotones: Botones;
  public estados: any;
  public lanzamientos$: Observable<any>;
  // public rutaActual: Ruta;
  // public rutaActual$: Observable<any>;

  @Input() public titulo: string;
  @Input() public version: string;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<GlobalState>

    // private swUpdate: SwUpdate
    ) {}

  ngOnInit() {
    console.log('app-nav_ngOnInit');

    const e: Informacion = {
      counter: 0,
      message: ''
    };
    const b: Botones = {
      fechas: false,
      volver: false
    };
    this.bEstado = e;
    this.escondeBotones = b;

    this.store.select('lanzamientos').subscribe(lan => {
      this.lanzamientos$ = this.store
        .select('lanzamientos')
        .pipe(
          map(lan2 => {
            if (lan2.cargados) {
              const es: Informacion = {
                counter: lan2.lanzamientos.length,
                message: 'Estados'
              };
              return lan2.lanzamientos;
            }
          })
        );
    });


    this.store.select('ruta').subscribe(r => {
      if (r.cargada) {
        switch (r.nombre) {
        case 'estado':
          this.store.select('estados').subscribe(est => { this.estados = est; });
          this.store.dispatch(new CargarLanzamientos(0));
          // this.estados = est.estados;
          // this.rutaActual$ = this.store
          //     .select('ruta')
          //     .pipe(
          //       map(r2 => {
          //         if (r2.cargada) {
          //           return r2;
          //         }
          //       })
          //     );
          break;
        case 'lanzamientos':
          break;
        case 'lanzamiento':
          break;
        }
      }

    });
  }


  onClick() {
    // this.checkForUpdate();
  }

  // checkForUpdate() {
  //   console.log('[App] checkForUpdate started');
  //   this.swUpdate.checkForUpdate()
  //     .then(() => {
  //       console.log('[App] checkForUpdate completed');
  //       this.activateUpdate();
  //     })
  //     .catch(err => {
  //       console.error(err);
  //   });
  // }

  // activateUpdate() {
  //   console.log('[App] activateUpdate started');
  //   this.swUpdate.activateUpdate()
  //     .then(() => {
  //       console.log('[App] activateUpdate completed');
  //         window.location.reload();
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }

  onClickFD() {
    // Fecha más reciente

  }

  onClickFA() {
    // Fecha menos reciente

  }

  onClickV() {

  }

}
