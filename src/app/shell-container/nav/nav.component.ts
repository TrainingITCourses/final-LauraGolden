import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Informacion } from '../../interfaces/informacion';
// import { SwUpdate } from '@angular/service-worker';
import { Botones } from '../../interfaces/botones';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {
  public bEstado: Informacion;
  public escondeBotones: Botones;
  public rutaActual$: Observable<any>;
  paramsSubscription: any;

  @Input() public titulo: string;
  @Input() public version: string;

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,

    // private swUpdate: SwUpdate
    ) { }

  ngOnInit() {
    console.log('app-nav_ngOnInit');

     const e: Informacion = {
      counter: 7,
      message: 'Estados'
    };

    const b: Botones = {
      fechas: false,
      volver: false
    };
    this.bEstado = e;
    this.escondeBotones = b;

    // this.rutaActual = this.activatedRoute.snapshot.params['id'];
    // this.rutaActual$ = this.activatedRoute.data.subscribe(est => console.log(est));
    this.paramsSubscription = this.activatedRoute.params.subscribe(params => {
      console.log(params);

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
