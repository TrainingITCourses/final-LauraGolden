import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Estado } from 'src/app/interfaces/estado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatesListComponent implements OnInit {
  @Input() public estados: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('states-List_ngOnInit');
  }

  onEstadoSeleccionado(est: Estado) {
    // lanzamos los lanzamientos de un estado seleccionado
    this.router.navigate( ['/lanzamientos', est.id ] );
  }
}
