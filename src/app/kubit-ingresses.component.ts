import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-ingresses',
  templateUrl: './kubit-ingresses.component.html'
})
export class KubitIngressesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  ingresses: Array<any> = [];
  rawIngresses: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('ingresses');
    api
      .get((namespace.metadata.name === '*' ? 'namespaces//ingresses' : 'namespaces/' + namespace.metadata.name + '/ingresses'))
      .then(ingresses => {
        this.ingresses = ingresses.items;
        this.rawIngresses = JSON.stringify(ingresses, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

