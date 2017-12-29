import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-config-maps',
  templateUrl: './kubit-config-maps.component.html'
})
export class KubitConfigMapsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  configMaps: Array<any> = [];
  rawConfigMaps: Array<string> = [];
  
  constructor(private kubitService: KubitService) {
    this.subscription = this.kubitService.namespaceObservable.subscribe(
      (namespace) => {
        this.refreshWithNamespace(namespace);
      }
    );
  }
  
  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refresh() {
    this.refreshWithNamespace(this.kubitService.getCurrentNamespace());
  }

  refreshWithNamespace(namespace: any) {
    const api = this.kubitService.getApiByKind('configmaps');
    api
      .get((namespace.metadata.name === '*' ? 'namespaces//configmaps' : 'namespaces/' + namespace.metadata.name + '/configmaps'))
      .then(configMaps => {
        this.configMaps = configMaps.items;
        this.rawConfigMaps = JSON.stringify(configMaps, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}