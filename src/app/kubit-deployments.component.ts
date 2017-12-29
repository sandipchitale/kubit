import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-deployments',
  templateUrl: './kubit-deployments.component.html'
})
export class KubitDeploymentsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  deployments: Array<any> = [];
  rawDeployments:  Array<string> = [];
  
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
      .then(deployments => {
        this.deployments = deployments.items;
        this.rawDeployments = JSON.stringify(deployments, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
