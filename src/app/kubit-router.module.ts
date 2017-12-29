import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KubitClustersComponent } from './kubit-clusters.component';
import { KubitDashboardComponent } from './kubit-dashboard.component';
import { KubitNamespacesComponent } from './kubit-namespaces.component';
import { KubitNodesComponent } from './kubit-nodes.component';
import { KubitPodsComponent } from './kubit-pods.component';
import { KubitEndpointsComponent } from './kubit-endpoints.component';
import { KubitServicesComponent } from './kubit-services.component';
import { KubitDeploymentsComponent } from './kubit-deployments.component';
import { KubitPersistentVolumesComponent } from './kubit-persistent-volumes.component';
import { KubitPersistentVolumeClaimsComponent } from './kubit-persistent-volume-claims.component';
import { KubitSecretsComponent } from './kubit-secrets.component';
import { KubitConfigMapsComponent } from './kubit-config-maps.component';
import { KubitReplicaSetsComponent } from './kubit-replica-sets.component';
import { KubitJobsComponent } from './kubit-jobs.component';
import { KubitIngressesComponent } from './kubit-ingresses.component';
import { KubitPodComponent } from './kubit-pod.component';
import { KubitSectionComponent } from './kubit-section.component';
import { KubitConnectedGuard } from './kubit-connected.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pods',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: KubitDashboardComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Dashboard',
      iconic: 'dashboard',
      helpUrl: 'https://kubernetes.io/docs/concepts/'
    }
  },
  {
    path: 'clusters',
    component: KubitClustersComponent,
    data: {
      breadcrumb: 'Clusters',
      iconic: 'cluster',
      helpUrl: 'https://kubernetes.io/docs/concepts/cluster-administration/cluster-administration-overview/'
    }
  },
  {
    path: 'namespaces',
    component: KubitNamespacesComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Namespaces',
      iconic: 'namespace',
      helpUrl: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/'
    }
  },
  {
    path: 'nodes',
    component: KubitNodesComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Nodes',
      iconic: 'node',
      helpUrl: 'https://kubernetes.io/docs/concepts/architecture/nodes/'
    }
  },
  {
    path: 'configmaps',
    component: KubitConfigMapsComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Config Maps',
      iconic: 'configmap',
      helpUrl: 'https://kubernetes.io/docs/tasks/configure-pod-container/configmap/'
    }
  },
  {
    path: 'secrets',
    component: KubitSecretsComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Secrets',
      iconic: 'secret',
      helpUrl: 'https://kubernetes.io/docs/concepts/configuration/secret/'
    }
  },
  {
    path: 'persistentvolumes',
    component: KubitPersistentVolumesComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Persistent Volumes',
      iconic: 'persistentvolume',
      helpUrl: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistent-volumes'
    }
  },
  {
    path: 'persistentvolumeclaims',
    component: KubitPersistentVolumeClaimsComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Persistent Volumes Claims',
      iconic: 'persistentvolumeclaim',
      helpUrl: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims'
    }
  },
  {
    path: 'deployments',
    component: KubitDeploymentsComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Deployments',
      iconic: 'deployment',
      helpUrl: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/'
    }
  },
  {
    path: 'replicasets',
    component: KubitReplicaSetsComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Replica Sets',
      iconic: 'replicaset',
      helpUrl: 'https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/'
    }
  },
  {
    path: 'pods',
    component: KubitSectionComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Pods',
      iconic: 'pod',
      helpUrl: 'https://kubernetes.io/docs/concepts/workloads/pods/pod-overview/'
    },
    children: [
      {
        path: '',
        component: KubitPodsComponent,
        canActivate: [ KubitConnectedGuard ],
        data: {
          breadcrumb: ''
        }
      },
      {
        path: ':namespace/:name',
        component: KubitPodComponent,
        canActivate: [ KubitConnectedGuard ],
        data: {
          breadcrumb: '${name}'
        }
      }
    ]
  },
  {
    path: 'endpoints',
    component: KubitEndpointsComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Endpoints',
      iconic: 'endpoint',
      helpUrl: 'https://kubernetes.io/docs/concepts/services-networking/service/'
    }
  },
  {
    path: 'services',
    component: KubitServicesComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Services',
      iconic: 'service',
      helpUrl: 'https://kubernetes.io/docs/concepts/services-networking/service/'
    }
  },
  {
    path: 'ingresses',
    component: KubitIngressesComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Ingresses',
      iconic: 'ingress',
      helpUrl: 'https://kubernetes.io/docs/concepts/services-networking/ingress/'
    }
  },
  {
    path: 'jobs',
    component: KubitJobsComponent,
    canActivate: [ KubitConnectedGuard ],
    data: {
      breadcrumb: 'Jobs',
      iconic: 'job',
      helpUrl: 'https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/#what-is-a-job'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class KubitRouterModule {
}