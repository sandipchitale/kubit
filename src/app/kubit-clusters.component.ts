import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { KubitService } from "./kubit.service";

@Component({
  selector: "ku-kubit-clusters",
  templateUrl: "./kubit-clusters.component.html"
})
export class KubitClustersComponent implements OnInit {
  clusters: Array<any> = [];

  constructor(private router: Router, private kubitService: KubitService) {}

  ngOnInit() {
    this.refresh();
  }
  
  refresh() {
    const clusters = this.kubitService.getClusters();
    if (clusters) {
      this.clusters = clusters;
    } else {
      this.clusters = [];
    }
  }

  connect(cluster: any) {
    const contexts = this.kubitService.getContexts();
    if (contexts) {
      const contextForCluster = contexts.find((context => {
        context.context.cluster === cluster;
      }));
      if (contextForCluster) {
        this.kubitService.connect(contextForCluster.name, (connected) => {
          if (connected) {
            this.router.navigate(['pods']);
          }
        });
      }
    }
  }
}
