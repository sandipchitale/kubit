import { Component, OnInit, Input } from '@angular/core';
import { KubitIconMapService } from './kubit-icon-map.service';

@Component({
  selector: 'ku-kubit-icon',
  template: '<mat-icon matPrefix fontSet="fa" fontIcon="{{icon}}"></mat-icon>'
})
export class KubitIconComponent implements OnInit{
  @Input() iconic: string;
  icon: string;

  constructor(private kubitIconMap: KubitIconMapService) {
  }
  
  ngOnInit(): void {
    this.icon = this.kubitIconMap.iconFor(this.iconic);
  }
}
