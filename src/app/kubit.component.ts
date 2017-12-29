import { Component } from "@angular/core";
import { remote, shell } from "electron";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { KubitService } from "./kubit.service";

@Component({
  selector: "ku-bit",
  templateUrl: "./kubit.component.html",
  styleUrls: ["./kubit.component.scss"]
})
export class KubitComponent implements OnInit {
  currentCluster: any = {
    name: ""
  };
  readonly allNamespace: any = {
    metadata: {
      name: '*'
    }
  };

  namespaces: Array<any> = [ this.allNamespace ];
  _selectedNamespace: any = this.allNamespace;

  constructor(private kubitService: KubitService) {
  }

  ngOnInit(): void {
    this.kubitService.setCurrentNamespace(this._selectedNamespace);

    window.addEventListener(
      'keyup',
      event => {
        if (event.key === 'Escape') {
          this.hide();
        }
      },
      true
    );

    const currentCluster = this.kubitService.getCurrentCluster();
    if (currentCluster) {
      this.currentCluster = currentCluster;
    }
    this.kubitService.connect(this.kubitService.getCurrentContextName(), connected => {
      const api = this.kubitService.getApiByKind('namespaces');
      api
      .get('namespaces')
        .then(namespaces => {
          this.namespaces = namespaces.items;
          if (this.namespaces.length > 0) {
            let ni = 0;
            if ('minikube' === currentCluster.name) {
              const foundIndex = this.namespaces.findIndex(ns => ns.metadata.name === 'kube-system');
              if (foundIndex !== -1) {
                ni = foundIndex;
              }
            }
            this._selectedNamespace = this.namespaces[ni];
          } else {
            this._selectedNamespace = this.allNamespace;
          }
          this.kubitService.setCurrentNamespace(this._selectedNamespace);
          this.namespaces.push(this.allNamespace);
        })
        .catch(err => {
          console.error(err);
        });
    });
  }

  get selectedNamespace() {
    return this._selectedNamespace;
  }

  set selectedNamespace(namespace: any) {
    this._selectedNamespace = namespace;
    this.kubitService.setCurrentNamespace(this._selectedNamespace);
  }

  get shortcut() {
    return remote.getGlobal('ShowKubitShortcut');
  }

  github() {
    shell.openExternal('https://github.com/sandipchitale/kubit');
  }

  toggle() {
    if (remote.getCurrentWindow().isMaximized()) {
      remote.getCurrentWindow().restore();
    } else {
      remote.getCurrentWindow().maximize();
    }
  }

  hide() {
    remote.getCurrentWindow().hide();
  }
}
