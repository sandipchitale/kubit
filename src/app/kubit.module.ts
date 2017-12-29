import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatIconRegistry,
  MatSelectModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';

import { KubitRouterModule } from './kubit-router.module';

import { KubitComponent } from './kubit.component';
import { KubitDashboardComponent } from './kubit-dashboard.component';
import { KubitClustersComponent } from './kubit-clusters.component';
import { KubitNamespacesComponent } from './kubit-namespaces.component';
import { KubitNodesComponent } from './kubit-nodes.component';
import { KubitPodsComponent } from './kubit-pods.component';

import { KubitService } from './kubit.service';
import { KubitEndpointsComponent } from './kubit-endpoints.component';
import { KubitServicesComponent } from './kubit-services.component';
import { KubitDeploymentsComponent } from './kubit-deployments.component';
import { KubitEntriesPipe } from './shared/kubit-entries.pipe';
import { KubitBreadcrumbComponent } from './shared/kubit-breadcrumb.component';
import { KubitIconComponent } from './shared/kubit-icon.component';
import { KubitIconMapService } from './shared/kubit-icon-map.service';
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
import { KubitNotificationDialogComponent } from './shared/kubit-notification-dialog.component';

@NgModule({
  declarations: [
    KubitComponent,
    KubitBreadcrumbComponent,
    KubitDashboardComponent,
    KubitClustersComponent,
    KubitNamespacesComponent,
    KubitNodesComponent,
    KubitPersistentVolumesComponent,
    KubitPersistentVolumeClaimsComponent,
    KubitSecretsComponent,
    KubitConfigMapsComponent,
    KubitDeploymentsComponent,
    KubitReplicaSetsComponent,
    KubitSectionComponent,
    KubitPodsComponent,
    KubitPodComponent,
    KubitEndpointsComponent,
    KubitServicesComponent,
    KubitIngressesComponent,
    KubitJobsComponent,
    KubitEntriesPipe,
    KubitIconComponent,
    KubitNotificationDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    KubitRouterModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [
    MatIconRegistry,
    KubitService,
    KubitConnectedGuard,
    KubitIconMapService
  ],
  bootstrap: [KubitComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry) {
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
