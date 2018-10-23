import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-launches-card',
  templateUrl: './launches-card.component.html',
  styleUrls: ['./launches-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesCardComponent implements OnInit {
  @Input() public lanzamiento:  any = null;

  constructor() { }

  ngOnInit() {
    console.log('Launches-Card_ngOnInit');
    console.log(this.lanzamiento);
  }

}
