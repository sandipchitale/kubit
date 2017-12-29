import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-persistent-volume-claims',
  templateUrl: './kubit-persistent-volume-claims.component.html'
})
export class KubitPersistentVolumeClaimsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  persistentVolumeClaims: Array<any> = [];
  rawPersistentVolumeClaims: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('persistentvolumeclaims');
    api
    .get((namespace.metadata.name === '*' ? 'namespaces//persistentvolumeclaims' : 'namespaces/' + namespace.metadata.name + '/persistentvolumeclaims'))
    .then(persistentVolumeClaims => {
        this.persistentVolumeClaims = persistentVolumeClaims.items;
        this.rawPersistentVolumeClaims = JSON.stringify(persistentVolumeClaims, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
