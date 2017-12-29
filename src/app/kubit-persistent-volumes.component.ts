import { Component, OnInit } from '@angular/core';
import { KubitService } from './kubit.service';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'ku-kubit-persistent-volumes',
  templateUrl: './kubit-persistent-volumes.component.html'
})
export class KubitPersistentVolumesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  persistentVolumes: Array<any> = [];
  rawPersistentVolumes: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('persistentvolumes');
    api
      .get('persistentvolumes')
      .then(persistentVolumes => {
        this.persistentVolumes = persistentVolumes.items;
        this.rawPersistentVolumes = JSON.stringify(persistentVolumes, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}