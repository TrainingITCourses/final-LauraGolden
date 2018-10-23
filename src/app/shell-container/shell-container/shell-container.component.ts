import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { UpdateAvailableEvent } from '@angular/service-worker/src/low_level';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-shell-container',
  templateUrl: './shell-container.component.html',
  styleUrls: ['./shell-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellContainerComponent implements OnInit {
  @Input() public titulo: string;

  constructor(
    private swUpdate: SwUpdate
  ) {}

  ngOnInit() {
    console.log('Shell_ngOnInit');
    this.observeVersions();
  }


  private observeVersions() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((event: UpdateAvailableEvent) => {
        const msg = 'Existe una nueva versión, ¿desea instalarla?';
        if (confirm(msg)) {
          window.location.reload();
        }
      });
    }
  }
}
