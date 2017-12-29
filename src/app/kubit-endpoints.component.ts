import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-endpoints',
  templateUrl: './kubit-endpoints.component.html'
})
export class KubitEndpointsComponent implements OnInit {
  subscription: Subscription;
  endpoints: Array<any> = [];
  rawEndpoints: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('endpoints');
    api
      .get((namespace.metadata.name === '*' ? 'namespaces//endpoints' : 'namespaces/' + namespace.metadata.name + '/endpoints'))
      .then(endpoints => {
        this.endpoints = endpoints.items;
        this.rawEndpoints = JSON.stringify(endpoints, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}