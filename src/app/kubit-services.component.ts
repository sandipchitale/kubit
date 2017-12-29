import { Component, OnInit, OnDestroy} from '@angular/core';
import { KubitService } from "./kubit.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'ku-kubit-services',
  templateUrl: './kubit-services.component.html'
})
export class KubitServicesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  services: Array<any> = [];
  rawServices: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('services');
    api
      .get((namespace.metadata.name === '*' ? 'namespaces//services' : 'namespaces/' + namespace.metadata.name + '/services'))
      .then(services => {
        this.services = services.items;
        this.rawServices = JSON.stringify(services, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}