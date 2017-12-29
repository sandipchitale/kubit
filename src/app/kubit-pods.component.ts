import { Component, OnInit } from "@angular/core";
import { KubitService } from "./kubit.service";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
  selector: "ku-kubit-pods",
  templateUrl: "./kubit-pods.component.html"
})
export class KubitPodsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  pods: Array<any> = [];
  rawPods: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('pods');
    api
      .get((namespace.metadata.name === '*' ? 'namespaces//pods' : 'namespaces/' + namespace.metadata.name + '/pods'))
      .then(pods => {
        this.pods = pods.items.filter((item) => {
          return item.status.phase !== 'Failed';
        });
        this.rawPods = JSON.stringify(pods, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
