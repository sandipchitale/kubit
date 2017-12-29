import { Component, OnInit } from "@angular/core";
import { KubitService } from "./kubit.service";

@Component({
  selector: "ku-kubit-nodes",
  templateUrl: "./kubit-nodes.component.html"
})
export class KubitNodesComponent implements OnInit {
  nodes: Array<any> = [];
  rawNodes: Array<string> = [];

  constructor(private kubitService: KubitService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    const api = this.kubitService.getApiByKind('nodes');
    api
      .get('nodes')
      .then(nodes => {
        this.nodes = nodes.items;
        this.rawNodes = JSON.stringify(nodes, null, 2).split('\n');
      })
      .catch(err => {
        console.error(err);
      });
  }
}
