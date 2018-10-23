import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Lanzamiento } from '../../interfaces/lanzamiento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-launches-list',
  templateUrl: './launches-list.component.html',
  styleUrls: ['./launches-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchesListComponent implements OnInit {
  @Input() public lanzamientos: any[];
  @Input() public estadoSel: number;

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Launches-List_ngOnInit');
  }

  onLanzamientoSeleccionado(lan: Lanzamiento) {
    // lanzamos el detalle de un lanzamiento seleccionado
    this.router.navigate( ['/lanzamiento', lan.id ] );
  }
}
