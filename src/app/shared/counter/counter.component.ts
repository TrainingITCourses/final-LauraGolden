import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { Informacion } from '../../interfaces/informacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  @Input() public counter: Informacion;
  @Input() public escondeBotones: { fechas: false, volver: false };
  // @Input() public escondeFechas: boolean;
  // @Input() public escondeVolver: boolean;
  constructor(private router: Router) {}

  ngOnInit() {
    console.log('counter_ngOnInit');
  }

  onClickFD() {

  }

  onClickFA() {

  }

  onClickV() {
    this.router.navigate( ['/'] );
  }
}
