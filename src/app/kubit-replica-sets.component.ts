import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-replica-sets',
  templateUrl: './kubit-replica-sets.component.html'
})
export class KubitReplicaSetsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  replicaSets: Array<any> = [];
  rawReplicaSets: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('deployments');
    api
      .get((namespace.metadata.name === '*' ? 'namespaces//deployments' : 'namespaces/' + namespace.metadata.name + '/deployments'))
      .then(replicaSets => {
        this.replicaSets = replicaSets.items;
        this.rawReplicaSets = JSON.stringify(replicaSets, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
