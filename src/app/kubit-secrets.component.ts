import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-secrets',
  templateUrl: './kubit-secrets.component.html'
})
export class KubitSecretsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  secrets: Array<any> = [];
  rawSecrets: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('secrets');
    api
    .get((namespace.metadata.name === '*' ? 'namespaces//secrets' : 'namespaces/' + namespace.metadata.name + '/secrets'))
    .then(secrets => {
        this.secrets = secrets.items;
        this.rawSecrets = JSON.stringify(secrets, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

