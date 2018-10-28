import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState } from '../..';
import { SwUpdate } from '@angular/service-worker';
import { Botones } from '../../interfaces/botones';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CargarLanzamientos } from '../../reducers/lanzamientos/lanzamientos.actions';
import { Location } from '@angular/common';
import { RutasState } from 'src/app/reducers/rutas/rutas.reducer';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  public verBotones: Botones;
  public rutas$: Observable<any>;
  public ruta: RutasState;

  @Input() public titulo: string;
  @Input() public version: string;

  constructor(
    private store: Store<GlobalState>,
    private location: Location,
    private swUpdate: SwUpdate
    ) {}

  ngOnInit() {
    console.log('app-nav_ngOnInit');

    this.rutas$ = this.store.select('ruta').pipe(
      map(r => {
        if (r.cargada) {
          this.ruta = r;
          return r;
        }
      })
    );
  }

  onClickFD() {
    // Fecha más reciente
    if (this.ruta !== undefined) {
      this.store.dispatch (new CargarLanzamientos([ this.ruta.idEstado, 2]));
    }
  }

  onClickFA() {
    // Fecha menos reciente
    if (this.ruta !== undefined) {
      this.store.dispatch (new CargarLanzamientos([ this.ruta.idEstado, 1]));
    }
  }

  onClickV() {
    if (this.ruta.actual === 'Lanzamientos') {
      this.store.dispatch(new CargarLanzamientos([ null , 2 ]));
    }
    this.location.back();
  }


  onClick() {
    this.checkForUpdate();
  }

  checkForUpdate() {
    console.log('[App] checkForUpdate started');
    this.swUpdate.checkForUpdate()
      .then(() => {
        console.log('[App] checkForUpdate completed');
        this.activateUpdate();
      })
      .catch(err => {
        console.error(err);
    });
  }

  activateUpdate() {
    console.log('[App] activateUpdate started');
    this.swUpdate.activateUpdate()
      .then(() => {
        console.log('[App] activateUpdate completed');
          window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }

}
