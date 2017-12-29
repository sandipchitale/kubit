import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubitService } from './kubit.service';

@Component({
  selector: 'ku-kubit-jobs',
  templateUrl: './kubit-jobs.component.html'
})
export class KubitJobsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  jobs: Array<any> = [];
  rawJobs: Array<string> = [];
  
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
    const api = this.kubitService.getApiByKind('jobs');
    api
      .get((namespace.metadata.name === '*' ? 'namespaces//jobs' : 'namespaces/' + namespace.metadata.name + '/jobs'))
      .then(jobs => {
        this.jobs = jobs.items;
        this.rawJobs = JSON.stringify(jobs, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}

