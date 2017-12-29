import { Component, OnInit } from "@angular/core";
import { KubitService } from "./kubit.service";

@Component({
  selector: "ku-kubit-namespaces",
  templateUrl: "./kubit-namespaces.component.html"
})
export class KubitNamespacesComponent implements OnInit {
  namespaces: Array<any>= [];
  rawNamespaces: Array<string> = [];

  constructor(private kubitService: KubitService) {}

  ngOnInit() {
    this.refresh();
  }
  
  refresh() {
    const api = this.kubitService.getApiByKind("namespaces");
    api
      .get("namespaces")
      .then(namespaces => {
        this.namespaces = namespaces.items;
        this.rawNamespaces = JSON.stringify(namespaces, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
