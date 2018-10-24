import {ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
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
  @Output() public bVolver = new EventEmitter<any>();
  @Output() public bFechaD = new EventEmitter<any>();
  @Output() public bFechaA = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit() {
    console.log('counter_ngOnInit');
  }

  onClickFD() {
    // Fecha más reciente
    this.bFechaD.emit();
  }

  onClickFA() {
    // Fecha menos reciente
    this.bFechaA.emit();
  }

  onClickV() {
    this.bVolver.emit();
  }
}
