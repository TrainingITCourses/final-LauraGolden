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
  public verBotones: Botones;
  public lanzamientos$: Observable<any>;
  public rutaActual: string;
  public rutaCargada: boolean;


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
    this.rutaCargada = false;
    const e: Informacion = { counter: 0 ,  message: '' };
    this.bEstado = e;

    const b: Botones = { fechas: false , volver: false };
    this.verBotones = b;

    this.rutaCargada = true;

    this.cargarObservables();
    // this.cargarDatos();
  }

  // cargarDatos() {
  //   this.rutaCargada = false;
  //   const e: Informacion = { counter: 0 ,  message: '' };
  //   this.bEstado = e;

  //   const b: Botones = { fechas: false , volver: false };
  //   this.verBotones = b;

  //   this.rutaCargada = true;
  // }

  cargarObservables() {
    let that = this;

    that.lanzamientos$ = this.store.select('lanzamientos').pipe(
      map(lan => {
        if (lan.cargados) {
          const es: Informacion = { counter: lan.lanzamientos.length , message: 'Estados: número de lanzamientos ' };
          that.bEstado = es;

          return lan.lanzamientos;
        }
      })
    );


    that.store.select('ruta').subscribe(r => {
      if (r.cargada) {
        switch (r.nombre) {
        case 'estados':
          that.rutaActual = 'estados';
          const be: Botones = { fechas: false , volver: false };
          that.verBotones = be;

          const e: Informacion = { counter: 0 ,  message: 'Estados' };
          that.bEstado = e;
          that.rutaCargada = true;

          // console.log('ruta estados botones fechas:' + this.verBotones.fechas + ' volver:' + this.verBotones.volver);
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
          // console.log('ruta estados botones fechas:' + this.verBotones.fechas + ' volver:' + this.verBotones.volver);
          that.rutaActual = 'lanzamientos';
          const bl: Botones = { fechas: true , volver: true};
          that.verBotones = bl;

          that.rutaCargada = true;
          // console.log('ruta lanzamientos botones fechas:' + this.verBotones.fechas + ' volver:' + this.verBotones.volver);
          break;
        case 'lanzamiento':

          that.rutaActual = 'lanzamiento';
          const bl2: Botones = { fechas: false , volver: true };
          that.verBotones = bl2;

          that.rutaCargada = true;

          // console.log('ruta lanzamiento botones fechas:' + this.verBotones.fechas + ' volver:' + this.verBotones.volver);
          break;
        }
      }
    });
    if (this.rutaCargada) {
      console.log('ruta botones fechas:' + this.verBotones.fechas + ' volver:' + this.verBotones.volver);
    }
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
