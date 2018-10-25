import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { Informacion } from '../../interfaces/informacion';
// import { SwUpdate } from '@angular/service-worker';
import { Botones } from '../../interfaces/botones';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamientos } from '../../reducers/lanzamientos/lanzamientos.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  public bEstado: Informacion;
  public escondeBotones: Botones;
  public lanzamientos$: Observable<any>;
  public rutaActual: string;

  @Input() public titulo: string;
  @Input() public version: string;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<GlobalState>,
    private location: Location

    // private swUpdate: SwUpdate
    ) {}

  ngOnInit() {
    console.log('app-nav_ngOnInit');
    this.cargarObservables();
    this.cargarDatos();
  }

  cargarDatos() {
    const e: Informacion = {
      counter: 0,
      message: ''
    };
    const b: Botones = {
      fechas: true,
      volver: true
    };
    this.bEstado = e;
    this.escondeBotones = b;
  }

  cargarObservables() {
    this.store.select('ruta').subscribe(r => {
      if (r.cargada) {
        switch (r.nombre) {
        case 'estados':
          this.rutaActual = 'estados';
          const be: Botones = {
            fechas: true,
            volver: true
          };
          this.escondeBotones = be;
          // this.store.select('estados').subscribe(est => { this.estados = est; });
          this.store.dispatch(new CargarLanzamientos(null));
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
          this.rutaActual = 'lanzamientos';
          const bl: Botones = {
            fechas: true,
            volver: true
          };
          this.escondeBotones = bl;
          console.log('ruta lanzamientos');
          break;
        case 'lanzamiento':
          this.rutaActual = 'lanzamiento';
          const bl2: Botones = {
            fechas: false,
            volver: true
          };
          this.escondeBotones = bl2;
          console.log('ruta lanzamiento');
          break;
        }
      }

    });

    this.lanzamientos$ = this.store.select('lanzamientos').pipe(
      map(lan => {
        if (lan.cargados) {
          const es: Informacion = {
            counter: lan.lanzamientos.length,
            message: 'Estados: número de lanzamientos '
          };
          this.bEstado = es;
          return lan.lanzamientos;
        }
      })
    );
  }

  onClickFD() {
    // Fecha más reciente

  }

  onClickFA() {
    // Fecha menos reciente

  }

  onClickV() {
    this.location.back();
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

}
