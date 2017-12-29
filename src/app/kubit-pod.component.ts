import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-pod',
  templateUrl: './kubit-pod.component.html'
})
export class KubitPodComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  routeSub: Subscription;
  namespace: string = '';
  name: string = '';
  pod: Array<any> = [];
  rawPod: Array<string> = [];
  
  constructor(private kubitService: KubitService, private route: ActivatedRoute) {
    this.subscription = this.kubitService.namespaceObservable.subscribe(
      (namespace) => {
        this.refreshWithNamespace(namespace);
      }
    );
  }
  
  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.namespace = params['namespace'];
      this.name = params['name'];
      this.refresh();
   });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routeSub.unsubscribe();
  }

  refresh() {
    this.refreshWithNamespace(this.kubitService.getCurrentNamespace());
  }

  refreshWithNamespace(namespace: any) {
    const api = this.kubitService.getApiByKind('pods');
    api
      .get('namespaces/' + this.namespace + '/pods/' + this.name)
      .then(pod => {
        this.pod = pod;
        this.rawPod = JSON.stringify(pod, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

